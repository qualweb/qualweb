const { BestPractices } = require('../../dist/index');
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const { getDom } = require('../getDom');


describe('Best Practice QW-BP3', function () {
  const tests = [
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp3/passed.html',
      outcome: 'passed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp3/failed.html',
      outcome: 'failed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp3/failed2.html',
      outcome: 'failed'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp3/inapplicable.html',
      outcome: 'inapplicable'
    }
  ];
  let browser;
  it("pup open", async function () {
    browser = await puppeteer.launch();
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
        this.timeout(10 * 1000);
        const { sourceHtml, page, stylesheets } = await getDom(browser, test.url);
        await page.addScriptTag({
          path: require.resolve('../qwPage.js')
        })
        await page.addScriptTag({
          path: require.resolve('../bp.js')
        })
        const report = await page.evaluate(( rules) => {
          const bp = new BestPractices.BestPractices(rules);
          let report= bp.execute(new QWPage.QWPage(document));
          return report;
        }, {bestPractices: ['QW-BP3']});

        expect(report['best-practices']['QW-BP3'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
  describe(``, function () {
    it(`pup shutdown`, async function () {
      await browser.close();
    });
  });
});
