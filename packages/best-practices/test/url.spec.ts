import { expect } from 'chai';
import { QualWeb } from '@qualweb/core';
import { usePuppeteer } from './util';

describe('General tests', function () {
  const proxy = usePuppeteer();

  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://valpacos.pt/';

    const page = proxy.page;
    const qwPage = QualWeb.createPage(page);
    await qwPage.process({ execute: { bp: false } }, url, '');
    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await proxy.page.addScriptTag({
      path: require.resolve('@qualweb/locale')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/bp.bundle.js')
    });

    const report = await page.evaluate(() => {
      // @ts-expect-error: BestPractices will be defined within the executing context (see above).
      const bp = new BestPractices('en');
      return bp.test().getReport();
    });

    console.log(report);
    expect(report);
  });
});
