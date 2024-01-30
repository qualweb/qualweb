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

    for (let i = 0; i < childLinksPerPage; i++) {
      childLinks.push(`<li><a href="${(parms || '') + '/' + (i + leafOffset) }">Child #${i}</a></li>`);
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

/**
 * Sets up a Koa server with specified {@link koaOptions}, then invokes the
 * callback with the address to the server. When the callback promise resolves
 * (or throws), the server is cleaned up.
 * @param {*} koaOptions 
 * @param {Promise<any>} cb 
 */
export function useMockServer(koaOptions, cb) {
  const koaApp = createKoaServer(koaOptions);

  console.debug('Opening mock server');
  const httpServer = koaApp.listen();

  console.debug('Passing control to callback');
  
  cb(`http://localhost:${httpServer.address().port}`)
    .then(() => console.debug('DONE'))
    .finally(() => {
      console.error('Closing mock server');
      httpServer.close();
    });
}

// useMockServer({}, (hostname) => {
//   throw new Error('Code fucked up!');
// });

// const a = createKoaServer({
//   childLinksPerPage: 10,
//   maxDepth: 3,
// });

// const server = a.listen(8081);
// console.debug(server.address());