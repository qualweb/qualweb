import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import { createRequire } from 'module';

import locales from '@qualweb/locale';
import { usePuppeteer } from '../util.mjs';

const require = createRequire(import.meta.url);

/**
 * Builds a simple test suite for a BP rule. Use this for the general case where
 * a test case just needs to load up puppeteer, inject BP files, run a test,
 * and expect a specific outcome.
 * @param {string} bestpracticeName Name of the best practice, like "QW-BP2".
 * @param {{ url: string, path: string, outcome: string }[]} testcases Testcases to run for the BP rule.
 */
export function buildTest(bestpracticeName, testcases) {
  // Uppercase the rule name, just in case.
  bestpracticeName = bestpracticeName.toUpperCase();

  const proxy = usePuppeteer();

  describe(bestpracticeName, () => {
    for (const test of testcases || []) {
      // it(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, async function () {
      it(test.outcome, async function () {
        this.timeout(0);

        const dom = new Dom(proxy.page);
        await dom.process({ execute: { bp: true } }, test.url, null);

        await proxy.page.addScriptTag({
          path: require.resolve('@qualweb/qw-page')
        });
        await proxy.page.addScriptTag({
          path: require.resolve('@qualweb/util')
        });
        await proxy.page.addScriptTag({
          path: require.resolve('../../dist/bp.bundle.js')
        });

        const report = await proxy.page.evaluate(
          (rules, locales) => {
            const bp = new BestPractices({ translate: locales.en, fallback: locales.en }, rules);
            return bp.execute();
          },
          { bestPractices: [bestpracticeName] },
          locales.default
        );

        expect(report['assertions'][bestpracticeName].metadata.outcome).to.be.equal(test.outcome);
      });
    }
  });
}
