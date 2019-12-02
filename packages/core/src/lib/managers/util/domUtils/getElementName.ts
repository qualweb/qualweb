'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementName(element: ElementHandle): Promise<string | null> {
  if (!element) {
    throw Error('Element is not defined');
  }
  return element.evaluate((elem) => {
    return elem.tagName;},element);
}

export = getElementName;