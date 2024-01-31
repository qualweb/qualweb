import fs from 'node:fs';
import path from 'path';

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
 * @param {string} testcasesPath Path to the testcases.json file that contains
 * all the test cases. It will be treated as the base path for any file paths
 * within the file.
 */
export function buildTest(bestpracticeName, testcasesPath) {
  // Uppercase the rule name, just in case.
  bestpracticeName = bestpracticeName.toUpperCase();

  const testcases = JSON.parse(fs.readFileSync(testcasesPath));

  const proxy = usePuppeteer();

  describe(bestpracticeName, () => {
    // Simple map to help count the occurrences of outcomes. It is used to
    // ensure unique test case names (so two "inapplicable" tests can exist,
    // with their own number).
    const outcomeCounters = {};

    for (const test of testcases) {
      if (outcomeCounters[test.outcome]) {
        outcomeCounters[test.outcome] += 1;
      } else {
        outcomeCounters[test.outcome] = 1;
      }

      // it(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, async function () {
      it(`${test.outcome} ${outcomeCounters[test.outcome]}`, async function () {
        this.timeout(0);

        const dom = new Dom(proxy.page);

        if (test.path) {
          const testfilePath = path.resolve(path.dirname(testcasesPath), test.path);

          await dom.process({ execute: { bp: true } }, null, fs.readFileSync(testfilePath, 'utf-8'));
        } else if (test.url) {
          await dom.process({ execute: { bp: true } }, test.url, null);
        }

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
