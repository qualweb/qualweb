'use strict';

import { ElementHandle } from 'puppeteer';

async function isElementHidden(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  return (await element.boundingBox()) === null;
}

export = isElementHidden;
