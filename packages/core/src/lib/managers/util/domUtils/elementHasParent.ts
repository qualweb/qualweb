'use strict';

import { ElementHandle } from 'puppeteer';

async function elementHasParent(element: ElementHandle, parent: string): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  return element.evaluate((elem, parent) => {
    const parentElement = elem['parentElement'];
    return parentElement ? parentElement['tagName'].toLowerCase() === parent.toLowerCase() : false;
  }, parent);
}

export = elementHasParent;