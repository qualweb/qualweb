'use strict';

import { DomElement } from 'htmlparser2';

function getElementAttribute(element: DomElement, attribute: string): string | undefined {
  return element.attribs ? element.attribs[attribute] : undefined;
}

export = getElementAttribute;