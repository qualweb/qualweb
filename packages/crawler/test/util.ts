import assert from 'node:assert';

import puppeteer from 'puppeteer';
import type { Browser, BrowserContext, Page, PuppeteerLaunchOptions } from 'puppeteer';

import Koa from 'koa';
import Router from '@koa/router';

type PuppeteerProxy = {
  browser: Browser;
  browserContext: BrowserContext;
  page: Page;
}

/**
 * Sets up a proxy object that will be populated with browser object, incognito
 * context, and page object before a unit test runs.
 * 
 * Call this function in the body of a describe() section and assign its return
 * value to a variable ("proxy"). For all unit tests in that describe() section,
 * this variable will contain a *unique*:
 * - puppeteer browser instance
 * - incognito context
 * - page object from that incognito context
 * All objects will be properly disposed after each unit test.
 * 
 * The proxy object is *not* thread-safe. Attempting to use it with parallel
 * tests in the same describe() section will probably fail.
 * @returns A proxy object that will be populated with a usable browser,
 * incognito context, and page object when a unit test runs.
 */
export function usePuppeteer(launchOptions: PuppeteerLaunchOptions = {}): PuppeteerProxy {
  const proxy: Partial<PuppeteerProxy> = {
    browser: undefined,
    browserContext: undefined,
    page: undefined,
  };

  beforeEach(async () => {
    proxy.browser = await puppeteer.launch({
      headless: true,
      args: ['--ignore-certificate-errors'],
      ...launchOptions,
    });

    proxy.browserContext = await proxy.browser.createBrowserContext();

    proxy.page = await proxy.browserContext.newPage();
  })

  afterEach(async () => {
    await proxy.page?.close();
    await proxy.browserContext?.close();
    await proxy.browser?.close();
  });

  return proxy as PuppeteerProxy;
}

/**
 * Calculates the total number of pages that should be generated by a mock
 * server with the given parameters.
 * @param {Number} linksPerPage 
 * @param {Number} maxDepth 
 * @returns Total expected page count for a mock server with these parameters.
 */
export function koaServerPageCount(linksPerPage: number, maxDepth: number) {
  assert(Number.isInteger(linksPerPage));
  assert(Number.isInteger(maxDepth));

  var s = maxDepth;
  var sum = 1; // Initial value is the root page.

  for (var s = 1; s <= maxDepth; s++)
    sum += Math.pow(linksPerPage, s);

  return sum;
}

type MockServerOptions = {
  childLinksPerPage?: number;
  maxDepth?: number;
}

/**
 * Sets up a web server for use in crawler testing. The server is set up with a
 * root page ('/'). Every page served (root and all children) has a number of
 * links ({@link childLinksPerPage}) that all point to a unique URL one nesting
 * level deeper into the site's structure (so the root '/' points to a deeper
 * page '/3/', which in turn points to a deeper page '/3/1/', and so on). Once
 * a depth of {@link maxDepth} has been reached (the root has depth 0), no more
 * pages will be served. Trying to go to a deeper level will yield 404, and
 * pages at the deepest level will not link to any deeper URLs.
 * 
 * As a reference, this formula describes the total number of unique URLs that
 * can be accessed: 1 + {@link childLinksPerPage} * ({@link maxDepth} + 1).
 * (10, 10) => 111 links
 * @param {*} options
 * @returns A Koa application. Run {@link listen()} to start the server itself.
 */
export function createKoaServer({ childLinksPerPage = 3, maxDepth = 10 }: MockServerOptions = {}) {
  const app = new Koa();

  const router = new Router();

  router.get('/([^\/]+)*', (ctx, next) => {
    const parms = ctx.params[0];
      
    const pathSegments = parms
      ? parms.split('/').filter(segment => segment?.length > 0)
      : []
      ;

    // Calculating a leaf "offset" means that every path down through the virtual
    // tree will be unique. Without this (using just a simple iterator for leaf ids)
    // would mean that every level had the exact same children.
    // The difference is linear vs exponential URL-space.
    const leafOffset = pathSegments
      .map(segment => Number.parseInt(segment))
      .filter(segment => Number.isNaN(segment) === false)
      .reduce((prev, current) => prev + current, 0);

    const parentLink = parms
      ? `<div>
      <a href="/${pathSegments.slice(0, -1).join('/')}">Parent</a>
    </div>`
      : ''
      ;

    const childLinks = [];

    // Only generate deeper links as long as we haven't reached max depth.
    if (pathSegments.length < maxDepth) {
      for (let i = 0; i < childLinksPerPage; i++) {
        childLinks.push(`<li><a href="${(parms || '') + '/' + (i + leafOffset) }">Child #${i}</a></li>`);
      }
    } else {
      childLinks.push(`<li>Max depth reached</li>`);
    }

    ctx.status = 200;
    ctx.body = `<html>
      <head></head>
      <body>
        <div>
          <a href="/">Front page</a>
        </div>
        ${parentLink}
        <div>
          <ul>
            ${childLinks.join('\n')}
          </ul>
        </div>
      </body>
    </html>`;

    return next();

    // ctx.status = 200;
    // ctx.body = `I saw: ${JSON.stringify(ctx.params[0]?.split('/'))}`;
  });

  app.use(router.routes())
    .use(router.allowedMethods())
    ;

  return app;
}

export async function withMockServer(mockServerOptions: MockServerOptions, callback: (hostname: string) => unknown) {
  const mockServer = createKoaServer(mockServerOptions);
  const mockHttpServer = mockServer.listen();

  const address = mockHttpServer.address();

  const hostname = typeof(address) === 'string'
    ? address
    : `http://localhost:${address!.port}`
    ;

  console.debug('Set up mock server');

  try {
    await callback(hostname);
  } catch (err) {
    console.warn('withMockServer: inner callback failed.');
  } finally {
    console.debug('Closing mock server');
    mockHttpServer.close();
  }
}

export function mockServerIt(title: string, mockServerOptions: MockServerOptions, testCallback: (hostname: string) => unknown) {
  // Empty describe section means we can setup/teardown for a single test within.
  describe('_', () => {
    const mockServer = createKoaServer(mockServerOptions);
    let mockHttpServer: any; // FIXME: bad typing

    before(() => {
      console.debug('Opening mock server');
      mockHttpServer = mockServer.listen();
    });

    after(() => {
      console.debug('Closing mock server');
      mockHttpServer.close();
    });

    it(title, async () => {
      testCallback(`http://localhost:${mockHttpServer.address().port}`);
    });
  });
}

// const a = createKoaServer({
//   childLinksPerPage: 10,
//   maxDepth: 3,
// });

// const server = a.listen(8081);
// console.debug(server.address());