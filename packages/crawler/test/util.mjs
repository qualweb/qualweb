import puppeteer from 'puppeteer';

import Koa from 'koa';
import Router from '@koa/router';

/**
 * Sets up a proxy object that will be populated with browser object, incognito
 * context, and page object before a unit test runs.
 * @returns A proxy object that will be populated with a usable browser,
 * incognito context, and page object when a unit test runs.
 */
export function usePuppeteer(launchOptions) {
  const proxy = {
    browser: undefined,
    incognito: undefined,
    page: undefined,
  };

  beforeEach(async () => {
    proxy.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--ignore-certificate-errors'],
      ...launchOptions,
    });

    proxy.incognito = await proxy.browser.createIncognitoBrowserContext();

    proxy.page = await proxy.incognito.newPage();
  })

  afterEach(async () => {
    await proxy.page?.close();
    await proxy.incognito?.close();
    await proxy.browser?.close();
  });

  return proxy;
}

export function createKoaServer({ childLinksPerPage = 3, maxDepth = 10 } = {}) {
  const app = new Koa();

  const router = new Router();

  router.get('(/[^\/]+)*', (ctx, next) => {

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
      .filter(segment => segment != NaN)
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

export async function withMockServer(mockServerOptions, callback) {
  const mockServer = createKoaServer(mockServerOptions);
  const mockHttpServer = mockServer.listen();

  console.debug('Set up mock server');

  try {
    await callback(`http://localhost:${mockHttpServer.address().port}`);
  } catch (err) {
    console.warn('withMockServer: inner callback failed.');
  } finally {
    console.debug('Closing mock server');
    mockHttpServer.close();
  }
}

export function mockServerIt(title, mockServerOptions, testCallback) {
  // Empty describe section means we can setup/teardown for a single test within.
  describe('_', () => {
    const mockServer = createKoaServer(mockServerOptions);
    let mockHttpServer;

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