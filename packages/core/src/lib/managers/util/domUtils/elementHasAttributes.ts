'use strict';

import { ElementHandle } from 'htmlparser2';

function elementHasAttributes(element: ElementHandle): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  return element.attribs !== undefined;
}

export = elementHasAttributes;