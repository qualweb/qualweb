import { expect } from 'chai';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    
    const url = 'https://ciencias.ulisboa.pt';
    const response = await fetch(url);
    const sourceCode = await response.text();

    const browser = await puppeteer.launch();
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { act: true }, waitUntil: ["load", "networkidle0"] }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.bundle.js')
    });

    const headContent = sourceCode.split('<head>')[1].split('</head>')[0];

    await page.evaluate(() => {
      window.qwPage = new Module.QWPage(document, window, true);
      window.DomUtils = Utility.DomUtils;
      window.AccessibilityUtils = Utility.AccessibilityUtils;
      window.act = new ACT.ACTRules();
    });

    await page.keyboard.press("Tab"); // for R72 that needs to check the first focusable element
    await page.evaluate((headContent) => {
      window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent();

      const parser = new DOMParser();
      const sourceDoc = parser.parseFromString('', "text/html");

      sourceDoc.head.innerHTML = headContent;

      const elements = sourceDoc.querySelectorAll("meta");
      const metaElements = new Array();
      for (const element of elements) {
        metaElements.push(Module.QWPage.createQWElement(element));
      }

      window.act.validateMetaElements(metaElements);
      window.act.executeAtomicRules();
      window.act.executeCompositeRules();
    }, headContent);

    await page.setViewport({
      width: 640,
      height: 512,
    });

    const report = await page.evaluate(() => {
      window.act.validateZoomedTextNodeNotClippedWithCSSOverflow();
      return window.act.getReport();
    });

    await dom.close();
    await browser.close();

    console.log(report);
    expect(report);
  });
});