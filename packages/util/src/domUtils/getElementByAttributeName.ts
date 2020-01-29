'use strict';

import { Page, ElementHandle } from 'puppeteer';

async function getElementByAttributeName(page: Page, name: string): Promise<ElementHandle | null> {
  if (!name) {
    throw new Error('Invalid attribute name');
  }

  
  return page.$(`[name="${name}"]`);
}

export default getElementByAttributeName;
