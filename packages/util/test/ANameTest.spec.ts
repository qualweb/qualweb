import { Dom } from '@qualweb/dom';
import { expect } from 'chai';
import { usePuppeteer } from './util';

describe('ANameTest', function () {
  const proxy = usePuppeteer();

  it('Calculates accessible name correctly', async function () {
    this.timeout(100 * 1000);

    const url = 'https://www.nationalbanken.dk/da/viden-og-nyheder/publikationer-og-taler/arkiv-publikationer/2022/stigende-renter-og-priser-kan-udfordre-bankernes-kunder';

    const page = proxy.page;
    const dom = new Dom(page);
    await dom.process({ execute: { act: true }, waitUntil: ['networkidle0'] }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });
    await new Promise(r => setTimeout(r, 2000));

    await page.evaluate(() => {
      const element = window.qwPage.getElement('html > body:nth-child(2) > header:nth-child(3) > dnb-header:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > dnb-link:nth-child(1)');
      //window.console.log("children:", element.getElement("slot:nth-of-type(1)"));
      //window.console.log(window.AccessibilityUtils.getAccessibleName(element));
    });

    expect(true);
  });
});