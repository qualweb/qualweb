const { BestPractices } = require('../../dist/index');
const { expect } = require('chai');
const playwright = require('playwright');
const { getDom } = require('../getDom');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

describe('Technique QW-BP15', function () {
  const tests = [
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~asantos/BP15/test1.html',
      outcome: 'failed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~asantos/BP15/test2.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~asantos/BP15/test3.html',
      outcome: 'inapplicable'
    }
  ];
  let browser, context;
  it('pup open', async function () {
    browser = await playwright['chromium'].launch({ headless: false });
    context = await browser.newContext({ bypassCSP: true });
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
        const { sourceHtml, page, stylesheets } = await getDom(context, test.url);
        await page.addScriptTag({
          path: require.resolve('../../dist/bp.js')
        });
        await page.addScriptTag({
          path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
        });

        // sourceHtml.html.parsed = {};
        console.log('Evaluating');
        const report = await page.evaluate(
          (rules, stylesheets) => {
            const bp = new BestPractices.BestPractices(rules);
            const report = bp.execute(new QWPage.QWPage(document, window, true), stylesheets);
            return report;
          },
          ['QW-BP15']
        );
        // const report = await page.evaluate(( rules,stylesheets) => {
        //   const bp = new BestPractices.BestPractices(rules);
        //   let report= bp.execute(new QWPage.QWPage(document),stylesheets);
        //   return report;
        // }, {bestPractices: ['QW-BP15']},stylesheets);
        console.log(JSON.stringify(report['assertions']['QW-BP15'], null, 2));
        expect(report['assertions']['QW-BP15'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
  describe(``, function () {
    it(`pup shutdown`, async function () {
      // await browser.close();
    });
  });
});
