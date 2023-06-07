import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { expect } from 'chai';

describe('Running tests', function () {
  it('Calculates accessible name correctly', async function () {
    this.timeout(100 * 1000);

    const url = 'https://qld-mosaico.northeurope.cloudapp.azure.com/homepage';

    const browser = await puppeteer.launch({ headless: false });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    await dom.process({ execute: { act: true }, waitUntil: ['networkidle0'] }, '', `<!DOCTYPE html>
<html>
<body><style>
  .visually-hidden,
  .visually-hidden-focusable:not(:focus):not(:focus-within) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  .bi-moon-fill::before {
    content: "\f494";
  }

  .bi-brightness-high-fill::before {
    content: "\f1d1";
  }

</style>
<button id="darkmode-button" class="btn btn-link-inline py-0 mx-3">
  <span class="d-none d-light-inline"><i class="bi bi-moon-fill" aria-hidden="true"></i><span class="visually-hidden">Dark</span></span>
  <span class="d-none d-dark-inline" hidden><i class="bi bi-brightness-high-fill" aria-hidden="true"></i><span class="visually-hidden">Light</span></span>
</button>
<span>Dark</span></body>
</html>`);

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });

    await page.evaluate(() => {
      const element = window.qwPage.getElement('html:nth-of-type(1) > body > button');
      window.console.log(window.AccessibilityUtils.getAccessibleName(element));
    });

    //await dom.close();
    //await browser.close();

    expect(true);
  });
});