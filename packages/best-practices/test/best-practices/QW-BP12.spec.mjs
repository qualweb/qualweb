const { BestPractices } = require('../../dist/index');
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const { getDom } = require('../getDom');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

describe('Technique QW-BP12', function () {
  const tests = [
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~aestriga/TesteBp-12/test2.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~aestriga/TesteBp-12/test1.html',
      outcome: 'failed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~aestriga/TesteBp-12/test3.html',
      outcome: 'failed'
    }
  ];
  let browser;
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
        const { sourceHtml, page, stylesheets } = await getDom(browser, test.url);
        await page.addScriptTag({
          path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
        });
        await page.addScriptTag({
          path: require.resolve('../../dist/bp.js')
        });
        const report = await page.evaluate(
          (rules) => {
            const bp = new BestPractices.BestPractices(rules);
            let report = bp.execute(new QWPage.QWPage(document, window));
            return report;
          },
          { bestPractices: ['QW-BP12'] }
        );

        expect(report['assertions']['QW-BP12'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
  describe(``, function () {
    it(`pup shutdown`, async function () {
      await browser.close();
    });
  });
});
