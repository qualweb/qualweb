'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementType(element: ElementHandle): Promise<string> {
  return element.evaluate(elem => {
    return elem['nodeType'] === 1 ? 'tag' : elem['nodeType'] === 2 ? 'attribute' : elem['nodeType'] === 3 ? 'text' : 'comment';
  });
}

export = getElementType;