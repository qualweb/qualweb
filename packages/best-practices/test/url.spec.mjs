import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
import { usePuppeteer } from './util.mjs';
const require = createRequire(import.meta.url);

describe('General tests', function () {
  const proxy = usePuppeteer();

  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://www.ccb.pt/';

    const page = proxy.page;
    const dom = new Dom(page);
    await dom.process({ execute: { bp: false } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/bp.bundle.js')
    });

    const report = await page.evaluate((locale) => {
      const bp = new BestPractices({ translate: locale, fallback: locale }, { bestPractices: ['QW-BP18'] });
      return bp.execute();
    }, locales.default.en);

    expect(report);
  });
});
