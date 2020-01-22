const {
  configure,
  executeACTR
} = require('../../dist/index');
const {getDom} = require('../getDom');
const {expect} = require('chai');
const puppeteer = require('puppeteer');
const {ACTRules} = require('../../dist/index');

describe('Rule QW-ACT-R9', async function () {
  it('Starting testbench', async function () {
    const browser = await puppeteer.launch();
    const tests = [
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/passed1.html',
        outcome: 'passed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/passed2.html',
        outcome: 'passed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/passed3.html',
        outcome: 'passed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/passed4.html',
        outcome: 'passed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/passed5.html',
        outcome: 'passed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/passed6.html',
        outcome: 'passed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/failed1.html',
        outcome: 'failed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/failed2.html',
        outcome: 'failed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/failed3.html',
        outcome: 'failed'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/ina1.html',
        outcome: 'inapplicable'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/ina2.html',
        outcome: 'inapplicable'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/ina3.html',
        outcome: 'inapplicable'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/ina4.html',
        outcome: 'inapplicable'
      },
      {
        url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/headers/ina5.html',
        outcome: 'inapplicable'
      }
    ];

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
          this.timeout(100 * 1000);
          const {sourceHtml, page, stylesheets} = await getDom(browser, test.url);
          const actRules = new ACTRules({rules: ['QW-ACT-R36']});
          const report = await actRules.execute(sourceHtml, page, stylesheets);

          expect(report.rules['QW-ACT-R36'].metadata.outcome).to.be.equal(test.outcome);
        });
      });
    }

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
        await browser.close();
      });
    });
  });
});
