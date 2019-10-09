'use strict';

import { DomElement } from 'htmlparser2';

function isElementFocusableByDefault(element: DomElement): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }
  
  switch (element.name) {
    case 'a':
    case 'area':
    case 'link':
      if (element.attribs && element.attribs['href']) {
        return true;
      }
      break;
    case 'input':
      return !!!(element.attribs && element.attribs['type'] !== 'hidden');
    case 'summary':
      const parent = element.parent;
      return !!(parent && parent.name === 'details' && parent.children && parent.children[0] === element);
    case 'textarea':
    case 'select':
    case 'button':
      return true;
  }
  return false;
}

export = isElementFocusableByDefault;