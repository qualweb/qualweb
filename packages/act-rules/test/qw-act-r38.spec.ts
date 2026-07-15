import { expect } from 'chai';
import { launchBrowser } from './util';
import { LocaleFetcher } from '@qualweb/locale';
import { Browser } from 'puppeteer';

/**
 * Regression tests for https://github.com/qualweb/qualweb/issues/254
 *
 * `caption` is an allowed (but not required) owned element of `table`, `grid`
 * and `treegrid` (WAI-ARIA 1.2 caption definition; "allowed accessibility
 * child roles" in the ARIA 1.3 draft). QW-ACT-R38 must not fail an element
 * just because it owns a caption, and QW-ACT-R33 must accept `caption` inside
 * `treegrid`.
 */
describe('QW-ACT-R38 allowed owned elements (issue #254)', function () {
  let browser: Browser;

  before(async () => {
    browser = await launchBrowser();
  });

  after(async () => {
    await browser.close();
  });

  async function evaluate(sourceCode: string): Promise<any> {
    const incognito = await browser.createBrowserContext();
    const page = await incognito.newPage();

    try {
      await page.setContent(sourceCode, { waitUntil: 'load' });

      await page.addScriptTag({
        path: require.resolve('@qualweb/qw-page')
      });

      await page.addScriptTag({
        path: require.resolve('@qualweb/util')
      });

      await page.addScriptTag({
        path: require.resolve('../dist/__webpack/act.bundle.js')
      });

      return await page.evaluate(
        (locale, sourceCode) => {
          // @ts-expect-error: ACTRulesRunner will be defined within the puppeteer execution context.
          window.act = new ACTRulesRunner(
            { include: ['QW-ACT-R33', 'QW-ACT-R38'] },
            { translate: locale, fallback: locale }
          );
          // @ts-expect-error: window.act has been defined earlier.
          window.act.configure({ include: ['QW-ACT-R33', 'QW-ACT-R38'] });
          // @ts-expect-error: window.act has been defined earlier.
          window.act.test({ sourceHtml: sourceCode });
          // @ts-expect-error: window.act has been defined earlier.
          return window.act.getReport();
        },
        LocaleFetcher.get('en'),
        sourceCode
      );
    } finally {
      await incognito.close();
    }
  }

  it('QW-ACT-R38 passes a native table with a caption', async function () {
    this.timeout(0);

    const report = await evaluate(
      `<!DOCTYPE html><html lang="en"><head><title>t</title></head><body>
        <table>
          <caption>Monthly savings</caption>
          <tr><th>Month</th><th>Savings</th></tr>
          <tr><td>January</td><td>$100</td></tr>
        </table>
      </body></html>`
    );

    expect(report.assertions['QW-ACT-R38'].metadata.outcome).to.equal('passed');
  });

  it('QW-ACT-R38 passes a grid with a caption and rows', async function () {
    this.timeout(0);

    const report = await evaluate(
      `<!DOCTYPE html><html lang="en"><head><title>t</title></head><body>
        <table role="grid">
          <caption>A caption</caption>
          <tr role="row"><td role="gridcell">cell 1</td><td role="gridcell">cell 2</td></tr>
        </table>
      </body></html>`
    );

    expect(report.assertions['QW-ACT-R38'].metadata.outcome).to.equal('passed');
  });

  it('QW-ACT-R38 and QW-ACT-R33 pass an explicit caption role inside a treegrid', async function () {
    this.timeout(0);

    const report = await evaluate(
      `<!DOCTYPE html><html lang="en"><head><title>t</title></head><body>
        <div role="treegrid">
          <div role="caption">Treegrid caption</div>
          <div role="row"><div role="gridcell">x</div></div>
        </div>
      </body></html>`
    );

    expect(report.assertions['QW-ACT-R38'].metadata.outcome).to.equal('passed');
    expect(report.assertions['QW-ACT-R33'].metadata.outcome).to.equal('passed');
  });

  it('QW-ACT-R38 still fails a grid that owns a disallowed role', async function () {
    this.timeout(0);

    const report = await evaluate(
      `<!DOCTYPE html><html lang="en"><head><title>t</title></head><body>
        <div role="grid">
          <div role="listitem">not allowed here</div>
          <div role="row"><div role="gridcell">x</div></div>
        </div>
      </body></html>`
    );

    expect(report.assertions['QW-ACT-R38'].metadata.outcome).to.equal('failed');
  });

  it('QW-ACT-R38 still fails a grid whose only owned element is a caption', async function () {
    this.timeout(0);

    const report = await evaluate(
      `<!DOCTYPE html><html lang="en"><head><title>t</title></head><body>
        <table role="grid">
          <caption>Caption only, no rows</caption>
        </table>
      </body></html>`
    );

    expect(report.assertions['QW-ACT-R38'].metadata.outcome).to.equal('failed');
  });
});
