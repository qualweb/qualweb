import { expect } from 'chai';
import path from 'node:path';
import url from 'node:url';
import locales from '@qualweb/locale';
import { usePuppeteer } from '../util.mjs';
import fs from 'node:fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * Constructs a test suite for a given BP rule. This is a generalized
 * builder, based on the fact that many BXX unit tests are close to identical.
 * @param {string} bestPracticeRule
 * @param { (({ code: string} | { path: string } | { url: string}) & { outcome: string })[]} testCases 
 */
export function buildTest(bestPracticeRule, testCases) {
  describe(bestPracticeRule, () => {
    const proxy = usePuppeteer({
      headless: 'false',
    });

    let i = 0;
    testCases.forEach((test) => {
      const newI = ++i;
      it(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)}`, async function () {
        this.timeout(10 * 1000);
        
        const page = proxy.page;
  
        if (test.path) {
          // File on disk to be loaded.

          const finalPath = path.resolve(
            path.dirname(url.fileURLToPath(import.meta.url)),
            test.path
          );

          // console.log(`buildTest(${bestPracticeRule}): using local HTML file: ${finalPath}`);

          await page.goto(
            url.pathToFileURL(finalPath),
          );

        } else if (test.url) {
          // Remote URL to be loaded (not recommended).

          // console.log(`buildTest(${bestPracticeRule}): using remote URL ${test.url}`);

          await page.goto(test.url, {
            waitUntil: [
              'networkidle2',
              'domcontentloaded',
            ],
          })
        } else if (test.code) {
          // Raw HTML code to load.

          // console.log(`buildTest(${bestPracticeRule}): using raw HTML code.`);

          await page.setContent(test.code);
        } else {
          // None of the above. ERROR!

          throw new Error(`Test case for ${bestPracticeRule} is missing its source. Must have either path, url, or code.`);
        }

        await page.addScriptTag({
          path: require.resolve('@qualweb/qw-page')
        });

        await page.addScriptTag({
          path: require.resolve('@qualweb/util')
        });

        await page.addScriptTag({
          path: require.resolve('../../dist/bp.bundle.js')
        });
  
        const report = await page.evaluate(
          (rules, locales) => {
            const bp = new BestPractices(JSON.parse(locales), rules);
            let report = bp.execute(new QWPage(document, window));
            return report;
          },
          { bestPractices: [bestPracticeRule] },
          JSON.stringify(locales.default.en),
        );

        if (process.env.TEST_REPORT_DUMP_PATH) {
          if (!fs.existsSync(process.env.TEST_REPORT_DUMP_PATH)) {
            fs.mkdirSync(process.env.TEST_REPORT_DUMP_PATH);
          }

          fs.writeFileSync(
            `test_dumps/${bestPracticeRule}_results_${newI}.tmp.json`,
            JSON.stringify(report, undefined, 2),
            'utf-8',
          );
        }
  
        expect(report['assertions'][bestPracticeRule].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  });
}
