'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementText(element: ElementHandle): Promise<string> {
  if (!element) {
    throw Error('Element is not defined');
  }
  
  const text = <string> await (await element.getProperty('text')).jsonValue();
  return text;
}

export = getElementText;