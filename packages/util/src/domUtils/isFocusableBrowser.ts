'use strict';

import { Page, ElementHandle } from 'puppeteer';

async function isFocusableBrowser(page: Page, element: ElementHandle): Promise<boolean> {
  await element.focus();
  const snapshot = await page.accessibility.snapshot({ root: element });
  return snapshot && snapshot.focused !== undefined;
}

export default isFocusableBrowser;