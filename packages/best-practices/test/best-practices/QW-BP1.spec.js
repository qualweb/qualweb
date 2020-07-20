const { expect } = require('chai');
const playwright = require('playwright');
const { getDom } = require('../getDom');


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
  let context,browser;
  it('pup open', async function () {
    browser = await playwright['chromium'].launch({headless:false});
    context = await browser.newContext({bypassCSP:true});
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
            path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
          })
          await page.addScriptTag({
            path: require.resolve('../../dist/bp.js')
          })
          const report = await page.evaluate(( rules) => {
            const bp = new BestPractices.BestPractices(rules);
            let report= bp.execute(new QWPage.QWPage(document, window));
            return report;
          }, {bestPractices: ['QW-BP1']});

        expect(report['assertions']['QW-BP1'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
  describe(``,  function () {
    it(`pup shutdown`, async function () {
      await browser.close();
    });
  });
});