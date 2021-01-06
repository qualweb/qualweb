const { expect } = require('chai');
const puppeteer = require('puppeteer');
const path = require('path');
const { mapping } = require('../constants');
const { getTestCases } = require('../getDom');
const { Dom } = require('@qualweb/dom');

const rule = path.basename(__filename).split('.')[0];
const ruleId = mapping[rule];

describe(`Rule ${rule}`, async function () {

  it('Starting testbench', async function () {
    this.timeout(100 * 10000);
    const browser = await puppeteer.launch({ headless: true });
    const data = await getTestCases();
    let tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return { title: t.testcaseTitle, url: t.url, outcome: t.expected };
    });
    const dom = new Dom();


    describe('Running tests', function () {
      for (const test of tests || []) {
        it(test.title, async function () {
          this.timeout(100 * 1000);
          const { sourceHtml, page } = await dom.getDOM(browser, {}, test.url);
          console.log(test.url);

          await page.addScriptTag({
            path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')

          })
          await page.addScriptTag({
            path: require.resolve('../../dist/act.js')
          })
          const report = await page.evaluate((rules) => {
            const actRules = new ACTRules.ACTRules(rules);
            const report = actRules.execute([], new QWPage.QWPage(document,window,true));
            return report;
          }, { rules: [rule] });

          expect(report.assertions[rule].metadata.outcome).to.be.equal(test.outcome);
          if (report.assertions[rule].metadata.outcome === test.outcome)
            page.close();
        });
      }
    });

    describe(`Closing testbench`, async function () {
      it(`closed`, async function () {
        await browser.close();
      });
    });
  });
});
