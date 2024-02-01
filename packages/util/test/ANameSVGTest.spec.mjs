import puppeteer from 'puppeteer';
import { expect } from 'chai';

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

import { Dom } from '@qualweb/dom';
import { usePuppeteer } from './util.mjs';

describe('ANameSVGTest', function () {
  const proxy = usePuppeteer();

  // What is this test *really* supposed to check? Currently, it injects code
  // from inject.js, which in turn runs AccessibilityUtils.getAccessibleNameSVG
  // for all SVG elements on the page. Is this purely to test execution of
  // injected code?
  it('Should correctly run injected code (inject.js)', async function () {
    this.timeout(0);

    const { page } = proxy;

    const dom = new Dom(page);
    await dom.process({ execute: { act: true }, waitUntil: ['load'] }, 'https://www.ipleiria.pt/', '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });

    await page.addScriptTag({
      path: require.resolve('./fixtures/inject.js')
    });
  });
});
