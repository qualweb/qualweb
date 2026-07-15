import { expect } from 'chai';
import { launchBrowser } from './util';
import { LocaleFetcher } from '@qualweb/locale';
import { Browser } from 'puppeteer';

/**
 * Regression tests for https://github.com/qualweb/qualweb/issues/262
 *
 * Text with a fully transparent foreground (color alpha × opacity === 0) is
 * not visible per the ACT definition of visibility, so QW-ACT-R37 must not
 * report a contrast failure for it. This covers the common screen-reader-only
 * technique of hiding text with `color: transparent` (and `opacity: 0`, which
 * additionally exercises the fixed opacity check in DomUtils.isElementVisible).
 */
describe('QW-ACT-R37 transparent text (issue #262)', function () {
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
          window.act = new ACTRulesRunner({ include: ['QW-ACT-R37'] }, { translate: locale, fallback: locale });
          // @ts-expect-error: window.act has been defined earlier.
          window.act.configure({ include: ['QW-ACT-R37'] });
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

  async function outcomeOf(snippet: string): Promise<{ outcome: string; warning: number }> {
    const report = await evaluate(
      `<!DOCTYPE html><html lang="en"><head><title>t</title></head><body>${snippet}</body></html>`
    );
    const rule = report.assertions['QW-ACT-R37'];
    return { outcome: rule.metadata.outcome, warning: rule.metadata.warning };
  }

  it('is inapplicable for text with color: transparent', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color: transparent">Invisible but screen-reader accessible</p>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for text with color: rgba(0, 0, 0, 0)', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color: rgba(0,0,0,0)">Invisible but screen-reader accessible</p>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for text that inherits a transparent color', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div style="color: transparent"><span>Inherited invisible text</span></div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for text hidden with opacity: 0', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(`<p style="opacity: 0">Invisible via opacity</p>`);
    expect(outcome).to.equal('inapplicable');
  });

  it('still warns for transparent text with a text-shadow that may render it legible', async function () {
    this.timeout(0);
    const { warning } = await outcomeOf(
      `<p style="color: transparent; text-shadow: 2px 2px 4px #000">Shadow-rendered text</p>`
    );
    expect(warning).to.equal(1);
  });

  it('still fails genuinely low-contrast text', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color: #999; background-color: #fff">Genuinely low contrast text</p>`
    );
    expect(outcome).to.equal('failed');
  });

  it('still passes high-contrast text', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color: #000; background-color: #fff">High contrast text</p>`
    );
    expect(outcome).to.equal('passed');
  });
});
