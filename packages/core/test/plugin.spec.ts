import { QualWeb } from '../src';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import { Protocol } from 'puppeteer';

describe('Plugins', function () {
  // All tests seem to be somewhat time sensitive. 10 seconds *should* be enough
  // for any one test on most setups.
  this.timeout(10000);

  // Re-usable "execute nothing" options for calls to evaluate()
  const executeOptions = {
    wappalyzer: false,
    act: false,
    wcag: false,
    bp: false,
    counter: false,
  }

  // Load up the html file prior to running the tests. Saves on I/O time.
  let html: string;
  before(() => {
    html = readFileSync('./test/test.html').toString();
  });

  // Initialize a new QualWeb instance for every test. Important, since there's
  // no mechanism to remove a plugin once added (by design).

  let qualweb: QualWeb;

  beforeEach(async () => {
    qualweb = new QualWeb({ });
    await qualweb.start(undefined, { headless: 'new' });
  });
  
  afterEach(async () => {
    await qualweb.stop();
    qualweb = null as any;
  });

  it('Should run beforePageLoad for a plugin', async function () {
    const plugin = {
      pluginWasCalled: false,

      async beforePageLoad() {
        this.pluginWasCalled = true;
      }
    }

    qualweb.use(plugin);

    await qualweb.evaluate({
      html,
      modulesToExecute: executeOptions,
    });

    expect(plugin.pluginWasCalled).to.be.true;
  });

  it('Should run afterPageLoad for a plugin', async function () {
    const plugin = {
      pluginWasCalled: false,

      async afterPageLoad() {
        this.pluginWasCalled = true;
      }
    }

    qualweb.use(plugin);

    await qualweb.evaluate({
      html,
      modulesToExecute: executeOptions,
    });

    qualweb.stop();

    expect(plugin.pluginWasCalled).to.be.true;
  });

  it('Should run beforePageLoad once for each plugin that was added', async function () {
    let pluginCallCount = 0;

    const plugin = {
      async beforePageLoad() {
        pluginCallCount++;
      }
    };

    // Three uses. The fact that it's the same plugin doesn't matter
    qualweb.use(plugin);
    qualweb.use(plugin);
    qualweb.use(plugin);

    await qualweb.evaluate({
      html,
      modulesToExecute: executeOptions,
    });

    expect(pluginCallCount).to.equal(3);
  });

  it('Should run afterPageLoad once for each plugin that was added', async function () {
    let pluginCallCount = 0;

    const plugin = {
      async afterPageLoad() {
        pluginCallCount++;
      }
    }

    // Three uses. The fact that it's the same plugin doesn't matter
    qualweb.use(plugin);
    qualweb.use(plugin);
    qualweb.use(plugin);

    await qualweb.evaluate({
      html,
      modulesToExecute: executeOptions,
    });

    expect(pluginCallCount).to.equal(3);
  });

  it('Should run both beforePageLoad and afterPageLoad in the same plugin', async function () {
    let beforeWasCalled = false;
    let afterWasCalled = false;

    qualweb.use({
      beforePageLoad() {
        beforeWasCalled = true;
      },
      afterPageLoad() {
        afterWasCalled = true;
      }
    });

    await qualweb.evaluate({
      html,
      modulesToExecute: executeOptions,
    });

    expect(beforeWasCalled).to.be.true;
    expect(afterWasCalled).to.be.true;
  });

  it('Should pass target URL to a plugin (single URL)', async function () {
    const targetUrl = 'https://www.github.com';
    let reportedUrl;

    const plugin = {
      async beforePageLoad(_: unknown, url: string) {
        reportedUrl = url;
      }
    };

    qualweb.use(plugin);

    await qualweb.evaluate({
      url: targetUrl,
      modulesToExecute: executeOptions,
    });

    expect(reportedUrl).to.be.a('string').and.equal(targetUrl);
  });

  it('Should pass target URLs to a plugin', async function () {
    const targetUrls: string[] = [
      'https://ciencias.ulisboa.pt',
      'https://www.github.com',
    ];

    let reportedUrls: string[] = [];

    const plugin = {
      async beforePageLoad(_: unknown, url: string) {
        reportedUrls.push(url);
      }
    }

    qualweb.use(plugin);

    await qualweb.evaluate({
      urls: targetUrls,
      modulesToExecute: executeOptions,
    });

    expect(reportedUrls).to.have.members(targetUrls);
  });

  it('Should pass "customHtml" as URL to the plugin (when raw HTML is passed)', async function () {
    let reportedUrl;

    const plugin = {
      async beforePageLoad(_: unknown, url: string) {
        reportedUrl = url;
      }
    }

    qualweb.use(plugin);

    await qualweb.evaluate({
      html,
      modulesToExecute: executeOptions,
    });

    expect(reportedUrl).to.be.a('string').and.equal('customHtml');
  });

  it('A cookie that was injected prior to page load should be visble after page load', async function () {
    let cookies: Protocol.Network.Cookie[] = [];

    const testCookie = {
      name: 'OurTestCookie',
      value: 'true',
      url: 'http://localhost.null', // So we can retrieve it later.
      domain: 'localhost.null',
    };

    qualweb.use({
      beforePageLoad: async (page) => {
        // Inject a simple cookie.
        await page.setCookie(testCookie);
      },
      afterPageLoad: async (page) => {
        // Retrieve the cookies for our test URL.
        cookies = await page.cookies(testCookie.url);
      },
    });

    await qualweb.evaluate({
      html,
      modulesToExecute: executeOptions,
    });

    expect(cookies).to.be.an('array').and.have.length.at.least(1);
    expect(cookies[0].domain).to.equal(testCookie.domain);
    expect(cookies[0].name).to.equal(testCookie.name);
    expect(cookies[0].value).to.equal(testCookie.value);
  });
});
