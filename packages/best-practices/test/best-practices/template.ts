import fs from 'node:fs';
import path from 'node:path';
import { expect } from 'chai';
import { usePuppeteer } from '../util';

/**
 * Builds a simple test suite for a BP rule. Use this for the general case where
 * a test case just needs to load up puppeteer, inject BP files, run a test,
 * and expect a specific outcome.
 * @param {string} bestPracticeName Name of the best practice, like "QW-BP2".
 * @param {string} testCasesPath Path to the testcases.json file that contains
 * all the test cases. It will be treated as the base path for any file paths
 * within the file.
 */
export function buildTest(bestPracticeName: string, testCasesPath: string): void {
  // Uppercase the rule name, just in case.
  bestPracticeName = bestPracticeName.toUpperCase();
  const testCases = JSON.parse(fs.readFileSync(testCasesPath, 'utf-8'));
  const proxy = usePuppeteer();
  describe(bestPracticeName, () => {
    // Simple map to help count the occurrences of outcomes. It is used to
    // ensure unique test case names (so two "inapplicable" tests can exist,
    // with their own number).
    const outcomeCounters: Record<string, number> = {};
    for (const test of testCases) {
      // Counter to indicate which test case number we are on.
      if (outcomeCounters[test.outcome]) {
        outcomeCounters[test.outcome] += 1;
      } else {
        outcomeCounters[test.outcome] = 1;
      }

      // Load the test's HTML code into the page.
      before(async () => {
        await proxy.page.setContent(fs.readFileSync(path.resolve(path.dirname(testCasesPath), test.path), 'utf-8'));
      });
      
      // it(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, async function () {
      it(`${test.outcome} ${outcomeCounters[test.outcome]}`, async function () {
        this.timeout(0);

        await proxy.page.addScriptTag({
          path: require.resolve('@qualweb/qw-page')
        });
        await proxy.page.addScriptTag({
          path: require.resolve('@qualweb/util')
        });
        await proxy.page.addScriptTag({
          path: require.resolve('@qualweb/locale')
        });
        await proxy.page.addScriptTag({
          path: require.resolve('../../dist/bp.bundle.js')
        });
        const report= await proxy.page.evaluate(
          (bps) => {
            // @ts-expect-error: BestPractices will be defined within the executing context (see above).
            const bp = new BestPractices('en').configure(bps);
            return bp.test().getReport();
          },
          { include: [bestPracticeName] }
        );
        expect(report.assertions[bestPracticeName].metadata.outcome).to.be.equal(test.outcome);
      });
    }
  });
}
