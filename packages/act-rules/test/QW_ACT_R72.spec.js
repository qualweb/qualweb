import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    const url = 'http://app-bleauborgerumb-dev-001.azurewebsites.net/';
    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { act: true } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.js')
    });

    await page.evaluate(() => {
      // @ts-ignore
      window.page = new QWPage.QWPage(document, window, true);
    });

    await page.keyboard.press("Tab"); // for R72 that needs to check the first focusable element
    
    const actReportR72 = await page.evaluate(() => {
      // @ts-ignore
      const act = new ACTRules.ACTRules();
      // @ts-ignore
      return act.executeQW_ACT_R72(window.page);
    });

    await page.evaluate(() => {
      const actRules = new ACTRules.ACTRules(/*{ rules: ['QW-ACT-R62'] }*/);
      return actRules.execute([], window.page);
    });

    console.log(JSON.stringify(actReportR72, null, 2))
    expect(actReportR72);
  });
});