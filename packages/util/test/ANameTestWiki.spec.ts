// import { expect } from 'chai';
import { usePuppeteer } from './util';
import { QualWeb } from '@qualweb/core';

describe('ANameTestWiki', function () {
  const proxy = usePuppeteer();

  // This test relies on calling AccessibilityUtils.getAccessibleName. I think
  // the function itself must be used from within a browser context, although we
  // could probably import it specifically if we converted the unit tests to
  // TypeScript (so they can import original source files).
  it('getAccessibleName', async function () {
    this.timeout(10 * 100000000);

    let url = "http://localhost/test.html";

    const page = proxy.page;

    await proxy.page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await proxy.page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });

    const results = await proxy.page.$$eval('*', (elements) => {
      return elements.map(el => window.AccessibilityUtils.getAccessibleName(window.qwPage.createQWElement(el as HTMLElement)));
    });

    console.debug(results);
  });
});