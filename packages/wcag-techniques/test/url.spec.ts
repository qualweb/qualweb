import { Browser, BrowserContext } from 'puppeteer';
import { expect } from 'chai';
import { launchBrowser } from './util';

describe('url.spec.js', function () {
  let browser: Browser;
  let browserContext: BrowserContext;

  // Fire up Puppeteer before any test runs. All tests are run in their
  // own browser contexts, so restarting puppeteer itself should not be
  // necessary between tests.
  before(async () => browser = await launchBrowser());

  // Close the puppeteer instance once all tests have run.
  after(async () => await browser.close());

  // Create a unique browser context for each test.
  // createIncognitoBrowserContext() is no longer supported. Is that a problem?
  beforeEach(async () => browserContext = await browser.createBrowserContext());

  // Make sure the browser contexts are shut down, as well.
  afterEach(async () => await browserContext?.close());

  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://www.sgambiente.gov.pt/contactos/';

    const page = await browserContext.newPage();

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
      path: require.resolve('../dist/__webpack/wcag.bundle.js')
    });

    await new Promise((r) => setTimeout(r, 2000));

    const report = await page.evaluate(() => {
      // @ts-expect-error: WCAGTechniques should be defined within the executing context.
      const wcag = new WCAGTechniquesRunner({}, 'en').configure({
        include: ['QW-WCAG-T9']
      });
      return wcag.test({}).getReport();
    });

    console.log(report);
    console.log(report.assertions['QW-WCAG-T9'].results);
    expect(report);
  });
});
