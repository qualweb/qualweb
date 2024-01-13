import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
import { usePuppeteer } from './util.mjs';
const require = createRequire(import.meta.url);

describe('url.spec.js', function () {
  const proxy = usePuppeteer();

  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://www.apec.org.pt/'; // 'https://ciencias.ulisboa.pt/';

    const dom = new Dom(proxy.page);
    await dom.process(
      {
        execute: { wcag: true },
        'wcag-techniques': { techniques: ['QW-WCAG-T9'] }
      },
      url,
      ''
    );

    await proxy.page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await proxy.page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await proxy.page.addScriptTag({
      path: require.resolve('../dist/wcag.bundle.js')
    });
    await new Promise(r => setTimeout(r, 2000));

    const report = await proxy.page.evaluate((locale) => {
      const wcag = new WCAGTechniques(
        {
          translate: locale,
          fallback: locale
        },
        {
          techniques: ['QW-WCAG-T9']
        }
      );
      return wcag.execute(false, undefined);
    }, locales.default.en);
    
    expect(report);
  });
});
