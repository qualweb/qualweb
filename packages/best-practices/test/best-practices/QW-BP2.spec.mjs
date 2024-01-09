import { expect } from 'chai';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
import { usePuppeteer } from '../util.mjs';
const require = createRequire(import.meta.url);

describe('QW-BP2', function () {
  const tests = [
    {
      path: '../fixtures/aestriga/TesteBP-2/test1.html',
      outcome: 'passed'
    },
    {
      path: '../fixtures/aestriga/TesteBP-2/test2.html',
      outcome: 'failed'
    },
    {
      path: '../fixtures/aestriga/TesteBP-2/test3.html',
      outcome: 'inapplicable'
    }
  ];

  const proxy = usePuppeteer();

  for (const test of tests || []) {
    it(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)}`, async function () {
      this.timeout(10 * 1000);
      
      const page = proxy.page;

      const targetUrl = test.path
        ? path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), test.path)
        : test.url
        ;

      // console.log(`Using test case from "${targetUrl}"`);

      await page.goto(url.pathToFileURL(targetUrl), {
        waitUntil: [
          'networkidle2',
          'domcontentloaded',
        ],
      });

      await page.addScriptTag({
        path: require.resolve('@qualweb/qw-page')
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
        { bestPractices: ['QW-BP2'] }, JSON.stringify(locales.default.en),
      );

      expect(report['assertions']['QW-BP2'].metadata.outcome).to.be.equal(test.outcome);
    });
  }
});
