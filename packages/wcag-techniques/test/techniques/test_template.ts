import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { usePuppeteer } from '../util';

/**
 * Constructs a test suite for a given WCAG technique. This is a generalized
 * builder, based on the case that many TXX unit tests are close to identical.
 * @param {string} wcagTechnique 
 * @param {{ code: string, outcome: string }[]} testCases 
 */
export function buildTest(wcagTechnique: string, testCases: { code: string, outcome: string }[]) {
  describe(wcagTechnique, () => {
    const proxy = usePuppeteer();

    const outcomeCounters: Record<string, number> = {};

    testCases.forEach((test) => {
      if (outcomeCounters[test.outcome]) {
        outcomeCounters[test.outcome] += 1;
      } else {
        outcomeCounters[test.outcome] = 1;
      }

      it(`${test.outcome} ${outcomeCounters[test.outcome]}`, async function () {
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
          // @ts-expect-error: WCAGTechniques should be defined within the executing context (injected above).
          const wcag = new WCAGTechniques({ translate: locale, fallback: locale }, { techniques: [wcagTechnique] });
          return wcag.execute();
        }, locales.en, wcagTechnique);
        
        expect(report.assertions[wcagTechnique].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  });
}
