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
  this.timeout(30000);
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

  for (const color of [
    'color-mix(in srgb, #aaa 50%, #aaa)',
    'rgb(from #aaa r g b)',
    'light-dark(#aaa, #000)'
  ]) {
    it(`resolves computed placeholder colour ${color}`, async function () {
      const { outcome } = await outcomeOf(
        `<style>input::placeholder { color:${color}; opacity:1 }</style>` +
        `<input placeholder="Visible placeholder" style="color:#000;background:#fff;color-scheme:light">`
      );
      expect(outcome).to.equal('failed');
    });
  }

  it('resolves placeholder colours in the originating dark colour scheme', async function () {
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:light-dark(#000, #aaa); opacity:1 }</style>` +
      `<input placeholder="Visible placeholder" style="color:#000;background:#fff;color-scheme:dark">`
    );
    expect(outcome).to.equal('failed');
  });

  it('resolves relative placeholder colours against the originating currentColor', async function () {
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:color-mix(in srgb, currentColor 50%, currentColor); opacity:1 }</style>` +
      `<input placeholder="Visible placeholder" style="color:#aaa;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  for (const selector of ['::placeholder', 'div ::placeholder', 'div > ::placeholder']) {
    it(`preserves the implicit universal selector in ${selector}`, async function () {
      const { outcome } = await outcomeOf(
        `<style>${selector} { color:#aaa; opacity:1 }</style>` +
        `<div><input placeholder="Visible placeholder" style="color:#000;background:#fff"></div>`
      );
      expect(outcome).to.equal('failed');
    });
  }

  it('resolves calculated placeholder opacity before compositing', async function () {
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#000; opacity:calc(.1 + .1) }</style>` +
      `<input placeholder="Faded placeholder" style="color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  for (const control of ['input', 'textarea']) {
    it(`does not test a placeholder hidden by a whitespace ${control} value`, async function () {
      const valueMarkup = control === 'input'
        ? `<input value=" " placeholder="Hidden placeholder" style="color:#000;background:#fff">`
        : `<textarea placeholder="Hidden placeholder" style="color:#000;background:#fff"> </textarea>`;
      const { outcome } = await outcomeOf(
        `<style>${control}::placeholder { color:#aaa; opacity:1 }</style>` + valueMarkup
      );
      expect(outcome).to.equal('inapplicable');
    });
  }

  it('resolves relative placeholder weight before applying bold thresholds', async function () {
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#888; opacity:1; font-weight:bolder }</style>` +
      `<input placeholder="Normal placeholder" style="font-size:20px;font-weight:100;color:#000;background:#fff">`
    );
    expect(outcome).to.equal('failed');
  });

  for (const type of ['submit', 'reset']) {
    it(`does not invent a default label for an explicitly empty ${type} value`, async function () {
      const { outcome } = await outcomeOf(`<input type="${type}" value="" style="color:#aaa;background:#fff">`);
      expect(outcome).to.equal('inapplicable');
    });
  }

  it('resolves relative placeholder font sizes before applying large-text thresholds', async function () {
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#777; opacity:1; font-size:2em }</style>` +
      `<input placeholder="Large placeholder" style="font-size:16px;color:#000;background:#fff">`
    );
    expect(outcome).to.equal('passed');
  });

  it('warns when placeholder font size depends on the query container', async function () {
    const { outcome } = await outcomeOf(
      `<style>input::placeholder { color:#888; opacity:1; font-size:20cqw }</style>` +
      `<div style="container-type:inline-size;width:100px"><input placeholder="Container text" ` +
      `style="color:#000;background:#fff"></div>`
    );
    expect(outcome).to.equal('warning');
  });

  it('does not inherit unrelated ancestor pseudo-element probe declarations', async function () {
    const { outcome } = await outcomeOf(
      `<style>div::placeholder { color:#aaa; opacity:0 } input::placeholder { color:#aaa }</style>` +
      `<div><input placeholder="Visible placeholder" style="color:#000;background:#fff"></div>`
    );
    expect(outcome).to.equal('failed');
  });

  it('warns when UA placeholder colour cannot be resolved reliably', async function () {
    const { outcome, warning } = await outcomeOf(
      `<input placeholder="Browser placeholder" style="color:#aaa;background:#fff">`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when pseudo-local variables can override originating-element variables', async function () {
    const { outcome, warning } = await outcomeOf(
      `<style>input::placeholder { --hint:#aaa; color:var(--hint); opacity:1 }</style>` +
      `<input placeholder="Local variable" style="--hint:#000;color:#000;background:#fff">`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  for (const keyword of ['initial', 'inherit', 'unset', 'revert', 'revert-layer']) {
    it(`warns when ${keyword} needs the pseudo-element cascade`, async function () {
      const { outcome, warning } = await outcomeOf(
        `<style>input::placeholder { color:${keyword}; opacity:1 }</style>` +
        `<input placeholder="CSS-wide keyword" style="color:#aaa;background:#fff">`
      );
      expect(outcome).to.equal('warning');
      expect(warning).to.equal(1);
    });
  }

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
