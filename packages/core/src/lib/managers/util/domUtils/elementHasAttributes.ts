'use strict';

import { Element } from 'htmlparser2';

function elementHasAttributes(element: Element): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  return element.attribs !== undefined;
}

export = elementHasAttributes;