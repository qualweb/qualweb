import CSSselect from 'css-select';
import { Browser, Page, Viewport, ElementHandle } from 'puppeteer';
import { QualwebOptions, SourceHtml, PageOptions } from "@qualweb/core";
import fetch from 'node-fetch';
import clone from 'lodash.clone';
import DomHandler, { Node } from 'domhandler';
import css from 'css';
import { Parser } from 'htmlparser2';

import {
    DEFAULT_DESKTOP_USER_AGENT,
    DEFAULT_MOBILE_USER_AGENT,
    DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
    DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT,
    DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH,
    DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT
} from './constants';

class Dom {
    private page!: Page;
    public async getDOM(browser: Browser, options: QualwebOptions, url: string, html: string) {
        let sourceHtml, mappedDOM = {}, stylesheets;
        try {
            this.page = await browser.newPage();
            await this.page.setBypassCSP(true);
            await this.setPageViewport(options.viewport);

            const plainStylesheets: any = {};
            this.page.on('response', async response => {
                if (response.request().resourceType() === 'stylesheet') {
                    const responseUrl = response.url();
                    const content = await response.text();
                    plainStylesheets[responseUrl] = content;
                }
            });
            let _sourceHtml;
            if (url) {
                _sourceHtml = await this.getSourceHtml(url);
            }

            if (url) {
                let response = await this.page.goto(url, {
                    timeout: 0,
                    waitUntil: ['networkidle2', 'domcontentloaded']
                });
                let sourceHTMLPupeteer
                if (response)
                    sourceHTMLPupeteer = await response.text()

                if (this.isSVGorMath(sourceHTMLPupeteer)) {
                    this.page.close()
                    this.page = await browser.newPage();
                    await this.page.setContent('<!DOCTYPE html><html nonHTMLPage=true><body></body></html>', {
                        timeout: 0,
                        waitUntil: ['networkidle2', 'domcontentloaded']
                    });
                }


            } else {
                await this.page.setContent(html, {
                    timeout: 0,
                    waitUntil: ['networkidle2', 'domcontentloaded']
                });
                _sourceHtml = await this.page.content();
            }

            if (_sourceHtml) {
                sourceHtml = await this.parseSourceHTML(_sourceHtml);
                const styles = CSSselect('style', sourceHtml.html.parsed);
                const allElems = CSSselect('[style]', sourceHtml.html.parsed);
                let k = 0;
                for (const style of styles || []) {
                    if (style['children'] && style['children'][0]) {
                        plainStylesheets['html' + k] = style['children'][0]['data'];
                    }
                    k++;
                }
                for (const elem of allElems || []) {
                    if (elem['name'] && elem['attribs'] && elem['attribs']['style']) {
                        plainStylesheets['html' + k] = elem['name']+"{"+elem['attribs']['style']+"}";
                    }
                    k++;
                }
                stylesheets = await this.parseStylesheets(plainStylesheets);
                const cookedStew = CSSselect('*', sourceHtml.html.parsed);

                if (cookedStew.length > 0) {
                    for (const item of cookedStew || []) {
                        if (item['startIndex']) {
                            mappedDOM[item['startIndex']] = item;
                        }
                    }
                }

                await this.mapCSSElements(sourceHtml.html.parsed, stylesheets, mappedDOM);
            } else {
                throw new Error('Error trying to reach webpage.');
            }
        } catch (err) {
            console.error(err);
        }
        this.processShadowDom();
        return { sourceHtml, page: this.page, stylesheets, mappedDOM };

    }
    public async close() {
        await this.page.close();
    }
    private async setPageViewport(options?: PageOptions): Promise<void> {
        if (options) {
            if (options.userAgent) {
                await this.page.setUserAgent(options.userAgent);
            } else if (options.mobile) {
                await this.page.setUserAgent(DEFAULT_MOBILE_USER_AGENT);
            } else {
                await this.page.setUserAgent(DEFAULT_DESKTOP_USER_AGENT);
            }

            const viewPort: Viewport = {
                width: options.mobile ? DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH : DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
                height: options.mobile ? DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT : DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT
            };
            if (options.resolution) {
                if (options.resolution.width) {
                    viewPort.width = options.resolution.width;
                }
                if (options.resolution.height) {
                    viewPort.height = options.resolution.height;
                }
            }
            viewPort.isMobile = !!options.mobile;
            viewPort.isLandscape = options.landscape !== undefined ? options.landscape : viewPort.width > viewPort.height;
            viewPort.hasTouch = !!options.mobile;

            await this.page.setViewport(viewPort);
        } else {
            await this.page.setViewport({
                width: DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
                height: DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT,
                isMobile: false,
                hasTouch: false,
                isLandscape: true
            });
        }
    }

    private async getSourceHtml(url: string, options?: any): Promise<string> {
        const fetchOptions = {
            'headers': {
                'User-Agent': options ? options.userAgent ? options.userAgent : options.mobile ? DEFAULT_MOBILE_USER_AGENT : DEFAULT_DESKTOP_USER_AGENT : DEFAULT_DESKTOP_USER_AGENT
            }
        };
        const response = await fetch(url, fetchOptions);
        const sourceHTML = (await response.text()).trim();

        return sourceHTML;
    }

    private async parseStylesheets(plainStylesheets: any): Promise<any[]> {
        const stylesheets = new Array<any>();
        for (const file in plainStylesheets || {}) {
            const stylesheet: any = { file, content: {} };
            if (stylesheet.content) {
                stylesheet.content.plain = plainStylesheets[file];
                stylesheet.content.parsed = css.parse(plainStylesheets[file], { silent: true }); //doesn't throw errors
                stylesheets.push(clone(stylesheet));
            }
        }

        return stylesheets;
    }

    private async parseSourceHTML(html: string): Promise<SourceHtml> {

        const sourceHTML: string = html.trim();
        const parsedHTML = this.parseHTML(sourceHTML);
        const source: SourceHtml = {
            html: {
                plain: sourceHTML,
                parsed: parsedHTML
            },
        }

        return source;
    }

    private parseHTML(html: string): Node[] {
        const handler = new DomHandler(() => { }, { withStartIndices: true, withEndIndices: true });
        const parser = new Parser(handler);
        parser.write(html.replace(/(\r\n|\n|\r|\t)/gm, ''));
        parser.end();

        return handler.dom;
    }

    private async mapCSSElements(dom: Node[], styleSheets: any, mappedDOM: any): Promise<void> {
        for (const styleSheet of styleSheets || []) {
            if (styleSheet.content && styleSheet.content.plain) {
                this.analyseAST(dom, styleSheet.content.parsed, undefined, mappedDOM);
            }
        }
    }

    private analyseAST(dom: Node[], cssObject: any, parentType: string | undefined, mappedDOM: any): void {
        if (cssObject === undefined ||
            cssObject['type'] === 'comment' ||
            cssObject['type'] === 'keyframes' ||
            cssObject['type'] === 'import') {
            return;
        }
        if (cssObject['type'] === 'rule' || cssObject['type'] === 'font-face' || cssObject['type'] === 'this.page') {
            this.loopDeclarations(dom, cssObject, parentType, mappedDOM);
        } else {
            if (cssObject['type'] === 'stylesheet') {
                for (const key of cssObject['stylesheet']['rules'] || []) {
                    this.analyseAST(dom, key, undefined, mappedDOM);
                }
            } else {
                for (const key of cssObject['rules'] || []) {
                    if (cssObject['type'] && cssObject['type'] === 'media') {
                        this.analyseAST(dom, key, cssObject[cssObject['type']], mappedDOM);
                    } else {
                        this.analyseAST(dom, key, undefined, mappedDOM);
                    }
                }
            }
        }
    }

    private loopDeclarations(dom: Node[], cssObject: any, parentType: string | undefined, mappedDOM: any): void {
        const declarations = cssObject['declarations'];
        if (declarations && cssObject['selectors'] && !cssObject['selectors'].toString().includes('@-ms-viewport') && !(cssObject['selectors'].toString() === ':focus')) {
            try {
                let stewResult = CSSselect(cssObject['selectors'].toString(), dom);
                if (stewResult.length > 0) {
                    for (const item of stewResult || []) {
                        if (item['startIndex']) {
                            for (const declaration of declarations || []) {
                                if (declaration['property'] && declaration['value']) {
                                    if (!item['attribs']) {
                                        item['attribs'] = {};
                                    }
                                    if (!item['attribs']['css']) {
                                        item['attribs']['css'] = {};
                                    }
                                    if (item['attribs']['css'][declaration['property']] && item['attribs']['css'][declaration['property']]['value'] &&
                                        item['attribs']['css'][declaration['property']]['value'].includes('!important')) {
                                        continue;
                                    }
                                    else {
                                        item['attribs']['css'][declaration['property']] = {};
                                        if (parentType) {
                                            item['attribs']['css'][declaration['property']]['media'] = parentType;
                                        }
                                        item['attribs']['css'][declaration['property']]['value'] = declaration['value'];
                                    }
                                    mappedDOM[item['startIndex']] = item;
                                }
                            }
                        }
                    }
                }
            }
            catch (err) {

            }
        }
    }

    private async processShadowDom(): Promise<void> {
        let selectors = await this.page.evaluate((elem) => {

            function getElementSelector(elem) {
                function getSelfLocationInParent(element) {
                    let selector = '';

                    if (element.tagName.toLowerCase() === 'body' || element.tagName.toLowerCase() === 'head') {
                        return element.tagName.toLowerCase();
                    }

                    let sameEleCount = 0;

                    let prev = element.previousElementSibling;
                    while (prev) {
                        if (prev.tagName.toLowerCase() === element.tagName.toLowerCase()) {
                            sameEleCount++;
                        }
                        prev = prev.previousElementSibling;
                    }

                    selector += `${element.tagName.toLowerCase()}:nth-of-type(${sameEleCount + 1})`;

                    return selector;
                }

                if (elem.tagName.toLowerCase() === 'html') {
                    return 'html';
                } else if (elem.tagName.toLowerCase() === 'head') {
                    return 'html > head';
                } else if (elem.tagName.toLowerCase() === 'body') {
                    return 'html > body';
                }

                let selector = 'html > ';
                let parents = new Array<string>();
                let parent = elem['parentElement'];
                while (parent && parent.tagName.toLowerCase() !== 'html') {
                    parents.unshift(getSelfLocationInParent(parent));
                    parent = parent['parentElement'];
                }

                selector += parents.join(' > ');
                selector += ' > ' + getSelfLocationInParent(elem);

                return selector;
            }

            let listElements = document.querySelectorAll("*") || new Array();
            let listOfSelectors = new Array<string>();

            listElements.forEach(element => {
                if (element.shadowRoot !== null) {
                    element.innerHTML = element.shadowRoot.innerHTML;
                    listOfSelectors.push(getElementSelector(element));
                }
            });

            return listOfSelectors;
        });

        let shadowCounter = 0;
        let shadowRoot, children;
        for (let selector of selectors) {
            shadowRoot = await this.page.$(selector);
            children = await shadowRoot.$$(selector + ' *')
            await this.setShadowAttribute(children, shadowCounter);
            shadowCounter++;
        }
    }

    private async setShadowAttribute(elements: ElementHandle[], counter: number): Promise<void> {
        for (const element of elements || []) {
            await element.evaluate((elem, attribute, value) => {
                elem.setAttribute(attribute, value);
            }, "shadowTree", counter + "");
        }
    }
    private isSVGorMath(content: string) {
        return content.trim().startsWith('<math') || content.trim().startsWith('<svg');
    }
}

export {
    Dom
};





