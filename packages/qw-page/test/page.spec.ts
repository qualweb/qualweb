import puppeteer from 'puppeteer';
import { expect } from 'chai';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
import type { QWPage } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

declare global {
  interface Window {
    qwPage: QWPage;
  }
}

describe('QualWeb page', function () {
  it('Testing qw-page injection on browser', async function () {
    this.timeout(0);

    const browser = await puppeteer.launch({ headless: true });
    // createIncognitoBrowserContext() is deprecated - is the incognito mode necessary?
    const browserContext = await browser.createBrowserContext();
    const page = await browserContext.newPage();

    await page.goto(`file://${__dirname}/fixtures/empty.html`);

    try {
      await page.addScriptTag({ path: require.resolve('../dist/qw-page.bundle.js') });
    } catch (_error: unknown) {
      const error = _error as Error;
      expect.fail(error.message);
    }

    expect(await page.evaluate(() => window.qwPage));

    await page.close();
    await browserContext.close();
    await browser.close();
  });
});
