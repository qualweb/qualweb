'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementParent(element: ElementHandle): Promise<ElementHandle | null> {
  if (!element) {
    throw Error('Element is not defined');
  }

  return (await element.getProperty('parentElement')).asElement();
}

export = getElementParent;