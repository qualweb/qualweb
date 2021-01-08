import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

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
  it('pup open', async function () {
    browser = await puppeteer.launch();
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
        this.timeout(10 * 1000);
        const dom = new Dom();
        const { page } = await dom.getDOM(browser, {}, test.url, null);
        await page.addScriptTag({
          path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
        });
        await page.addScriptTag({
          path: require.resolve('../../dist/bp.js')
        });
        const report = await page.evaluate(
          (rules) => {
            const bp = new BestPractices.BestPractices(rules);
            return bp.execute(new QWPage.QWPage(document, window));
          },
          { bestPractices: ['QW-BP1'] }
        );

        expect(report['assertions']['QW-BP1'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }

  describe(``, function () {
    it(`pup shutdown`, async function () {
      await browser.close();
    });
  });
});
