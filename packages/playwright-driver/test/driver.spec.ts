import { expect } from 'chai';
import { Server } from 'http';
import { QualWeb } from '@qualweb/core';
import type { QualwebPage } from '@qualweb/core/lib';
import { PlaywrightDriver } from '../src';
import { PlaywrightBlocker } from '@ghostery/adblocker-playwright';
import type { Page } from 'playwright';
import DummyModule from './lib/DummyModule';
import { createFixtureServer, listen } from './util';

describe('PlaywrightDriver', function () {
  this.timeout(60 * 1000);

  let server: Server;
  let host: string;

  before(async () => {
    ({ server, host } = await listen(createFixtureServer()));
  });

  after(() => {
    server.close();
  });

  function makeQualweb(driver?: PlaywrightDriver): QualWeb {
    return new QualWeb(undefined, driver);
  }

  it('Should reject removed stealth and unsupported monitor options explicitly', async () => {
    expect(() => new QualWeb({ stealth: true })).to.throw('stealth');
    let failure: unknown;
    try {
      await new QualWeb().start({ monitor: true });
    } catch (error) {
      failure = error;
    }
    expect(failure).to.be.instanceOf(Error);
    expect((failure as Error).message).to.contain('monitor');
  });

  it('Should await plugin hooks and surface rejected hooks', async () => {
    const qualweb = makeQualweb();
    const calls: number[] = [];
    qualweb.use({
      beforePageLoad: async () => {
        await new Promise((resolve) => setTimeout(resolve, 25));
        calls.push(1);
      },
    });
    qualweb.use({
      beforePageLoad: async () => {
        expect(calls).to.deep.equal([1]);
        calls.push(2);
      },
      afterPageLoad: async () => {
        throw new Error('Rejected hook');
      },
    });
    await qualweb.start();
    try {
      const reports = await qualweb.evaluate({
        url: host,
        modules: [],
        log: { console: false },
      });
      expect(calls).to.deep.equal([1, 2]);
      expect(reports[host]).to.be.undefined;
    } finally {
      await qualweb.stop();
    }
  });

  it('Should block requests on initial, recreated, and crawler pages without remote filter downloads', async () => {
    const driver = new PlaywrightDriver({
      blocker: PlaywrightBlocker.parse('/advert.js$script,xmlhttprequest'),
    });
    const pool = await driver.launchPool();
    const failures: Error[] = [];
    let checks = 0;
    pool.onTaskError((error) => failures.push(error));
    await pool.task(async (page) => {
      for (const mobile of [false, true]) {
        if (mobile) {
          await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
          await page.setUserAgent('QualWeb blocking regression');
        }
        const native = page.nativePage as Page;
        const failed = native.waitForEvent('requestfailed');
        await native.setContent(`<script src="${host}/advert.js"></script>`);
        expect((await failed).url()).to.equal(`${host}/advert.js`);
        checks++;
      }
    });
    try {
      pool.queue({});
      await pool.idle();
      expect(failures).to.deep.equal([]);
      expect(checks).to.equal(2);
    } finally {
      await pool.close();
    }
    const context = await driver.launchContext();
    try {
      const page = await context.newPage();
      await page.goto(host);
      expect(await page.evaluate(async () => {
        try {
          await fetch('/advert.js');
          return false;
        } catch {
          return true;
        }
      })).to.equal(true);
    } finally {
      await context.close();
    }
  });

  it('Should evaluate a url', async function () {
    const qualweb = makeQualweb();
    await qualweb.start();

    const reports = await qualweb.evaluate({
      url: host,
      modules: [new DummyModule()],
    });

    await qualweb.stop();

    const report = reports[host];
    expect(report).to.not.be.undefined;
    expect(report.system.page.dom.title).to.equal('Fixture root');
    expect(report.system.page.dom.elementCount).to.be.greaterThan(5);
    expect(report.system.url?.completeUrl).to.contain('localhost');
  });

  it('Should evaluate raw html', async function () {
    const qualweb = makeQualweb();
    await qualweb.start();

    const reports = await qualweb.evaluate({
      html: '<!DOCTYPE html><html lang="en"><head><title>Raw html</title></head><body><h1>hi</h1></body></html>',
      modules: [new DummyModule()],
    });

    await qualweb.stop();

    const report = reports['customHtml'];
    expect(report).to.not.be.undefined;
    expect(report.system.page.dom.title).to.equal('Raw html');
  });

  it('Should support multi-argument page evaluation', async function () {
    let sum = 0;
    let heading = '';

    const dummyModule = new DummyModule(undefined, async (page: QualwebPage) => {
      sum = await page.evaluate((a: number, b: number) => a + b, 20, 22) as number;
      heading = await page.evaluate(() => document.querySelector('h1')?.textContent ?? '') as string;
      return DummyModule.emptyReport();
    });

    const qualweb = makeQualweb();
    await qualweb.start();
    await qualweb.evaluate({ url: host, modules: [dummyModule] });
    await qualweb.stop();

    expect(sum).to.equal(42);
    expect(heading).to.equal('Fixture');
  });

  it('Should honor the viewport option, including mobile flags and user agent', async function () {
    let innerWidth = 0;
    let userAgent = '';
    let maxTouchPoints = -1;
    let reportedViewport: ReturnType<QualwebPage['getViewport']> = null;

    const dummyModule = new DummyModule(undefined, async (page: QualwebPage) => {
      innerWidth = await page.evaluate(() => window.innerWidth) as number;
      userAgent = await page.evaluate(() => navigator.userAgent) as string;
      maxTouchPoints = await page.evaluate(() => navigator.maxTouchPoints) as number;
      reportedViewport = page.getViewport();
      return DummyModule.emptyReport();
    });

    const qualweb = makeQualweb();
    await qualweb.start();
    await qualweb.evaluate({
      url: host,
      viewport: {
        mobile: true,
        userAgent: 'QualwebDriverTest/1.0 Mobile',
        resolution: { width: 390, height: 844 },
      },
      modules: [dummyModule],
    });
    await qualweb.stop();

    expect(innerWidth).to.equal(390);
    expect(userAgent).to.equal('QualwebDriverTest/1.0 Mobile');
    expect(maxTouchPoints).to.be.greaterThan(0);
    expect(reportedViewport).to.deep.include({ width: 390, height: 844, isMobile: true, hasTouch: true });
  });

  it('Should support mid-evaluation viewport resizes (act-rules reflow pattern)', async function () {
    let widthBefore = 0;
    let widthDuring = 0;
    let widthAfter = 0;

    const dummyModule = new DummyModule(undefined, async (page: QualwebPage) => {
      widthBefore = await page.evaluate(() => window.innerWidth) as number;

      const viewport = page.getViewport();
      await page.setViewport({ resolution: { width: 640, height: 512 } });
      widthDuring = await page.evaluate(() => window.innerWidth) as number;

      if (viewport) {
        await page.setViewport({ resolution: { width: viewport.width, height: viewport.height } });
      }
      widthAfter = await page.evaluate(() => window.innerWidth) as number;

      return DummyModule.emptyReport();
    });

    const qualweb = makeQualweb();
    await qualweb.start();
    await qualweb.evaluate({ url: host, modules: [dummyModule] });
    await qualweb.stop();

    expect(widthDuring).to.equal(640);
    expect(widthAfter).to.equal(widthBefore);
  });

  it('Should keep the loaded document across mid-evaluation viewport/user-agent changes', async function () {
    // Regression test: when evaluate() is called WITHOUT a viewport option,
    // QualwebPage.setViewport re-sends the default user agent during
    // mid-evaluation resizes (the ACT rules special-case pass). Recreating
    // the context there destroys the loaded document and every injected
    // script - the resize must keep the live page.
    let markerAfterResize: number | undefined;
    let titleAfterResize = '';
    let widthDuring = 0;

    const dummyModule = new DummyModule(undefined, async (page: QualwebPage) => {
      await page.evaluate(() => {
        (window as unknown as { qualwebStateMarker: number }).qualwebStateMarker = 42;
      });

      // Mirrors ACTRulesModule.runModule's special-case pass, which goes
      // through QualwebPage.setViewport and therefore also setUserAgent.
      await page.setViewport({ resolution: { width: 640, height: 512 } });

      widthDuring = await page.evaluate(() => window.innerWidth) as number;
      markerAfterResize = await page.evaluate(
        () => (window as unknown as { qualwebStateMarker?: number }).qualwebStateMarker
      ) as number | undefined;
      titleAfterResize = await page.evaluate(() => document.title) as string;

      return DummyModule.emptyReport();
    });

    const qualweb = makeQualweb();
    await qualweb.start();
    await qualweb.evaluate({ url: host, modules: [dummyModule] });
    await qualweb.stop();

    expect(widthDuring).to.equal(640);
    expect(markerAfterResize).to.equal(42);
    expect(titleAfterResize).to.equal('Fixture root');
  });

  it('Should map Puppeteer-style waitUntil values', async function () {
    const qualweb = makeQualweb();
    await qualweb.start();

    const reports = await qualweb.evaluate({
      url: host,
      waitUntil: ['load', 'networkidle0'],
      modules: [new DummyModule()],
    });

    await qualweb.stop();

    expect(reports[host]).to.not.be.undefined;
  });

  it('Should dismiss dialogs opened by the page', async function () {
    const qualweb = makeQualweb();
    await qualweb.start();

    const url = `${host}/dialog`;
    const reports = await qualweb.evaluate({ url, modules: [new DummyModule()] });

    await qualweb.stop();

    expect(reports[url]).to.not.be.undefined;
    expect(reports[url].system.page.dom.title).to.equal('Dialog page');
  });

  it('Should detect and close extra tabs opened by the page', async function () {
    const qualweb = makeQualweb();
    await qualweb.start();

    const url = `${host}/popup`;
    const reports = await qualweb.evaluate({ url, modules: [new DummyModule()] });

    await qualweb.stop();

    expect(reports[url]).to.not.be.undefined;
  });

  it('Should evaluate urls in parallel', async function () {
    const urls = [host, `${host}/child`, `${host}/dialog`, `${host}/popup`];

    const qualweb = makeQualweb();
    await qualweb.start({ maxConcurrency: 4 });

    const reports = await qualweb.evaluate({ urls, modules: [new DummyModule()] });

    await qualweb.stop();

    expect(Object.keys(reports)).to.have.length(urls.length);
    for (const url of urls) {
      expect(reports[url], url).to.not.be.undefined;
    }
  });

  it('Should report failing urls through the error manager without rejecting', async function () {
    const qualweb = makeQualweb();
    await qualweb.start();

    const good = host;
    const bad = 'http://localhost:1/unreachable';

    const reports = await qualweb.evaluate({
      urls: [good, bad],
      log: { console: false },
      modules: [new DummyModule()],
    });

    await qualweb.stop();

    expect(reports[good]).to.not.be.undefined;
    expect(reports[bad]).to.be.undefined;
  });

  it('Should crawl through the driver context', async function () {
    const qualweb = makeQualweb();

    const urls = await qualweb.crawl(host, { maxUrls: 10, maxDepth: 2 });

    expect(urls.length).to.be.greaterThan(1);
    expect(urls.some((url) => url.includes('/child'))).to.be.true;
  });

  it('Should expose the native Playwright page to plugins', async function () {
    let sawPlaywrightPage = false;

    const qualweb = makeQualweb();
    qualweb.use({
      afterPageLoad: (page) => {
        const native = page.nativePage as { context?: unknown };
        sawPlaywrightPage = typeof native.context === 'function';
      },
    });

    await qualweb.start();
    await qualweb.evaluate({ url: host, modules: [new DummyModule()] });
    await qualweb.stop();

    expect(sawPlaywrightPage).to.be.true;
  });
});
