import { Browser, BrowserContext } from 'puppeteer';
import { expect } from 'chai';
import { QualWeb } from '@qualweb/core';
import { launchBrowser } from '../util';

/**
 * Constructs a test suite for a given WCAG technique. This is a generalized
 * builder, based on the case that many TXX unit tests are close to identical.
 * @param {string} wcagTechnique
 * @param {{ code: string, outcome: string }[]} testCases
 */
export function buildTest(wcagTechnique: string, testCases: { code: string, outcome: string }[]) {
  describe(wcagTechnique, () => {
    let browser: Browser;
    let incognito: BrowserContext;

    // Fire up Puppeteer before any test runs. All tests are run in their
    // own browser contexts, so restarting puppeteer itself should not be
    // necessary between tests.
    before(async () => browser = await launchBrowser());

    // Close the puppeteer instance once all tests have run.
    after(async () => await browser.close());

    // Create a unique browser context for each test.
    beforeEach(async () => incognito = await browser.createIncognitoBrowserContext());

    // Make sure the browser contexts are shut down, as well.
    afterEach(async () => await incognito?.close());

    const outcomeCounters: Record<string, number> = {};

    testCases.forEach((test) => {
      if (outcomeCounters[test.outcome]) {
        outcomeCounters[test.outcome] += 1;
      } else {
        outcomeCounters[test.outcome] = 1;
      }

      it(`${test.outcome} ${outcomeCounters[test.outcome]}`, async function () {
        this.timeout(0);

        const page = await incognito.newPage();

        const qwPage = QualWeb.createPage(page);
        await qwPage.process({ execute: { wcag: true }, 'wcag-techniques': { include: [wcagTechnique] } }, '', test.code);

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
          path: require.resolve('../../dist/wcag.bundle.js')
        });

        const report = await page.evaluate((wcagTechnique) => {
          // @ts-expect-error: WCAGTechniques should be defined within the executing context (injected above).
          const wcag = new WCAGTechniques('en').configure({ include: [wcagTechnique] });
          return wcag.test({}).getReport();
        }, wcagTechnique);

        expect(report.assertions[wcagTechnique].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  });
}
