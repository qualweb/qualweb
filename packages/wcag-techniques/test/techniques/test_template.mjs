import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { usePuppeteer } from '../util.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * Constructs a test suite for a given WCAG technique. This is a generalized
 * builder, based on the case that many TXX unit tests are close to identical.
 * @param {string} wcagTechnique 
 * @param {{ code: string, outcome: string }[]} testCases 
 */
export function buildTest(wcagTechnique, testCases) {
  describe(wcagTechnique, () => {
    const proxy = usePuppeteer();

    testCases.forEach((test) => {
      it(test.outcome, async function () {
        this.timeout(0);
  
        const dom = new Dom(proxy.page);
        await dom.process({ execute: { wcag: true }, 'wcag-techniques': { techniques: [wcagTechnique] } }, '', test.code);
  
        await proxy.page.addScriptTag({
          path: require.resolve('@qualweb/qw-page')
        });
  
        await proxy.page.addScriptTag({
          path: require.resolve('@qualweb/util')
        });
  
        await proxy.page.addScriptTag({
          path: require.resolve('../../dist/wcag.bundle.js')
        });
  
        const report = await proxy.page.evaluate((locale, wcagTechnique) => {
          const wcag = new WCAGTechniques({ translate: locale, fallback: locale }, { techniques: [wcagTechnique] });
          return wcag.execute();
        }, locales.default.en, wcagTechnique);
        
        expect(report.assertions[wcagTechnique].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  });
}
