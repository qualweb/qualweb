const {expect} = require('chai');
<<<<<<< HEAD
=======
const playwright = require('playwright');
>>>>>>> develop
const puppeteer = require('puppeteer');
const path = require('path');

const {mapping} = require('../constants');
<<<<<<< HEAD
const {getTestCases, getDom} = require('../getDom');
=======
const {getTestCases} = require('../getDom');
const { Dom } = require('@qualweb/dom');
>>>>>>> develop
const {ACTRules} = require('../../dist/index');

const rule = path.basename(__filename).split('.')[0];
const ruleId = mapping[rule];

describe(`Rule ${rule}`, async function () {

  it('Starting testbench', async function () {
<<<<<<< HEAD
    const browser = await puppeteer.launch({headless:false});
=======
    //const browser = await playwright.chromium.launch();
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });
>>>>>>> develop
    const data = await getTestCases();
    const tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return {title: t.testcaseTitle, url: t.url, outcome: t.expected};
    });

    describe('Running tests', function () {
      for (const test of tests || []) {
        it(test.title, async function () {
          this.timeout(100 * 1000);
<<<<<<< HEAD
          const {sourceHtml, page, stylesheets} = await getDom(browser, test.url);
          console.log(test.url);

          await page.addScriptTag({
            path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
=======
          const dom = new Dom();
          const { sourceHtml, page } = await dom.getDOM(browser, {}, test.url);

          await page.addScriptTag({
                        path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')

>>>>>>> develop
          })
          await page.addScriptTag({
            path: require.resolve('../../dist/act.js')
          })
<<<<<<< HEAD
          const report = await page.evaluate((rules) => {
            const actRules = new ACTRules.ACTRules();
            const report = actRules.execute([], new QWPage.QWPage(document,window), []);
            return report;
          }, {rules: [rule]});
          console.log(report.assertions[rule]);
=======
          sourceHtml.html.parsed = {};
          const report = await page.evaluate((sourceHtml, rules) => {
            const actRules = new ACTRules.ACTRules(rules);
            const report = actRules.execute(sourceHtml, new QWPage.QWPage(document, window, true));
            return report;
          }, sourceHtml, {rules: [rule]});
>>>>>>> develop

          expect(report.assertions[rule].metadata.outcome).to.be.equal(test.outcome);
        });
      }
    });

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
        //await browser.close();
      });
    });
  });
});
