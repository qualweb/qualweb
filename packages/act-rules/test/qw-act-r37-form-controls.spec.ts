import { expect } from 'chai';
import { launchBrowser } from './util';
import { LocaleFetcher } from '@qualweb/locale';
import { Browser } from 'puppeteer';
import { createServer, Server } from 'http';
import { AddressInfo } from 'net';

interface EvaluationReport {
  assertions: Record<string, { metadata: { outcome: string; warning: number } }>;
}

describe('QW-ACT-R37 rendered form control text', function () {
  let browser: Browser;
  let cssServer: Server;
  let crossOriginCssUrl: string;

  before(async () => {
    browser = await launchBrowser();
    cssServer = createServer((_request, response) => {
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.end('input::placeholder { color:#aaa; opacity:1 }');
    });
    await new Promise<void>((resolve, reject) => {
      cssServer.once('error', reject);
      cssServer.listen(0, '127.0.0.1', resolve);
    });
    const address = cssServer.address() as AddressInfo;
    crossOriginCssUrl = `http://127.0.0.1:${address.port}/placeholder.css`;
  });

  after(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      cssServer.close((error) => (error ? reject(error) : resolve()));
    });
  });

  async function outcomeOf(snippet: string): Promise<{ outcome: string; warning: number }> {
    const sourceCode = `<!DOCTYPE html><html lang="en"><head><title>t</title></head><body>${snippet}</body></html>`;
    const incognito = await browser.createBrowserContext();
    const page = await incognito.newPage();

    try {
      await page.setContent(sourceCode, { waitUntil: 'load' });
      await page.addScriptTag({ path: require.resolve('@qualweb/qw-page') });
      await page.addScriptTag({ path: require.resolve('@qualweb/util') });
      await page.addScriptTag({ path: require.resolve('../dist/__webpack/act.bundle.js') });

      const report = (await page.evaluate(
        (locale, html) => {
          // @ts-expect-error: ACTRulesRunner is provided by the injected bundle.
          window.act = new ACTRulesRunner({ include: ['QW-ACT-R37'] }, { translate: locale, fallback: locale });
          // @ts-expect-error: window.act has been defined above.
          window.act.configure({ include: ['QW-ACT-R37'] });
          // @ts-expect-error: window.act has been defined above.
          window.act.test({ sourceHtml: html });
          // @ts-expect-error: window.act has been defined above.
          return window.act.getReport();
        },
        LocaleFetcher.get('en'),
        sourceCode
      )) as EvaluationReport;

      const rule = report.assertions['QW-ACT-R37'];
      return { outcome: rule.metadata.outcome, warning: rule.metadata.warning };
    } finally {
      await incognito.close();
    }
  }

  it('fails a low-contrast input value', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(`<input value="Visible value" style="color:#aaa;background:#fff">`);
    expect(outcome).to.equal('failed');
  });

  it('uses the live input value instead of only the value attribute', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<input id="field" style="color:#aaa;background:#fff"><script>field.value = 'Runtime value';</script>`
    );
    expect(outcome).to.equal('failed');
  });

  it('fails a low-contrast placeholder even when the input color passes', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#aaa; opacity:1 }</style>` +
        `<input placeholder="Visible placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  it('passes a high-contrast placeholder even when the input color fails', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#000; opacity:1 }</style>` +
        `<input placeholder="Visible placeholder" style="color:#aaa;background:#fff">`
    );
    expect(outcome).to.equal('passed');
  });

  it('composites placeholder opacity into its foreground color', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#000; opacity:.35 }</style>` +
        `<input placeholder="Faded placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  it('does not test a hidden placeholder when a value is displayed', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#aaa; opacity:1 }</style>` +
        `<input value="Visible value" placeholder="Hidden placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('passed');
  });

  it('resolves placeholder selector specificity', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>.field::placeholder { color:#aaa; opacity:1 } input::placeholder { color:#000 }</style>` +
        `<input class="field" placeholder="Specific placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  it('resolves important placeholder declarations', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>#field::placeholder { color:#000 } input::placeholder { color:#aaa !important; opacity:1 }</style>` +
        `<input id="field" placeholder="Important placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  it('resolves placeholder colors from active media rules and custom properties', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>:root { --hint-color:#aaa } @media (min-width:1px) { input::placeholder { color:var(--hint-color); opacity:1 } }</style>` +
        `<input placeholder="Responsive placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  it('ignores placeholder rules from a non-matching stylesheet media attribute', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#000; opacity:1 }</style>` +
        `<style media="(max-width:1px)">input::placeholder { color:#aaa }</style>` +
        `<input placeholder="Inactive stylesheet" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('passed');
  });

  it('ignores placeholder rules from a disabled stylesheet', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#000; opacity:1 }</style>` +
        `<style id="disabled-styles">input::placeholder { color:#aaa }</style>` +
        `<input placeholder="Disabled stylesheet" style="color:#000;background:#fff">` +
        `<script>document.querySelector('#disabled-styles').sheet.disabled = true;</script>`
    );
    expect(outcome).to.equal('passed');
  });

  it('resolves placeholder styles in native CSS nesting', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input { &::placeholder { color:#aaa; opacity:1 } }</style>` +
        `<input placeholder="Nested placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  it('warns when a cross-origin stylesheet could affect placeholder styles', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<link rel="stylesheet" href="${crossOriginCssUrl}">` +
        `<input placeholder="Cross-origin placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('supports prefixed placeholder selectors', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input::-webkit-input-placeholder { color:#aaa; opacity:1 }</style>` +
        `<input placeholder="Prefixed placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  it('resolves placeholder styles inside an open shadow root', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<div id="host"></div><script>` +
        `const root = host.attachShadow({ mode:'open' });` +
        `root.innerHTML = '<style>input::placeholder{color:#aaa;opacity:1}</style>' +` +
        `'<input placeholder="Shadow placeholder" style="color:#000;background:#fff">';` +
        `</script>`
    );
    expect(outcome).to.equal('failed');
  });

  it('tests a textarea placeholder with its placeholder style', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>textarea::placeholder { color:#aaa; opacity:1 }</style>` +
        `<textarea placeholder="Textarea placeholder" style="color:#000;background:#fff"></textarea>`
    );
    expect(outcome).to.equal('failed');
  });

  it('tests a textarea value instead of its hidden placeholder', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>textarea::placeholder { color:#aaa; opacity:1 }</style>` +
        `<textarea placeholder="Hidden placeholder" style="color:#000;background:#fff">Visible value</textarea>`
    );
    expect(outcome).to.equal('passed');
  });

  it('tests the selected option text shown by a select', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<select style="color:#aaa;background:#fff"><optgroup label="Group"><option selected>Visible choice</option></optgroup></select>`
    );
    expect(outcome).to.equal('failed');
  });

  it('uses the selected option foreground color for collapsed select text', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<select style="color:#000;background:#fff"><option selected style="color:#aaa">Visible choice</option></select>`
    );
    expect(outcome).to.equal('failed');
  });

  it('tests the default rendered label of a submit input', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(`<input type="submit" style="color:#aaa;background:#fff">`);
    expect(outcome).to.equal('failed');
  });

  it('does not treat a non-text input as rendered text', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<input type="checkbox" placeholder="Not rendered" style="color:#aaa;background:#fff">`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('does not test text in a disabled form control', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#aaa; opacity:1 }</style>` +
        `<input disabled placeholder="Disabled placeholder" style="background:#fff">`
    );
    expect(outcome).to.equal('inapplicable');
  });
});
