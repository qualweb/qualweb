'use strict';

import { DomElement } from 'htmlparser2';

function getElementAttribute(element: DomElement, attribute: string): string | null {
  if (!element) {
    throw Error('Element is not defined');
  }

  return element.attribs ? element.attribs[attribute] ? element.attribs[attribute] : null : null;
}

export = getElementAttribute;