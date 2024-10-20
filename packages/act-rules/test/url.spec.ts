import { expect } from 'chai';
import fetch from 'node-fetch';
import { Browser } from 'puppeteer';
import { launchBrowser } from './util';

/**
 * We *must* import as type or not at all. Importing ACTRules triggers an import
 * of code from @qualweb/locale, which expects to be run in a browser
 * environment.
 */
import type { ACTRules } from '../src';

// We define the global window object here to avoid TypeScript errors.
declare global {
  interface Window {
    act: ACTRules;
  }
}

describe('URL evaluation', function () {
  let browser: Browser;

  before(async () => (browser = await launchBrowser()));

  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://www.dgeec.medu.pt/pedidodados';
    const response = await fetch(url);
    const sourceCode = await response.text();

    // FIXME: puppeteer no longer has createIncognitoBrowserContext() - is this a problem?
    const incognito = await browser.createBrowserContext();
    const page = await incognito.newPage();
    await page.goto(url);

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/locale')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.bundle.js')
    });

    await page.evaluate(function (sourceHtml) {
      // @ts-expect-error Since we are only importing the ACTRules type, tsc will warn that we can't actually use it. The class is injected elsewhere, but tsc can't see in its analysis.
      window.act = new ACTRules('fi');
      window.act.test({ sourceHtml });
    }, sourceCode);

    await page.setViewport({
      width: 640,
      height: 512
    });

    const report = await page.evaluate(() => {
      window.act.testSpecial();
      return window.act.getReport();
    });

    expect(report);
  });

  after(async () => {
    await browser.close();
  });
});
