'use strict';

import { DomElement } from 'htmlparser2';

function elementHasAttribute(element: DomElement, attribute: string): boolean {
  return element.attribs ? element.attribs[attribute] !== undefined : false;
}

export = elementHasAttribute;