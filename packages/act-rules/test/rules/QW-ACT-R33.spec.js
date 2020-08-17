const {expect} = require('chai');
const puppeteer = require('puppeteer');
const path = require('path');

const {mapping} = require('../constants');
const {getTestCases, getDom} = require('../getDom');
const {ACTRules} = require('../../dist/index');
const { Dom } = require('@qualweb/dom');


const rule = path.basename(__filename).split('.')[0];
const ruleId = mapping[rule];

describe(`Rule ${rule}`, async function () {

  it('Starting testbench', async function () {
    let browser =await puppeteer.launch({headless:false})
    const data = await getTestCases();
    const tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return {title: t.testcaseTitle, url: t.url, outcome: t.expected};
    });

    describe('Running tests', function () {
      for (const test of tests || []) {
        it(test.title, async function () {
          this.timeout(100 * 1000);
          const dom = new Dom();
          const {sourceHtml, page, stylesheets} = await dom.getDOM(browser, {}, test.url, null);
          console.log(test.url);

          await page.addScriptTag({
                        path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')

          })
          await page.addScriptTag({
            path: require.resolve('../../dist/act.js')
          })
          sourceHtml.html.parsed = {};
          const report = await page.evaluate((sourceHtml, stylesheets, rules) => {
            const actRules = new ACTRules.ACTRules(rules);
            const report = actRules.execute(sourceHtml, new QWPage.QWPage(document), stylesheets);
            return report;
          }, sourceHtml, stylesheets, {rules: [rule]});

          expect(report.assertions[rule].metadata.outcome).to.be.equal(test.outcome);
        });
      }
    });

    /*describe('Custom test', function () {
      it('should execute', async function () {
        this.timeout(1000 * 1000);

        const {sourceHtml, page, stylesheets} = await getDom(browser, 'https://ciencias.ulisboa.pt');
        const actRules = new ACTRules({rules: [rule]});
        const report = await actRules.execute(sourceHtml, page, stylesheets);
      });
    });*/

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
       // await browser.close();
      });
    });
  });
});
