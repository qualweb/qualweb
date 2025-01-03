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
  
  describe(bestPracticeName, function () {
    // Set a high timeout early. Particularly where URLs have to be loaded in
    // the before() hook, it can take some time to load it up.
    this.timeout(60 * 1000);

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

      const proxy = usePuppeteer();

      // Load the test's HTML code into the page.
      before(async () => {
        if (test.path) {
          // Prefer local copy of the test case, since it should always be
          // available.
          await proxy.page.setContent(fs.readFileSync(path.resolve(path.dirname(testCasesPath), test.path), 'utf-8'));
        } else if (test.url) {
          // Fall back to the URL, if set.
          await proxy.page.goto(test.url);
        } else {
          throw new Error(`${bestPracticeName} ${outcomeCounters[test.outcome]} does not have a path or URL to the test contents.`);
        }
      });
      
      // it(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, async function () {
      it(`${test.outcome} ${outcomeCounters[test.outcome]}`, async function () {
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
          path: require.resolve('../../dist/__webpack/bp.bundle.js')
        });
        const report= await proxy.page.evaluate(
          (bps) => {
            // @ts-expect-error: BestPractices will be defined within the executing context (see above).
            const bp = new BestPracticesRunner({}, 'en').configure(bps);
            return bp.test().getReport();
          },
          { include: [bestPracticeName] }
        );
        expect(report.assertions[bestPracticeName].metadata.outcome).to.be.equal(test.outcome);
      });
    }
  });
}
