<<<<<<< HEAD
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const path = require('path');

const { mapping } = require('../constants');
const { getTestCases, getDom } = require('../getDom');
const { ACTRules } = require('../../dist/index');

const rule = path.basename(__filename).split('.')[0];
const ruleId = mapping[rule];

describe(`Rule ${rule}`, async function () {
  
  it('Starting testbench', async function () {
    const browser = await puppeteer.launch();
    const data = JSON.parse(await getTestCases());
    const tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return { title: t.testcaseTitle, url: t.url, outcome: t.expected };
    });

    describe('Running tests', function() {
      for (const test of tests || []) {
        it(test.title, async function() {
          this.timeout(100 * 1000);
          const { sourceHtml, page, stylesheets } = await getDom(browser, test.url);
          const actRules = new ACTRules({ rules: [rule] });
          const report = await actRules.execute(sourceHtml, page, stylesheets);

          expect(report.rules[rule].metadata.outcome).to.be.equal(test.outcome);
        });
      }
    });

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
=======

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

describe('Rule QW-ACT-R11', async function () {

  const ruleId = '97a4e1';
  let testCases = [];
  let browser;
  let json;

  it("", async function () {
    json = JSON.parse(await request('https://act-rules.github.io/testcases.json'));
    browser = await puppeteer.launch();

    testCases = json.testcases.filter(tc => tc.ruleId === ruleId);
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
          const { sourceHtml, page, stylesheets } = await getDom(browser, test.url);
          configure({
            rules: ['QW-ACT-R11']
          });
          const report = await executeACTR(sourceHtml, page, stylesheets);
          expect(report.rules['QW-ACT-R11'].metadata.outcome).to.be.equal(test.expected);
        });
      });
    }
    describe(``, async function () {
      it(``, async function () {
>>>>>>> feature/5c01ea-QW-ACT-R25
        await browser.close();
      });
    });
  });
});
