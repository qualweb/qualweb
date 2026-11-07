import type { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import type { ResolvedChrome } from './resolveChrome';

/** Opens a browser: connects when remote, launches otherwise. */
export async function openBrowser({ options, remote }: ResolvedChrome): Promise<Browser> {
  return (remote
    ? await puppeteer.connect(options as any)
    : await puppeteer.launch(options as any)) as unknown as Browser;
}

/** Closes a local browser, or only disconnects from a remote one (it may be shared). */
export async function releaseBrowser(browser: Browser, remote: boolean): Promise<void> {
  if (remote) await browser.disconnect();
  else await browser.close();
}