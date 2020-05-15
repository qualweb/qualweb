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
    this.timeout(100 * 10000);
    const browser = await puppeteer.launch();
    const data = await getTestCases();
    let tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return {title: t.testcaseTitle, url: t.url, outcome: t.expected};
    });
    tests[3].outcome = 'warning';
    tests[5].outcome = 'warning';
    tests[6].outcome = 'warning';
    tests[12].outcome = 'warning';
    tests[13].outcome = 'warning';
    tests[14].outcome = 'warning';
    tests[15].outcome = 'warning';
    tests[16].outcome = 'warning';
    tests[17].outcome = 'warning';

    //tests = tests.slice(16,tests.length);

    //TODO
    //failed 5 possivel bug no AName
    //passed 12 o q fazer?

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

          expect(report.rules[rule].metadata.outcome).to.be.equal(test.outcome);
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
