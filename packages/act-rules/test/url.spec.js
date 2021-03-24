import { expect } from 'chai';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    //const url = 'https://act-rules.github.io/testcases/bc659a/cbf6409b0df0b3b6437ab3409af341587b144969.html'
    const url = 'https://ciencias.ulisboa.pt';
    const response = await fetch(url);
    const sourceCode = await response.text();

    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { act: true }, waitUntil: ["load", "networkidle0"] }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.js')
    });

    const headContent = sourceCode.split('<head>')[1].split('</head>')[0];

    await page.evaluate(() => {
      window.page = new QWPage.QWPage(document, window, true);
      window.act = new ACTRules.ACTRules({ rules: ['QW-ACT-R1'] });
    });

    await page.keyboard.press("Tab"); // for R72 that needs to check the first focusable element
    await page.evaluate((headContent) => {
      window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent(window.page);

      const parser = new DOMParser();
      const sourceDoc = parser.parseFromString('', "text/html");

      sourceDoc.head.innerHTML = headContent;

      const elements = sourceDoc.querySelectorAll("meta");
      const metaElements = new Array();
      for (const element of elements) {
        metaElements.push(QWPage.QWPage.createQWElement(element));
      }

      window.act.validateMetaElements(metaElements);
      window.act.executeAtomicRules(window.page);
      window.act.executeCompositeRules(window.page);
    }, headContent);

    await page.setViewport({
      width: 640,
      height: 512,
    });

    const report = await page.evaluate(() => {
      window.act.validateZoomedTextNodeNotClippedWithCSSOverflow(window.page);
      return window.act.getReport();
    });

    console.log(report)
    expect(report);
  });
});