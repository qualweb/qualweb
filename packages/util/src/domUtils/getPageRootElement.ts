'use strict';

import { Page, ElementHandle } from 'puppeteer';

async function getPageRootElement(page: Page): Promise<ElementHandle | null> {
  if (!page) {
    throw Error('Page is not defined');
  }
  
  const documentHandle = await page.evaluateHandle(() => document);
  const documentElement = await documentHandle.getProperty('documentElement');
  return documentElement ? documentElement.asElement() : null;
}

export default getPageRootElement;