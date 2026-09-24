import { expect } from 'chai';
import { launchBrowser } from './util';
import { LocaleFetcher } from '@qualweb/locale';
import { Browser } from 'puppeteer';

/**
 * QW-ACT-R76 must evaluate every CSS Color 4 format a browser serializes
 * computed colours in. It used to parse only rgb(), rgba() and oklch():
 * lab(), oklab(), color(srgb …) and color-mix() made it throw a TypeError
 * (taking the whole act-rules run down), and oklch() was converted on a 0–1
 * scale while rgb() used 0–255, so mixed pairs got the wrong verdict.
 * Tailwind CSS 4 produces all of these (oklch palette, color-mix opacity).
 */
describe('QW-ACT-R76 with CSS Color 4 formats', function () {
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
          window.act = new ACTRulesRunner({ include: ['QW-ACT-R76'] }, { translate: locale, fallback: locale });
          // @ts-expect-error: window.act has been defined earlier.
          window.act.configure({ include: ['QW-ACT-R76'] });
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

  async function outcomeOf(style: string): Promise<string> {
    const report = await evaluate(
      `<!DOCTYPE html><html lang="en"><head><title>t</title></head><body><p style="${style}">Some paragraph text to test the contrast rule.</p></body></html>`
    );
    return report.assertions['QW-ACT-R76'].metadata.outcome;
  }

  // #bbb on #ccc (about 1.3:1) fails the 7:1 enhanced ratio in every format.
  const lowContrast: Record<string, string> = {
    'rgb() (baseline)': 'color: rgb(187, 187, 187); background: rgb(204, 204, 204)',
    'lab()': 'color: lab(75 0 0); background: lab(82 0 0)',
    'oklab()': 'color: oklab(0.8 0 0); background: oklab(0.85 0 0)',
    'color(srgb …)': 'color: color(srgb 0.73 0.73 0.73); background: color(srgb 0.8 0.8 0.8)',
    'color-mix()': 'color: color-mix(in srgb, #bbb 50%, #ccc); background: #ccc',
    'oklch() text on an rgb() background': 'color: oklch(0.8 0 0); background: #ccc',
    'rgb() text on an oklch() background': 'color: #bbb; background: oklch(0.85 0 0)'
  };

  for (const [format, style] of Object.entries(lowContrast)) {
    it(`fails low-contrast text in ${format}`, async function () {
      this.timeout(0);
      expect(await outcomeOf(style)).to.equal('failed');
    });
  }

  it('passes high-contrast text in lab()', async function () {
    this.timeout(0);
    expect(await outcomeOf('color: lab(0 0 0); background: lab(100 0 0)')).to.equal('passed');
  });
});
