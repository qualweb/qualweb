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

    describe('Custom test', function() {
      it('should execute', async function() {
        this.timeout(1000 * 1000);

        const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://nkmal.no/kontakt');
        const actRules = new ACTRules({ rules: [rule] });
        const report = await actRules.execute(sourceHtml, page, stylesheets);
        //console.log(JSON.stringify(report, null, 2));
      });
    });

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
        await browser.close();
      });
    });
  });
});
