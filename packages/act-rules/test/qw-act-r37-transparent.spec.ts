import { expect } from 'chai';
import { launchBrowser } from './util';
import { LocaleFetcher } from '@qualweb/locale';
import { Browser } from 'puppeteer';

interface EvaluationReport {
  assertions: Record<string, { metadata: { outcome: string; warning: number } }>;
}

/**
 * Regression tests for https://github.com/qualweb/qualweb/issues/262
 *
 * Text whose complete painted group has zero opacity is not visible per the
 * ACT definition of visibility. A transparent foreground is likewise
 * inapplicable when no independently coloured text shadow paints the glyph;
 * a visible shadow instead requires manual contrast verification. This covers
 * the common screen-reader-only techniques based on `color: transparent` and
 * `opacity: 0`.
 */
describe('QW-ACT-R37 transparent text (issue #262)', function () {
  let browser: Browser;

  before(async () => {
    browser = await launchBrowser();
  });

  after(async () => {
    await browser.close();
  });

  async function evaluate(sourceCode: string): Promise<EvaluationReport> {
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

      return (await page.evaluate(
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
      )) as EvaluationReport;
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
    const { outcome } = await outcomeOf(`<p style="color: transparent">Invisible but screen-reader accessible</p>`);
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for text with color: rgba(0, 0, 0, 0)', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(`<p style="color: rgba(0,0,0,0)">Invisible but screen-reader accessible</p>`);
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for text that inherits a transparent color', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(`<div style="color: transparent"><span>Inherited invisible text</span></div>`);
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for text hidden with opacity: 0', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(`<p style="opacity: 0">Invisible via opacity</p>`);
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable when an ancestor has opacity: 0', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div style="opacity:0"><p style="color:#aaa;background:#fff">Invisible through ancestor opacity</p></div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('still evaluates text with fractional opacity', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:#aaa;background:#fff;opacity:.5">Partially transparent text</p>`
    );
    expect(outcome).to.equal('failed');
  });

  it('still warns for transparent text with a text-shadow that may render it legible', async function () {
    this.timeout(0);
    const { warning } = await outcomeOf(
      `<p style="color: transparent; text-shadow: 2px 2px 4px #000">Shadow-rendered text</p>`
    );
    expect(warning).to.equal(1);
  });

  it('warns when a compact opaque text shadow renders transparent text', async function () {
    this.timeout(0);
    const { warning } = await outcomeOf(
      `<p style="color: transparent; text-shadow: 0 0 0 #000">Shadow-rendered text</p>`
    );
    expect(warning).to.equal(1);
  });

  it('is inapplicable when opacity hides both text and its shadow', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="opacity: 0; text-shadow: 2px 2px 4px #000">Fully hidden text and shadow</p>`
    );
    expect(outcome).to.equal('inapplicable');
    expect(warning).to.equal(0);
  });

  it('is inapplicable when a transparent shadow inherits a transparent current color', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color: transparent; text-shadow: 0 0 0 currentColor">Invisible text and shadow</p>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('warns when a background clipped to transparent text can paint the glyphs', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:transparent;background:#000;background-clip:text">Background-painted text</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when a text stroke can paint otherwise transparent glyphs', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:transparent;-webkit-text-stroke:1px #000">Stroke-painted text</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when text fill can paint otherwise transparent glyphs', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:transparent;-webkit-text-fill-color:#000">Fill-painted text</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('is inapplicable when background-clip text has no visible background paint', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:transparent;background:transparent;background-clip:text">Unpainted text</p>`
    );
    expect(outcome).to.equal('inapplicable');
    expect(warning).to.equal(0);
  });

  it('is inapplicable when a text stroke is itself transparent', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:transparent;-webkit-text-stroke:1px transparent">Unpainted text</p>`
    );
    expect(outcome).to.equal('inapplicable');
    expect(warning).to.equal(0);
  });

  it('is inapplicable when opacity hides alternative text paint', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:transparent;-webkit-text-stroke:1px #000;opacity:0">Hidden painted text</p>`
    );
    expect(outcome).to.equal('inapplicable');
    expect(warning).to.equal(0);
  });

  it('still fails genuinely low-contrast text', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color: #999; background-color: #fff">Genuinely low contrast text</p>`
    );
    expect(outcome).to.equal('failed');
  });

  it('is inapplicable when identical foreground and background colors change no pixels', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:#fff;background:#fff">Invisible low-contrast text</p>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('still passes high-contrast text', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(`<p style="color: #000; background-color: #fff">High contrast text</p>`);
    expect(outcome).to.equal('passed');
  });

  it('is inapplicable for deeply nested text in a disabled widget', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<button disabled style="color:#aaa;background:#fff"><span><em>Disabled text</em></span></button>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for descendant text in a disabled semantic group', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div role="group" aria-disabled="true" style="color:#aaa;background:#fff"><span>Disabled text</span></div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for descendant text in a disabled role derived from group and widget', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div role="row" aria-disabled="true" style="color:#aaa;background:#fff"><span>Disabled row text</span></div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for descendant text in a disabled DPUB widget role', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div role="doc-backlink" aria-disabled="true" style="color:#aaa;background:#fff">Disabled backlink</div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('is inapplicable for descendant text in a disabled graphics group role', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div role="graphics-object" aria-disabled="true" style="color:#aaa;background:#fff">Disabled graphic</div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('uses the first valid role token after invalid tokens', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div role="invalid button" aria-disabled="true" style="color:#aaa;background:#fff">Disabled button</div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('does not skip a valid non-widget role to use a later widget role', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div role="heading button" aria-level="2" aria-disabled="true" style="color:#aaa;background:#fff">Enabled heading</div>`
    );
    expect(outcome).to.equal('failed');
  });

  it('does not treat a static separator as a group or widget role', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div role="separator" aria-disabled="true" style="color:#aaa;background:#fff">Enabled separator</div>`
    );
    expect(outcome).to.equal('failed');
  });

  it('falls back to the implicit widget role when every explicit role token is invalid', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<button role="invalid" disabled style="color:#aaa;background:#fff">Disabled native button</button>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('excludes an external label referenced by a disabled extension widget', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<label id="label" style="color:#aaa;background:#fff">Disabled backlink label</label>` +
        `<div role="doc-backlink" aria-labelledby="label" aria-disabled="true"></div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('composites a semi-transparent background over its actual ancestor', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div style="background:#000"><p style="color:#fff;background:rgba(255,255,255,.5)">Low contrast text</p></div>`
    );
    expect(outcome).to.equal('failed');
  });

  it('excludes text inside a disabled focusable separator', async function () {
    const { outcome } = await outcomeOf(
      `<div role="separator" tabindex="0" aria-valuenow="50" aria-disabled="true" style="color:#aaa;background:#fff">Disabled separator</div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('excludes text inside a disabled editable separator', async function () {
    const { outcome } = await outcomeOf(
      `<div role="separator" contenteditable aria-valuenow="50" aria-disabled="true" style="color:#aaa;background:#fff">Disabled editable separator</div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('applies fractional ancestor opacity to the complete painted group', async function () {
    const { outcome } = await outcomeOf(
      `<div style="opacity:.5"><p style="color:#000;background:#fff">Ancestor opacity lowers contrast</p></div>`
    );
    expect(outcome).to.equal('failed');
  });

  it('composites opaque target pixels over the ancestor after group opacity', async function () {
    const { outcome } = await outcomeOf(
      `<div style="background:#000"><p style="color:#000;background:#fff;opacity:.5">Group contrast remains sufficient</p></div>`
    );
    expect(outcome).to.equal('passed');
  });

  it('passes opaque high-contrast text over an ancestor image', async function () {
    const { outcome } = await outcomeOf(
      `<div style="background-image:url(test.png)"><p style="color:#000;background:#fff">Opaque high contrast</p></div>`
    );
    expect(outcome).to.equal('passed');
  });

  it('fails opaque low-contrast text over an ancestor gradient', async function () {
    const { outcome } = await outcomeOf(
      `<div style="background:linear-gradient(#000,#fff)"><p style="color:#aaa;background:#fff">Opaque low contrast</p></div>`
    );
    expect(outcome).to.equal('failed');
  });

  it('still warns when target opacity exposes an ancestor image', async function () {
    const { outcome, warning } = await outcomeOf(
      `<div style="background-image:url(test.png)"><p style="color:#000;background:#fff;opacity:.5">Translucent card</p></div>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('continues through ancestor opacity to a contributing outer image', async function () {
    const { outcome } = await outcomeOf(
      `<div style="background-image:url(test.png)"><div style="opacity:.5;background:linear-gradient(#000,#fff)"><p style="color:#000;background:#fff">Translucent group</p></div></div>`
    );
    expect(outcome).to.equal('warning');
  });

  it('applies ancestor opacity after ignoring its occluded image', async function () {
    const { outcome } = await outcomeOf(
      `<div style="opacity:.5;background-image:url(test.png)"><p style="color:#000;background:#fff">Group opacity lowers contrast</p></div>`
    );
    expect(outcome).to.equal('failed');
  });

  it('warns for visible compact shadow when composited normal text matches its background', async function () {
    const { outcome, warning } = await outcomeOf(
      `<p style="color:rgba(255,255,255,.5);background:#fff;text-shadow:0 0 0 #000">Visible shadow text</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns for visible text fill when composited normal text matches its background', async function () {
    const { outcome } = await outcomeOf(
      `<p style="color:rgba(255,255,255,.5);background:#fff;-webkit-text-fill-color:#000">Visible fill text</p>`
    );
    expect(outcome).to.equal('warning');
  });

  it('keeps matching normal text inapplicable when its shadow is transparent', async function () {
    const { outcome, warning } = await outcomeOf(
      `<p style="color:rgba(255,255,255,.5);background:#fff;text-shadow:0 0 0 transparent;-webkit-text-fill-color:transparent">Invisible painted text</p>`
    );
    expect(outcome).to.equal('inapplicable');
    expect(warning).to.equal(0);
  });

  it('applies element opacity to text and its background as one group', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div style="background:#000"><p style="color:#fff;background:#fff;opacity:.5">Invisible text</p></div>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('does not round a contrast ratio below 4.5 up to the threshold', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:rgb(46.588% 46.588% 46.588%);background:#fff">Borderline contrast</p>`
    );
    expect(outcome).to.equal('failed');
  });

  it('treats 14pt text with a variable weight of 750 as large bold text', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:#000;background:#666;font-size:14pt;font-weight:750">Large bold text</p>`
    );
    expect(outcome).to.equal('passed');
  });

  it('does not treat 18.66px bold text as meeting the exact 14pt threshold', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:#000;background:#666;font-size:18.66px;font-weight:700">Not quite large text</p>`
    );
    expect(outcome).to.equal('failed');
  });

});
