import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import { createRequire } from 'module';

import locales from '@qualweb/locale';
import { usePuppeteer } from '../util.mjs';

const require = createRequire(import.meta.url);

describe('Best practice QW-BP1', function () {
  const tests = [
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/h42/warning1.html',
      outcome: 'warning'
    },
    {
      url: 'http://accessible-serv.lasige.di.fc.ul.pt/~bandrade/h42/failed1.html',
      outcome: 'failed'
    }
  ];

  const proxy = usePuppeteer();

  let i = 0;
  let lastOutcome = 'warning';

  for (const test of tests || []) {
    if (test.outcome !== lastOutcome) {
      lastOutcome = test.outcome;
      i = 0;
    }
    i++;

    it(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, async function () {
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
        { bestPractices: ['QW-BP1'] },
        locales.default,
      );

      expect(report['assertions']['QW-BP1'].metadata.outcome).to.be.equal(test.outcome);
    });
  }
});
