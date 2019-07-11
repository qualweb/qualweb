'use strict';

import { DomElement } from 'htmlparser2';
import html from 'htmlparser-to-html';
import _ from 'lodash';

function getSelfLocationInParent(element: DomElement): string {
  let selector = '';

  if (element.name === 'body' || element.name === 'head') {
    return element.name;
  }

  let sameEleCount = 0;

  let prev = element.prev;
  while(prev) {
    if (prev.type === 'tag'&& prev.name === element.name) {
      sameEleCount++;
    }
    prev = prev.prev;
  }

  selector += `${element.name}:nth-of-type(${sameEleCount+1})`;

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
  
  selector += _.join(parents, ' > ');
  selector += ' > ' + getSelfLocationInParent(element);

  return selector;
}

function transform_element_into_html(element: DomElement, withText: boolean=true, fullElement: boolean=false): string {

  if (!element) {
    return '';
  }

  let codeElement: DomElement = _.clone(element);

  if (codeElement.attribs) {
    delete codeElement.attribs['computed-style'];
    delete codeElement.attribs['w-scrollx'];
    delete codeElement.attribs['w-scrolly'];
    delete codeElement.attribs['b-right'];
    delete codeElement.attribs['b-bottom'];
  }

  if (codeElement.attribs && codeElement.attribs.id && _.startsWith(codeElement.attribs.id, 'qualweb_generated_id')) {
    delete codeElement.attribs.id;
  }

  if (!fullElement) {
    if (withText) {
      let children = _.clone(codeElement.children);
      codeElement.children = [];

      for (let child of children || []) {
        if (child.type === 'text') {
          codeElement.children.push(_.clone(child));
        }
      }
    } else {
      codeElement.children = [];
    }
  }
  
  return html(codeElement);
}

export {
  getElementSelector,
  transform_element_into_html
};