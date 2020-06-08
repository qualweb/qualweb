const {expect} = require('chai');
const puppeteer = require('puppeteer');
const path = require('path');

const {mapping} = require('../constants');
const {getTestCases, getDom} = require('../getDom');
const {ACTRules} = require('../../dist/index');

const rule = path.basename(__filename).split('.')[0];
const ruleId = mapping[rule];

describe(`Rule ${rule}`, async function () {

  it('Starting testbench', async function () {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.launch();
    //const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });
    const data = await getTestCases();
    const tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return {title: t.testcaseTitle, url: t.url, outcome: t.expected};
    });

    describe('Running tests', function () {
      for (const test of tests || []) {
        it(test.title, async function () {
          this.timeout(100 * 1000);
          const {sourceHtml, page, stylesheets} = await getDom(browser, test.url);
          console.log(test.url);

          await page.addScriptTag({
            path: require.resolve('../qwPage.js')
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
          console.log(report.assertions[rule])

          expect(report.assertions[rule].metadata.outcome).to.be.equal(test.outcome);
        });
      }
    });

    /*describe('Custom test', function() {
      it('should execute', async function() {
        this.timeout(1000 * 1000);

        const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/');
        const actRules = new ACTRules({ rules: [rule] });
        const report = await actRules.execute(sourceHtml, page, stylesheets);
       // console.log(report.rules['QW-ACT-R39'].results)
      });
    });*/

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
        //await browser.close();
      });
    });
  });
});

