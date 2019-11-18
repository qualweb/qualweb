'use strict';

import { DomElement } from 'htmlparser2';
import html from 'htmlparser-to-html';
import clone from 'lodash/clone';
import md5 from 'md5';
const puppeteer = require('puppeteer');


function getSelfLocationInParent(element: DomElement): string {
    let selector = '';

    if (element.name === 'body' || element.name === 'head') {
        return element.name;
    }

    let sameEleCount = 0;

    let prev = element.prev;
    while (prev) {
        if (prev.type === 'tag' && prev.name === element.name) {
            sameEleCount++;
        }
        prev = prev.prev;
    }

    selector += `${element.name}:nth-of-type(${sameEleCount + 1})`;

    return selector;
}

function getElementSelector(element: DomElement): string {

    if (element.name === 'html') {
        return 'html';
    } else if (element.name === 'head') {
        return 'html > head';
    } else if (element.name === 'body') {
        return 'html > body';
    }

    let selector = 'html > ';

    let parents = new Array<string>();
    let parent = element.parent;
    while (parent && parent.name !== 'html') {
        parents.unshift(getSelfLocationInParent(parent));
        parent = parent.parent;
    }

    selector += parents.join(' > ');
    selector += ' > ' + getSelfLocationInParent(element);

    return selector;
}

function transform_element_into_html(element: DomElement, withText: boolean = true, fullElement: boolean = false): string {

    if (!element) {
        return '';
    }

    let codeElement: DomElement = clone(element);

    if (codeElement.attribs) {
        delete codeElement.attribs['computed-style'];
        delete codeElement.attribs['computed-style-after'];
        delete codeElement.attribs['computed-style-before'];
        delete codeElement.attribs['w-scrollx'];
        delete codeElement.attribs['w-scrolly'];
        delete codeElement.attribs['b-right'];
        delete codeElement.attribs['b-bottom'];
        delete codeElement.attribs['window-inner-height'];
        delete codeElement.attribs['window-inner-width'];
        delete codeElement.attribs['document-client-height'];
        delete codeElement.attribs['document-client-width'];
    }

    if (codeElement.attribs && codeElement.attribs.id && codeElement.attribs.id.startsWith('qw-generated-id')) {
        delete codeElement.attribs.id;
    }

    if (!fullElement) {
        if (withText) {
            let children = clone(codeElement.children);
            codeElement.children = [];

            for (let child of children || []) {
                if (child.type === 'text') {
                    codeElement.children.push(clone(child));
                }
            }
        } else {
            codeElement.children = [];
        }
    }

    return html(codeElement);
}
/** 
async function getContentHash(url: string) {

    var options = {
        url: url,
        simple:false,
        followRedirect: true

    };
  
    let content = await request(url,options);
    console.log(content);
    return md5(content.replace(/\s|\r/g,""));
}*/
async function getContentHash(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url,{'waitUntil': 'networkidle2'});
    let content = await page.evaluate(() => {
        return document.documentElement.innerHTML;
      });

    await browser.close();
    return md5(content.replace(/\s|\r/g,""));
}

export {
    getElementSelector,
    transform_element_into_html,
    getContentHash
};
