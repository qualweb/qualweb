'use strict';

import { ElementHandle } from 'puppeteer';

async function setElementAttribute(element: ElementHandle, attribute: string,value:string): Promise<void> {
  if (!element) {
    throw Error('Element is not defined');
  }
  return element.evaluate((elem, attribute,value) => {
    elem.setAttribute(attribute,value);
  }, attribute,value);
}

export = setElementAttribute;