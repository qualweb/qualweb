// import { expect } from 'chai';
import { usePuppeteer } from './util';
import { Dom } from '@qualweb/dom';

describe('ANameTestWiki', function () {
  const proxy = usePuppeteer();

  // This test relies on calling AccessibilityUtils.getAccessibleName. I think
  // the function itself must be used from within a browser context, although we
  // could probably import it specifically if we converted the unit tests to
  // TypeScript (so they can import original source files).
  it('getAccessibleName', async function () {
    this.timeout(10 * 100000000);

    let url = " https://www.accessibility.nl/wai-tools/validation-test-sites/low-fare-calendar-sas/";

    const dom = new Dom(proxy.page);

    await dom.process({}, url, '');

    await proxy.page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await proxy.page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });

    const results = await proxy.page.$$eval('a', (elements) => {
      return elements.map(el => window.AccessibilityUtils.getAccessibleName(window.qwPage.createQWElement(el)));
    });

    // console.debug(results);
  });
});