'use strict';

import { ElementHandle } from 'puppeteer';

function elementHasAttributes(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  return element.evaluate(elem => {
    return elem.getAttributeNames().length > 0;
  });
}

export default elementHasAttributes;