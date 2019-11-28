'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementAttributesName(element: ElementHandle): Promise<Array<string>> {
  return element.evaluate(elem => {
    return elem.getAttributeNames();
  });
}

export = getElementAttributesName;