'use strict';

import { DomElement } from 'htmlparser2';

function elementHasAttribute(element: DomElement, attribute: string): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }
  
  return element.attribs ? element.attribs[attribute] !== undefined : false;
}

export = elementHasAttribute;