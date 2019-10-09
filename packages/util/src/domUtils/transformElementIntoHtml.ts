'use strict';

import { DomElement } from 'htmlparser2';
import html from 'htmlparser-to-html';
import clone from 'lodash/clone';

/**
   * Transforms an object DOM element into an html element string
   * 
   * This function will transform the given element from DomElement to a string. It can return an empty element, 
   * the element with only it's text, or the full element (containing all it's children) 
   * 
   * @param {DomElement} element The element to be transformed
   * @param {boolean} withText Whether we want the element to maintain it's text or not
   * @param {boolean} fullElement Whether we want the full element, with all it's children, or only the element
   * 
   * @public
   * @returns {string} transformed DOM element
   */
function transformElementIntoHtml(element: DomElement, withText: boolean=true, fullElement: boolean=false): string {

  if (!element) {
    throw Error('Element is not defined');
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

export = transformElementIntoHtml;