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
   let browser =await puppeteer.launch({headless:false,args: ['--autoplay-policy=no-user-gesture-required','--disable-features=AutoplayIgnoreWebAudio']})
    const data = await getTestCases();
    const tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return {title: t.testcaseTitle, url: t.url, outcome: t.expected};
    });

    describe('Running tests', function () {
      for (const test of tests || []) {
        it(test.title, async function () {
          this.timeout(100 * 10000);
          const {sourceHtml, page, stylesheets} = await getDom(browser, test.url);
          console.log(test.url);

          await page.addScriptTag({
            path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
          })
          await page.addScriptTag({
            path: require.resolve('../../dist/act.js')
          })
          const report = await page.evaluate((rules) => {
            const actRules = new ACTRules.ACTRules();
            const report = actRules.execute([], new QWPage.QWPage(document,window), []);
            return report;
          }, {rules: [rule]});

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
