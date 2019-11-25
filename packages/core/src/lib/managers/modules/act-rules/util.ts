'use strict';

import crypto from 'crypto';
import { Page } from 'puppeteer';

async function getContentHash(page: Page): Promise<string> {
  const content = await page.evaluate(() => {
    return document.documentElement.innerHTML;
  });

  return crypto.createHash('md5').update(content).digest('hex');
}

export {
  getContentHash
};