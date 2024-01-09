import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
import { usePuppeteer } from './util.mjs';
const require = createRequire(import.meta.url);

describe('url.spec.mjs', function () {
  const proxy = usePuppeteer();

  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://www.ccb.pt/';

    const dom = new Dom(proxy.page);
    await dom.process({ execute: { bp: false } }, url, '');

    await proxy.page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await proxy.page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await proxy.page.addScriptTag({
      path: require.resolve('../dist/bp.bundle.js')
    });

    const report = await proxy.page.evaluate((locale) => {
      const bp = new BestPractices({ translate: locale, fallback: locale }, { bestPractices: ['QW-BP18'] });
      return bp.execute();
    }, locales.default.en);

    // console.log(JSON.stringify(report, null, 2));

    expect(report);
  });
});
