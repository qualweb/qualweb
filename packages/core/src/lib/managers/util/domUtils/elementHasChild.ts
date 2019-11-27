'use strict';

import {
  Element
} from 'htmlparser2';

function elementHasChild(element: Element, childName: string): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  for (const child of element.children || []) {
    if (child !== undefined && child.name === childName) {
      return true;
    }
  }
  return false;
}

export = elementHasChild;