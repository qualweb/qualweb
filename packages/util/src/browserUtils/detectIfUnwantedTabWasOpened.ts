'use strict';

import { Browser } from 'puppeteer';

async function detectIfUnwantedTabWasOpened(browser: Browser, url: string): Promise<boolean> {
  const tabs = await browser.pages();

  let wasOpen = false;

  for (const tab of tabs || []) {
    const target = tab.target();
    const opener = target.opener();

    if (opener) {
      const openerPage = await opener.page();
      if ((await openerPage.url()) === url) {
        wasOpen = true;
        await tab.close();
      }
    }
  }

  return wasOpen;
}

export default detectIfUnwantedTabWasOpened;
