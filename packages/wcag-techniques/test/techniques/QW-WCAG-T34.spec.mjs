import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
import { tests } from '../fixtures/QW-WCAG-T34_test.js'
import { usePuppeteer } from '../util.mjs';
const require = createRequire(import.meta.url);

describe('QW-WCAG-T34', () => {
  const proxy = usePuppeteer();

  tests.forEach((test) => {
    it(test.outcome, async function () {
      this.timeout(0);

      const dom = new Dom(proxy.page);
      await dom.process({ execute: { wcag: true }, 'wcag-techniques': { techniques: ['QW-WCAG-T34'] } }, '', test.code);

      await proxy.page.addScriptTag({
        path: require.resolve('@qualweb/qw-page')
      });

      await proxy.page.addScriptTag({
        path: require.resolve('@qualweb/util')
      });

      await proxy.page.addScriptTag({
        path: require.resolve('../../dist/wcag.bundle.js')
      });

      const report = await proxy.page.evaluate((locale) => {
        const wcag = new WCAGTechniques({ translate: locale, fallback: locale }, { techniques: ['QW-WCAG-T34'] });
        return wcag.execute();
      }, locales.default.en);
      expect(report.assertions['QW-WCAG-T34'].metadata.outcome).to.be.equal(test.outcome);
    });
  });
});
