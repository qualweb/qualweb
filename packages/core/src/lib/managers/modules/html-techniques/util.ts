'use strict';

import { DomElement } from 'htmlparser2';
import html from 'htmlparser-to-html';
import clone from 'lodash/clone';
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




async function getNumberOfOpenPages(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { 'waitUntil': 'networkidle0', timeout: 5000 });
  let pages = await browser.pages();
  await browser.close();
  return pages.length-1;
}


async function isFocusableBrowser(url: string, selector: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { 'waitUntil': 'networkidle0', timeout: 60000 });
  await page.focus(selector);
  const hrefElement = await page.$(selector);

  let options = {
    root:hrefElement
  }

  const snapshot = await page.accessibility.snapshot(options);
 
  await browser.close();

  return snapshot &&  snapshot.focused!== undefined;
}
/*
function findFocusedNode(node,i:string) {
  let l = 0;
  if (node.focused)
    return i+l;
  for (const child of node.children || []) {
    console.log(child);
    const foundNode = findFocusedNode(child,);
    return foundNode;
  }
  return null;
}*/


export {
  getNumberOfOpenPages,
  isFocusableBrowser,
  getElementSelector,
  transform_element_into_html
};
