'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementHtmlCode(element: ElementHandle, withText: boolean = true, fullElement: boolean = false): Promise<string> {

  if (!element) {
    return '';
  }

  const htmlCode = await element.evaluate((elem, withText, fullElement) => {
    const clonedElem = <HTMLElement> elem.cloneNode(true);
    if (fullElement) {
      return clonedElem.outerHTML;
    } else if (withText) {
      const text = clonedElem['text'];
      clonedElem.innerHTML = text !== undefined ? text : '';
      return clonedElem.outerHTML;
    } else {
      clonedElem.innerHTML = '';
      return clonedElem.outerHTML;
    }
  }, withText, fullElement);

  return htmlCode;
}

export default getElementHtmlCode;