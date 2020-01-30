'use strict';

import { ElementHandle } from 'puppeteer';

async function elementHasChidren(element: ElementHandle): Promise<boolean> {
  return element.evaluate(elem => {
    return elem.children.length > 0;
  });
}

export default elementHasChidren;