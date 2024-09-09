import { expect } from 'chai';
import { launchBrowser } from './util';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
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

    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();

    const dom = new Dom(page);
    await dom.process({ execute: { act: true }, waitUntil: ['load'] }, '', sourceCode);

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.bundle.js')
    });

    await page.keyboard.press('Tab'); // for R72 that needs to check the first focusable element
    await page.evaluate(
      (fiLocale, enLocale, sourceCode) => {
        // @ts-expect-error: ACTRules will be defined within the puppeteer execution context.
        window.act = new ACTRules({ translate: fiLocale, fallback: enLocale });
        window.act.configure({ rules: ['QW-ACT-R34'] });
        window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent();

        const parser = new DOMParser();
        const sourceDoc = parser.parseFromString('', 'text/html');

        sourceDoc.documentElement.innerHTML = sourceCode;

        const elements = sourceDoc.querySelectorAll('meta');
        const metaElements = [];
        for (const element of elements) {
          metaElements.push(window.qwPage.createQWElement(element));
        }

        window.act.validateMetaElements(metaElements);
        window.act.executeAtomicRules();
        window.act.executeCompositeRules();
      },
      locales.en,
      locales.en,
      sourceCode
    );

    await page.setViewport({
      width: 640,
      height: 512
    });

    const report = await page.evaluate(() => {
      window.act.validateZoomedTextNodeNotClippedWithCSSOverflow();
      return window.act.getReport();
    });

    console.log(JSON.stringify(report, null, 2));
    // console.log(report.assertions['QW-ACT-R7'].results.length);
    expect(report);
  });

  // after(async () => {
  //   await browser.close();
  // });
});
