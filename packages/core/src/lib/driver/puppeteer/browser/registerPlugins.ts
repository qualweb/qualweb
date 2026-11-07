import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdBlocker from 'puppeteer-extra-plugin-adblocker';
import type { PuppeteerPlugins } from '../../../PuppeteerPlugins';
 
/** Registers the requested puppeteer-extra plugins. */
export function registerPlugins(plugins?: PuppeteerPlugins): void {
  if (plugins?.stealth) {
    puppeteer.use(StealthPlugin());
  }
  if (plugins?.adBlock) {
    puppeteer.use(AdBlocker({ blockTrackersAndAnnoyances: true }));
  }
}
 