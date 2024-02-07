import { Dom } from '@qualweb/dom';
import { expect } from 'chai';

import { usePuppeteer } from './util';

describe('Running tests', function () {
  const proxy = usePuppeteer();

  // Test is missing actual expectations.
  it('Calculates accessible name correctly', async function () {
    this.timeout(100 * 1000);

    const { page } = proxy;
    
    const url = 'https://act-rules.github.io/testcases/674b10/9ba09fb345e5e4fae83776a55049957281def46e.html';

    const dom = new Dom(proxy.page);
    await dom.process({ execute: { act: true }, "act-rules": { rules: ['QW-ACT-R20'] } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });

    await page.evaluate(() => {
      const elements = window.qwPage.getElements('[role]');
      for (const elem of elements) {
        window.console.log(window.AccessibilityUtils.elementHasValidRole(elem));
      }
    });

    expect(true);
  });
});