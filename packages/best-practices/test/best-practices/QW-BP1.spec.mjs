import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

describe('Best practice QW-BP1', function () {
  const tests = [
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/h42/warning1.html',
      outcome: 'warning'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/h42/failed1.html',
      outcome: 'failed'
    }
  ];
  let browser = null;
  let incognito = null;
  it('Opening browser', async function () {
    browser = await puppeteer.launch();
    incognito = await browser.createIncognitoBrowserContext();
  });
  let i = 0;
  let lastOutcome = 'warning';
  for (const test of tests || []) {
    if (test.outcome !== lastOutcome) {
      lastOutcome = test.outcome;
      i = 0;
    }
    i++;

    describe(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, function () {
      it(`should have outcome="${test.outcome}"`, async function () {
        this.timeout(0);

        const page = await incognito.newPage();
        const dom = new Dom(page);
        await dom.process({ execute: { bp: true } }, test.url, null);

        await page.addScriptTag({
          path: require.resolve('@qualweb/qw-page')
        });
        await page.addScriptTag({
          path: require.resolve('@qualweb/util')
        });
        await page.addScriptTag({
          path: require.resolve('../../dist/bp.bundle.js')
        });
        const report = await page.evaluate(
          (rules) => {
            const bp = new BP.BestPractices(rules);
            return bp.execute();
          },
          { bestPractices: ['QW-BP1'] }
        );
        await page.close();
        expect(report['assertions']['QW-BP1'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }

  describe(`Closing browser`, function () {
    it(`pup shutdown`, async function () {
      await incognito.close();
      await browser.close();
    });
  });
});
