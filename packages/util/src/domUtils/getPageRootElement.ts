'use strict';

import { Page, ElementHandle } from 'puppeteer';

function getPageRootElement(page: Page): ElementHandle | null {
  if (!page) {
    throw Error('Page is not defined');
  }
  
  const documentHandle = page.evaluateHandle(() => document);
  const documentElement = documentHandle.getProperty('documentElement');
  return documentElement ? documentElement.asElement() : null;
}

export default getPageRootElement;
