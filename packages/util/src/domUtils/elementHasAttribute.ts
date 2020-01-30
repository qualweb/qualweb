'use strict';

import { ElementHandle } from 'puppeteer';

async function elementHasAttribute(element: ElementHandle, attribute: string): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }
  
  return element.evaluate((elem, attribute) => {
    return elem.getAttributeNames().includes(attribute);
  }, attribute);
}

export default elementHasAttribute;