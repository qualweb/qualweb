'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementAttribute(element: ElementHandle, attribute: string): Promise<string | null> {
  if (!element) {
    throw Error('Element is not defined');
  }
  return element.evaluate((elem, attribute) => {
    return elem.getAttribute(attribute);
  }, attribute);
}

export default getElementAttribute;