import fetch from 'node-fetch';
import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import CSSselect from 'css-select';
const { DomUtils } = require('@qualweb/util');


async function getTestCases() {
  const response = await fetch('https://act-rules.github.io/testcases.json');
  return await response.json();
}

const mapping = {
  'QW-ACT-R4': {code: 'bc659a',selector:'meta'},
  'QW-ACT-R71': {code:'bisz58',selector:'meta'},
};

const rule = process.argv[3].toUpperCase();
const ruleObject = mapping[rule];
const ruleId = ruleObject['code'];
const selector = ruleObject['selector'];


describe(`Rule ${rule}`, function () {
  let browser = null;
  let data = null;
  let tests = null;

  it('Starting testbench', async function () {
    browser = await puppeteer.launch({ headless: false });
    data = await getTestCases();
    tests = data.testcases.filter(t => t.ruleId === ruleId).map(t => {
      return { title: t.testcaseTitle, url: t.url, outcome: t.expected };
    });

    // tests = [
    //   {
    //     title: 'R72',
    //     url: 'http://127.0.0.1/a11y/',
    //     outcome: 'passed'
    //   }
    // ];

    describe('Running tests', function () {
      tests.forEach(function (test) {
        it(test.title, async function () {
          this.timeout(100 * 1000);
          const dom = new Dom();
          const {sourceHtml, page } = await dom.getDOM(browser, { execute: { act: true } }, test.url, null);
          let preProcessElements = CSSselect(selector,sourceHtml.html.parsed);
          let elements = convertElements(selector,preProcessElements)
          //console.log(elements);

          await page.addScriptTag({
            path: require.resolve('@qualweb/qw-page')
          });

          await page.addScriptTag({
            path: require.resolve('../dist/act.js')
          });

          const report = await page.evaluate((elements,rules) => {
            const actRules = new ACTRules.ACTRules(rules);
            const report = actRules.execute(elements, new QWPage.QWPage(document, window, true));
            return report;
          },elements,{ rules: [rule] });

          expect(report.assertions[rule].metadata.outcome).to.be.equal(test.outcome);
        });
      });
    });

    describe(`Closing testbench`, async function () {
      it(`Closed`, async function () {
        await browser.close();
      });
    });
  });
});

function convertElements(selector,elements){
  let result= [];

  if(selector === 'meta'){
    for (let element of elements) {
      const content = DomUtils.getSourceElementAttribute(element, 'content');
      const httpEquiv = DomUtils.getSourceElementAttribute(element, 'http-equiv');
      const htmlCode = DomUtils.getSourceElementHtmlCode(element, true, false);
      const selector = DomUtils.getSourceElementSelector(element);
      result.push({ content, httpEquiv, htmlCode, selector })
    }

  }
  return result;
}