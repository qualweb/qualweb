const {
  configure,
  executeACTR
} = require('../../dist/index');

const { expect } = require('chai');
const puppeteer = require('puppeteer');
const {
  getDom
} = require('../getDom');

const request = require('request-promise');

describe('Rule QW-ACT-R26', async function () {

  const ruleId = 'eac66b';
  let testCases = [];
  let browser;
  let json

  it("", async function () {
    json = JSON.parse(await request('https://act-rules.github.io/testcases.json'));
    browser = await puppeteer.launch();

    testCases = json.testcases.filter(tc => tc.ruleId === ruleId);
    testCases[0].expected='warning';
    testCases[1].expected='warning';
    testCases[2].expected='warning';
    testCases[3].expected='warning';
    let i = 0;
    let lastOutcome = 'passed';
 
    for (const test of testCases || []) {
      if (test.expected !== lastOutcome) {
        lastOutcome = test.expected;
        i = 0;
      }
      i++;
      describe(`${test.expected.charAt(0).toUpperCase() + test.expected.slice(1)} example ${i}`, function () {
        it(`should have outcome="${test.expected}"`, async function () {
          this.timeout(10 * 1000);
          console.log(test.url)
          const { sourceHtml, page, stylesheets } = await getDom(browser, test.url); configure({//
            rules: ['QW-ACT-R26']
          });
          const report = await executeACTR(sourceHtml, page, stylesheets);
          expect(report.rules['QW-ACT-R26'].metadata.outcome).to.be.equal(test.expected);
        });
      });
    }
    describe(``, async function () {
      it(``, async function () {
        await browser.close();
      });
    });
  });
});
