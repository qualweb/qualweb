import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
import { tests } from '../fixtures/QW-WCAG-T9_test.js'
import { usePuppeteer } from '../util.mjs';
const require = createRequire(import.meta.url);

describe('QW-WCAG-T9', function () {
  const proxy = usePuppeteer();

  tests.forEach((test) => {
    it(test.outcome, async function () {
      this.timeout(0);

      const dom = new Dom(proxy.page);
      await dom.process({ execute: { wcag: true }, 'wcag-techniques': { techniques: ['QW-WCAG-T9'] } }, '', test.code);

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
        const wcag = new WCAGTechniques({ translate: locale, fallback: locale }, { techniques: ['QW-WCAG-T9'] });
        return wcag.execute();
      }, locales.default.en);
      // console.log(report.assertions['QW-WCAG-T9'].results[0]);
      expect(report.assertions['QW-WCAG-T9'].metadata.outcome).to.be.equal(test.outcome);
    });
  });
});
