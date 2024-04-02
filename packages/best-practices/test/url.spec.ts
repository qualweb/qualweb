import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { usePuppeteer } from './util';

describe('General tests', function () {
  const proxy = usePuppeteer();

  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://maiambiente.pt';

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
      // @ts-expect-error: BestPractices will be defined within the executing context (see above).
      const bp = new BestPractices({ translate: locale, fallback: locale }, { bestPractices: ['QW-BP17'] });
      return bp.execute();
    }, locales.en);

    expect(report);
  });
});
