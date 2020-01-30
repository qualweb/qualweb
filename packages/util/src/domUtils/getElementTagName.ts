'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementTagName(element: ElementHandle): Promise<string> {
  return element.evaluate(elem => {
    return elem['tagName'].toLowerCase();
  });
}

export default getElementTagName;