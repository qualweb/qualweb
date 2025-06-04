import { Browser, BrowserContext } from 'puppeteer';
import { expect } from 'chai';
import { launchBrowser } from '../util';
import * as fs from "fs";
import * as path from "path";



/**
 * Constructs a test suite for a given CUI check. This is a generalized
 * builder, based on the case that many CXX unit tests are close to identical.
 * @param {string} cuiCheck
 * @param {{ code: string,locale:string, outcome: string }[]} testCases
 */
export function buildTest(cuiCheck: string, testCases: { code: string, selectors:{ [key: string]: string },locale:string, outcome: string }[]) {
  const FAKE_ORIGIN = 'https://qualweb.localhost';
  describe(cuiCheck, () => {
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


    const outcomeCounters: Record<string, number> = {};

    testCases.forEach((test) => {
      if (outcomeCounters[test.outcome]) {
        outcomeCounters[test.outcome] += 1;
      } else {
        outcomeCounters[test.outcome] = 1;
      }

      it(`${test.outcome} ${outcomeCounters[test.outcome]}`, async function () {
        this.timeout(0);

        const page = await browserContext.newPage();
  

    await page.evaluateOnNewDocument((args) => {
          Object.defineProperty(navigator, "language", {
              get: function () {
                  return args[0];
              }
          });
      }, ["pt-PT", "pt"]);
       
await page.setRequestInterception(true);
await page.setBypassCSP(true);
page.on("request", (request) => {
  let url = request.url();


  if (request.url().includes('palavras-mais-comuns-utf8.txt')) {
    const filePath = path.resolve(__dirname, "../", "palavras-mais-comuns-utf8.txt");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    request.respond({
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: fileContent,
    });
  }else if(url === `${FAKE_ORIGIN}/`) {
    request.respond({
      status: 200,
      contentType: 'text/html',
      body: test.code,
    });
    
  }  else {
    request.abort();

  }
});
 ;
await page.goto(FAKE_ORIGIN);

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
          path: require.resolve('../../dist/__webpack/cui.bundle.js')
        });
        
        const selector = test.selectors;

        const settingsTests = {
          locale: test.locale,
        }

  const report = await page.evaluate(async (cuiCheck, selector,settingsTests,FAKE_ORIGIN) => {

      // @ts-expect-error: CUIChecksRunner should be defined within the executing context (injected above).
      const cui = new CUIChecksRunner({ include: [cuiCheck] ,selectors:selector,settings:settingsTests}, 'en',`${FAKE_ORIGIN}/palavras-mais-comuns-utf8.txt`).configure({ include: [cuiCheck] });
      let results = await cui.executeTests();
      return results.getReport();
    }, cuiCheck, selector,settingsTests,FAKE_ORIGIN);
      
        
        console.log(report);
        expect(report.assertions[cuiCheck].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  });
}
