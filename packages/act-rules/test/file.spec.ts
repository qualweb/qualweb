import { expect } from 'chai';
import { launchBrowser } from './util';
import { LocaleFetcher } from '@qualweb/locale';
import { Browser } from 'puppeteer';
import { readFileSync } from 'fs';

describe('File evaluation', function () {
  let browser: Browser;

  before(async () => {
    browser = await launchBrowser();
  });

  it('Evaluates file', async function () {
    this.timeout(0);

    const sourceCode = readFileSync('./test/test.html').toString()

    const incognito = await browser.createBrowserContext();
    const page = await incognito.newPage();

    await page.setContent(sourceCode, { waitUntil: 'load' });

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/__webpack/act.bundle.js')
    });

    await page.keyboard.press('Tab'); // for R72 that needs to check the first focusable element

    // For rule 59br37
    await page.setViewport({
      width: 640,
      height: 512
    });

    const report = await page.evaluate(
      (fiLocale, enLocale, sourceCode) => {
        // @ts-expect-error: ACTRulesRunner will be defined within the puppeteer execution context.
        window.act = new ACTRulesRunner({}, { translate: fiLocale, fallback: enLocale });
        // @ts-expect-error: window.act has been defined earlier.
        window.act.configure();

        // @ts-expect-error: window.act has been defined earlier.
        window.act.test({ sourceHtml: sourceCode });
        // @ts-expect-error: window.act has been defined earlier.
        window.act.testSpecial();
        // @ts-expect-error: window.act has been defined earlier.
        return window.act.getReport();
      },
      LocaleFetcher.get('en'),
      LocaleFetcher.get('en'),
      sourceCode
    );

    console.log(JSON.stringify(report, null, 2));
    // console.log(report.assertions['QW-ACT-R7'].results.length);
    expect(report).to.not.be.undefined;
  });

  after(async () => {
    await browser.close();
  });
});
