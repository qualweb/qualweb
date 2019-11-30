'use strict';

import {
  ElementHandle
} from 'puppeteer';

async function elementHasChild(element: ElementHandle, childName: string): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  return element.evaluate((elem, childName) => {
    for (const child of elem.children) {
      if (child.tagName.toLowerCase() === childName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }, childName);
}

export = elementHasChild;
