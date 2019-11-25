'use strict';

import { DomElement } from 'htmlparser2';

function elementHasAttributes(element: DomElement): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  return element.attribs !== undefined;
}

export = elementHasAttributes;