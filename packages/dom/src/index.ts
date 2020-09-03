import {
  Browser,
  Page,
  Viewport,
  ElementHandle
} from 'puppeteer';
import {
  QualwebOptions,
  SourceHtml,
  PageOptions
} from '@qualweb/core';
import {
  PageData
} from '@qualweb/dom';
import fetch from 'node-fetch';
import DomHandler, {
  Node
} from 'domhandler';
import {
  Parser
} from 'htmlparser2';

import {
  DEFAULT_DESKTOP_USER_AGENT,
  DEFAULT_MOBILE_USER_AGENT,
  DEFAULT_DESKTOP_PAGE_VIEWPORT_WIDTH,
  DEFAULT_DESKTOP_PAGE_VIEWPORT_HEIGHT,
  DEFAULT_MOBILE_PAGE_VIEWPORT_WIDTH,
  DEFAULT_MOBILE_PAGE_VIEWPORT_HEIGHT
} from './constants';
import { HTMLValidationReport } from '@qualweb/html-validator';
const endpoint = 'http://194.117.20.242/validate/';


class Dom {

  private page!: Page;

  public async getDOM(browser: Browser, options: QualwebOptions, url: string, html: string): Promise<PageData> {
    try {
      this.page = await browser.newPage();
      await this.page.setBypassCSP(true);
      await this.setPageViewport(options.viewport);

      let _sourceHtml = '';
      let validation;

      if (url) {
        _sourceHtml = await this.getSourceHtml(url);

        const validationUrl = endpoint + encodeURIComponent(url);

        let validator = new Promise((resolve, reject) => {
          try {
            fetch(validationUrl).then((response) => {
              if (response && response.status === 200) {
                response.json().then((response) => {
                  let validation = <HTMLValidationReport>JSON.parse(response);
                  resolve(validation);
                })
              }
            })
          } catch (e) {
            resolve([]);
          }
        });

        validation = await validator;


        const response = await this.page.goto(url, {
          timeout: 0,
          waitUntil: ['load']
        });

        const sourceHTMLPuppeteer = await response ?.text();

        if (this.isSVGorMath(sourceHTMLPuppeteer)) {
          this.page.close()
          this.page = await browser.newPage();
          await this.page.setContent('<!DOCTYPE html><html nonHTMLPage=true><body></body></html>', {
            timeout: 0,
            waitUntil: ['load']
          });
        }
      } else {
        validation = [];
        await this.page.setContent(html, {
          timeout: 0,
          waitUntil: ['load']
        });
        _sourceHtml = await this.page.content();

        if (this.isSVGorMath(_sourceHtml)) {
          this.page.close()
          this.page = await browser.newPage();
          await this.page.setContent('<!DOCTYPE html><html nonHTMLPage=true><body></body></html>', {
            timeout: 0,
            waitUntil: ['load']
          });
        }
      }

      const sourceHtml = await this.parseSourceHTML(_sourceHtml);
      return { sourceHtml, page: this.page ,validation};
    } catch (err) {
      throw err;
    }
  }

  public async close(): Promise<void> {
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

      if (options.resolution ?.width) {
        viewPort.width = options.resolution.width;
      }
      if (options.resolution ?.height) {
        viewPort.height = options.resolution.height;
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
    return (await response.text()).trim();
  }

  private async parseSourceHTML(html: string): Promise<SourceHtml> {

    const sourceHTML = html.trim();
    const parsedHTML = this.parseHTML(sourceHTML);
    const source = {
      html: {
        plain: sourceHTML,
        parsed: parsedHTML
      },
    }

    return source;
  }

  private parseHTML(html: string): Node[] {
    const handler = new DomHandler(() => { }, {
      withStartIndices: true,
      withEndIndices: true
    });
    const parser = new Parser(handler);
    parser.write(html.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();

    return handler.dom;
  }


  private isSVGorMath(content?: string): boolean {
    return !!(content ?.trim().startsWith('<math') || content ?.trim().startsWith('<svg'));
  }
}

export {
  Dom
};