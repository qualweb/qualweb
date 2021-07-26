const { BestPractices } = require('../../dist/index');
const { expect } = require('chai');
const playwright = require('playwright');
const { getDom } = require('../getDom');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

describe('Best Practice QW-BP7', function () {
  const tests = [
    {
      url: 'https://cm-aljezur.pt/pt/Default.aspx',
      outcome: 'passed'
    }
    /*{
    url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/teste.html',
    outcome: 'failed'
    },
    {
    url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/teste1.html',
    outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/passed.html',
      outcome: 'passed'
    }/*,
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/passed2.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/passed3.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/failed.html',
      outcome: 'failed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/failed2.html',
      outcome: 'failed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/failed3.html',
      outcome: 'failed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/failed4.html',
      outcome: 'failed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/failed5.html',
      outcome: 'failed'
    }*/
  ];
  let browser, context;
  it('pup open', async function () {
    //['chromium', 'firefox', 'webkit']
    browser = await playwright['webkit'].launch({ headless: false });
    context = await browser.newContext();
  });
  let i = 0;
  let lastOutcome = 'passed';
  for (const test of tests || []) {
    if (test.outcome !== lastOutcome) {
      lastOutcome = test.outcome;
      i = 0;
    }
    i++;
    describe(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, function () {
      it(`should have outcome="${test.outcome}"`, async function () {
        this.timeout(10 * 1000000);
        const { sourceHtml, page, stylesheets } = await getDom(context, test.url);
        await page.addScriptTag({
          path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
        });
        await page.addScriptTag({
          path: require.resolve('../../dist/bp.js')
        });
        const report = await page.evaluate(
          (rules) => {
            const bp = new BestPractices.BestPractices(); //rules
            let report = bp.execute(new QWPage.QWPage(document, window));
            return report;
          },
          { bestPractices: ['QW-BP7'] }
        );

        expect(report['assertions']['QW-BP7'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
  describe(``, function () {
    it(`pup shutdown`, async function () {
      await browser.close();
    });
  });
});
