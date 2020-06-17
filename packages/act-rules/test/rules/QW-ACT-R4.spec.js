const { expect } = require('chai');
const puppeteer = require('puppeteer');
const path = require('path');
const CSSselect = require('css-select');

const { mapping } = require('../constants');
const { getTestCases, getDom } = require('../getDom');
const { ACTRules } = require('../../dist/index');
const { DomUtils } = require('@qualweb/util');
const { Dom } = require('@qualweb/dom');


const rule = path.basename(__filename).split('.')[0];
const ruleId = mapping[rule];

describe(`Rule ${rule}`, async function () {

  it('Starting testbench', async function () {
    //const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });
    const browser = await puppeteer.launch();
    const data = await getTestCases();
    const tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return { title: t.testcaseTitle, url: t.url, outcome: t.expected };
    });

    describe('Running tests', function () {
      for (const test of tests || []) {
        it(test.title, async function () {
          this.timeout(100 * 1000);
          const dom = new Dom();
          const { sourceHtml, page, stylesheets } = await dom.getDOM(browser, {}, test.url, null);
          page.on('console', msg => {
            for (let i = 0; i < msg.args.length; ++i)
              console.log(`${i}: ${msg.args[i]}`);
          });
          console.log(test.url);
          const metaElements = CSSselect("meta", sourceHtml.html.parsed);
          let result = [];
          for (let element of metaElements) {
            const content = DomUtils.getSourceElementAttribute(element, 'content');
            const httpEquiv = DomUtils.getSourceElementAttribute(element, 'http-equiv');
            const htmlCode = DomUtils.getSourceElementHtmlCode(element, true, false);
            const selector = DomUtils.getSourceElementSelector(element);
            result.push({ content, httpEquiv, htmlCode, selector })
          }

          await page.addScriptTag({
            path: require.resolve('../qwPage.js')
          })
          await page.addScriptTag({
            path: require.resolve('../../dist/act.js')
          })

          const report = await page.evaluate((metaElements, stylesheets, rules) => {
            const actRules = new ACTRules.ACTRules(rules);
            const report = actRules.execute(metaElements, new QWPage.QWPage(document), stylesheets);
            return report;
          }, result, stylesheets, { rules: [rule] });

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
