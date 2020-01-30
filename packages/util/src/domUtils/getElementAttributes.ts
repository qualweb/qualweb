'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementAttributes(element: ElementHandle): Promise<any> {
  if (!element) {
    throw Error('Element is not defined');
  }
  return element.evaluate(elem => {
    const attributes = {};
    for (const attr of elem.getAttributeNames() || []) {
      attributes[attr] = elem.getAttribute(attr);
    }
    return attributes;
  });
}

export default getElementAttributes;