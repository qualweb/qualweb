const { expect } = require('chai');
const path = require('path');

const { mapping } = require('../constants');
const { getTestCases, getDom } = require('../getDom');
const { ACTRules } = require('../../dist/index');
const { Dom } = require('@qualweb/dom');
const playwright = require('playwright');


const rule = path.basename(__filename).split('.')[0];
const ruleId = mapping[rule];

describe(`Rule ${rule}`, async function () {

  it('Starting testbench', async function () {
    this.timeout(1000 * 1000);
    //['chromium', 'firefox', 'webkit']
    const browser = await playwright['chromium'].launch({headless:true});
    const context = await browser.newContext({bypassCSP:true});
    const data = await getTestCases();
    const tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return { title: t.testcaseTitle, url: t.url, outcome: t.expected };
    });
    describe('Running tests', function () {
      for (const test of tests || []) {
        it(test.title, async function () {

          this.timeout(100 * 1000);
          const { sourceHtml, page, stylesheets } = await getDom(context, test.url);

          await page.addScriptTag({
                        path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')

          })
          await page.addScriptTag({
            path: require.resolve('../../dist/act.js')
          })

          const report = await page.evaluate((stylesheets) => {
            const actRules = new ACTRules.ACTRules();
            const report = actRules.execute([], new QWPage.QWPage(document, window, true), stylesheets);
            return report;
          }, [rule]);
          // const report = await page.evaluate((sourceHtml, stylesheets, rules) => {
          //   const actRules = new ACTRules.ACTRules(rules);
          //   const report = actRules.execute(sourceHtml, new QWPage.QWPage(document, window), stylesheets);
          //   return report;
          // }, sourceHtml, stylesheets, { rules: [rule] });

          expect(report.assertions[rule].metadata.outcome).to.be.equal(test.outcome);


        });
      }
    });

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
        await browser.close();
      });
    });
  });
});
