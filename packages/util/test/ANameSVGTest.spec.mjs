import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
const { expect } = require('chai');

describe('DOM UTILITIES', function () {
  describe('Testing Acessible Name function', function () {
    it('should work', async function () {
      this.timeout(0);
      const browser = await puppeteer.launch({ headless: false, args: ['--ignore-certificate-errors'] });
      const incognito = await browser.createIncognitoBrowserContext();
      const page = await incognito.newPage();
      const dom = new Dom(page);
      await dom.process({ execute: { act: true }, waitUntil: ['load'] }, 'https://www.ipleiria.pt/', '');

      await page.addScriptTag({
        path: require.resolve('@qualweb/qw-page')
      });

      await page.addScriptTag({
        path: require.resolve('../dist/util.bundle.js')
      });

      await page.addScriptTag({
        path: require.resolve('./inject.js')
      });
    });
  });
});
