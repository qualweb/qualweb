import { expect } from 'chai';
import { QualWeb } from '@qualweb/core';
import { chromium } from 'playwright';
import { PuppeteerDriver } from '../src';

describe('Opt-in Puppeteer driver', function () {
  this.timeout(60000);

  it('evaluates HTML without installing abandoned plugins', async () => {
    const qualweb = new QualWeb(undefined, new PuppeteerDriver({
      launchOptions: { executablePath: chromium.executablePath(), headless: true },
    }));
    await qualweb.start({ maxConcurrency: 2 });
    try {
      const reports = await qualweb.evaluate({
        html: '<!doctype html><html lang="en"><title>Legacy backend</title><h1>Test</h1></html>',
        modules: [],
      });
      expect(reports.customHtml.system.page.dom.title).to.equal('Legacy backend');
    } finally {
      await qualweb.stop();
    }
  });
});
