import { expect } from 'chai';
import { launchBrowser } from './util';
import { LocaleFetcher } from '@qualweb/locale';
import { Browser } from 'puppeteer';

interface EvaluationReport {
  assertions: Record<string, { metadata: { outcome: string; warning: number } }>;
}

describe('QW-ACT-R37 gradient contrast', function () {
  this.timeout(30000);
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

  it('warns when a gradient is too complex to evaluate reliably', async function () {
    this.timeout(0);
    const { warning } = await outcomeOf(
      `<p style="color:#000;background:linear-gradient(to right,#fff,#000,#fff)">Complex gradient</p>`
    );
    expect(warning).to.equal(1);
  });

  it('passes a supported horizontal gradient with sufficient contrast', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:#333;background:linear-gradient(to right,#fff,#00f);width:500px">Some text in English</p>`
    );
    expect(outcome).to.equal('passed');
  });

  it('fails a supported horizontal gradient with insufficient contrast', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:#aaa;background:linear-gradient(to right,#fff,#00f);width:300px">Some text in English</p>`
    );
    expect(outcome).to.equal('failed');
  });

  it('uses the rendered text position for a right-aligned horizontal gradient', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:#333;background:linear-gradient(to right,#fff,#00f);width:1000px;text-align:right">Text</p>`
    );
    expect(outcome).to.equal('failed');
  });

  it('is inapplicable when a flat gradient is identical to the foreground', async function () {
    this.timeout(0);
    const { outcome } = await outcomeOf(
      `<p style="color:#fff;background:linear-gradient(to right,#fff,#fff);width:500px">Invisible text</p>`
    );
    expect(outcome).to.equal('inapplicable');
  });

  it('warns when gradient channel directions prevent a monotonic proof', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:#000;background:linear-gradient(to right,#f00,#00f);width:500px">Mixed channels</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when the text spans passing and failing parts of a gradient', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:#000;background:linear-gradient(to right,#fff,#000);width:200px;text-align:justify">Rendered text crosses a broad gradient interval over several lines of text.</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when endpoint contrast passes but the gradient crosses the foreground luminance', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:#767676;background:linear-gradient(to right,#000,#fff);width:200px;text-align:justify">Rendered text crosses a broad gradient interval over several lines of text.</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when group opacity prevents a reliable gradient proof', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:#333;background:linear-gradient(to right,#fff,#00f);width:500px;opacity:.9">Some text in English</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when a transform prevents reliable gradient geometry', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<p style="color:#333;background:linear-gradient(to right,#fff,#00f);width:500px;transform:scale(.9)">Some text in English</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when an overlapping sibling can replace the gradient pixels', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<div style="position:relative;width:500px">` +
        `<p style="color:#333;background:linear-gradient(to right,#fff,#00f);width:500px">Some text in English</p>` +
        `<span style="position:absolute;inset:0;background:#fff"></span>` +
        `</div>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns when generated content can paint over the gradient text', async function () {
    this.timeout(0);
    const { outcome, warning } = await outcomeOf(
      `<style>.generated::after{content:"";position:absolute;inset:0;background:#fff}</style>` +
        `<p class="generated" style="position:relative;color:#333;background:linear-gradient(to right,#fff,#00f);width:500px">Some text in English</p>`
    );
    expect(outcome).to.equal('warning');
    expect(warning).to.equal(1);
  });

  it('warns for an unsupported gradient direction', async function () {
    this.timeout(0);
    const { warning } = await outcomeOf(
      `<p style="color:#000;background:linear-gradient(to bottom,#fff,#000)">Vertical gradient</p>`
    );
    expect(warning).to.equal(1);
  });

  it('warns when a gradient is inherited from an ancestor background', async function () {
    this.timeout(0);
    const { warning } = await outcomeOf(
      `<div style="background:linear-gradient(to right,#fff,#000)"><p style="color:#000;background:transparent">Ancestor gradient</p></div>`
    );
    expect(warning).to.equal(1);
  });

  it('warns when a different text fill invalidates normal foreground contrast', async function () {
    const { outcome } = await outcomeOf(
      `<p style="color:#000;-webkit-text-fill-color:#fff;background:linear-gradient(to right,#fff,#eee)">Alternative fill</p>`
    );
    expect(outcome).to.equal('warning');
  });

  it('warns when a text stroke adds independent glyph paint', async function () {
    const { outcome } = await outcomeOf(
      `<p style="color:#000;-webkit-text-stroke:1px #fff;background:linear-gradient(to right,#fff,#eee)">Independent stroke</p>`
    );
    expect(outcome).to.equal('warning');
  });

  it('can prove gradient contrast despite an occluded ancestor image', async function () {
    const { outcome } = await outcomeOf(
      `<div style="background-image:url(test.png)"><p style="color:#000;background:linear-gradient(to right,#fff,#eee)">Opaque gradient</p></div>`
    );
    expect(outcome).to.equal('passed');
  });

  for (const [name, stops] of [
    ['modern sRGB', 'color(srgb 0 0 0),color(srgb 1 1 1)'],
    ['Oklab', 'oklab(0 0 0),oklab(1 0 0)'],
    ['mixed modern and legacy', 'black,color(srgb 1 1 1)'],
    ['explicit Oklab interpolation', 'black,white']
  ]) {
    it(`warns for ${name} interpolation outside the sRGB proof`, async function () {
      const direction = name === 'explicit Oklab interpolation' ? 'to right in oklab' : 'to right';
      const { outcome, warning } = await outcomeOf(
        `<p style="margin:0;width:1000px;height:100px;text-align:center;color:black;background:linear-gradient(${direction},${stops})">Text</p>`
      );
      expect(outcome).to.equal('warning');
      expect(warning).to.equal(1);
    });
  }

  for (const effect of ['rotate:180deg', 'scale:2 1', 'translate:50px 0']) {
    for (const ancestor of [false, true]) {
      it(`warns for individual ${effect} on ${ancestor ? 'an ancestor' : 'the target'}`, async function () {
        const target = `<p style="margin:0;width:1000px;height:100px;text-align:left;color:black;background:linear-gradient(to right,#fff,#000);${ancestor ? '' : effect}">Text</p>`;
        const { outcome, warning } = await outcomeOf(ancestor ? `<div style="${effect}">${target}</div>` : target);
        expect(outcome).to.equal('warning');
        expect(warning).to.equal(1);
      });
    }
  }

  for (const position of ['100px 0', '-100px 0', '0 25px', 'center']) {
    it(`warns for unsupported background position ${position}`, async function () {
      const { outcome, warning } = await outcomeOf(
        `<p style="margin:0;width:1000px;height:100px;color:#333;background:linear-gradient(to right,#fff,#000);background-position:${position}">Text</p>`
      );
      expect(outcome).to.equal('warning');
      expect(warning).to.equal(1);
    });
  }

  it('proves contrast with an explicitly unshifted background', async function () {
    const { outcome } = await outcomeOf(
      `<p style="margin:0;width:1000px;height:100px;color:#333;background:linear-gradient(to right,#fff,#000);background-position:0px 0px">Text</p>`
    );
    expect(outcome).to.equal('passed');
  });

  for (const shadow of ['inset 0 0 0 1000px #444', '0 0 4px black, inset 0 0 0 1000px #444']) {
    it(`warns when inset shadow can replace the gradient pixels: ${shadow}`, async function () {
      const { outcome, warning } = await outcomeOf(
        `<p style="margin:0;width:1000px;height:100px;color:#333;background:linear-gradient(to right,#fff,#000);box-shadow:${shadow}">Text</p>`
      );
      expect(outcome).to.equal('warning');
      expect(warning).to.equal(1);
    });
  }

  it('allows an outer box shadow that does not replace the gradient pixels', async function () {
    const { outcome } = await outcomeOf(
      `<p style="margin:0;width:1000px;height:100px;color:#333;background:linear-gradient(to right,#fff,#000);box-shadow:0 0 4px black">Text</p>`
    );
    expect(outcome).to.equal('passed');
  });

  for (const ancestor of [false, true]) {
    it(`warns for masking on ${ancestor ? 'an ancestor' : 'the target'}`, async function () {
      const mask = 'mask-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))';
      const target = `<p style="margin:0;width:1000px;height:100px;color:#000;background:linear-gradient(to right,#fff,#eee);${ancestor ? '' : mask}">Masked text</p>`;
      const { outcome, warning } = await outcomeOf(ancestor ? `<div style="${mask}">${target}</div>` : target);
      expect(outcome).to.equal('warning');
      expect(warning).to.equal(1);
    });
  }
});
