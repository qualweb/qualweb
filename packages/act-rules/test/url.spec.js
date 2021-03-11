import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    const url = 'http://she.as/'
    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { act: true }, waitUntil: ["load", 'networkidle2'] }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.js')
    });
    
    const report = await page.evaluate(() => {
      const actRules = new ACTRules.ACTRules(/*{ rules: ['QW-ACT-R62'] }*/);
      return actRules.execute([], new QWPage.QWPage(document, window, true));
    });
    console.log(JSON.stringify(report, null, 2))
    expect(report);
  });
});