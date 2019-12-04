'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementText(element: ElementHandle): Promise<string> {
  if (!element) {
    throw Error('Element is not defined');
  }
  
  const text = <string> await (await element.getProperty('innerText')).jsonValue();
  return text;
}

export = getElementText;