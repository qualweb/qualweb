const { executeBestPractices } = require('../../dist/index');
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const { getDom } = require('../getDom');

describe('Best Practice QW-BP7', function () {
  const tests = [
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/bp7/passed.html',
      outcome: 'passed'
    },
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
        const { page } = await getDom(browser,test.url);

        const report = await executeBestPractices(page);
        expect(report['best-practices']['QW-BP7'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
  describe(``,  function () {
    it(`pup shutdown`, async function () {
      await browser.close();
    });
  });
});
