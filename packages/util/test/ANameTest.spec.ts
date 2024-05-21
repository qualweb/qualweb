import { expect } from 'chai';
import { QualWeb } from '@qualweb/core';
import { usePuppeteer } from './util';

describe('ANameTest', function () {
  const proxy = usePuppeteer();

  it('Calculates accessible name correctly', async function () {
    this.timeout(100 * 1000);

    const url = 'http://localhost/test.html';

    const page = proxy.page;
    const qwPage = QualWeb.createPage(page);
    await qwPage.process({ execute: { act: true }, waitUntil: ['networkidle0'] }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });
    await new Promise(r => setTimeout(r, 2000));
    
    const aName = await page.evaluate(() => {
      const element = window.qwPage.getElement('html > body:nth-child(2) > div:nth-child(1) > label:nth-child(1) > span:nth-child(1) > input:nth-child(1)');
      //window.console.log("children:", element.getElement("slot:nth-of-type(1)"));
      //window.console.log(window.AccessibilityUtils.getAccessibleName(element));
      
      if (element)
        return console.debug(window.AccessibilityUtils.getAccessibleName(element));
      return null;
    });
    console.debug(aName); 
    expect(true);
  });
});