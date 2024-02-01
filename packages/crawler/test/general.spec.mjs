import { Crawler } from '../dist/index.js';
import { expect } from 'chai';
import { createKoaServer, koaServerPageCount, usePuppeteer } from './util.mjs';

describe('General crawl tests', function () {
  const proxy = usePuppeteer();

  // Mock server set up.
  const mockServerOptions = {
    childLinksPerPage: 3,
    maxDepth: 3,
  };

  const mockServer = createKoaServer(mockServerOptions);

  const actualUrlCount = koaServerPageCount(
    mockServerOptions.childLinksPerPage,
    mockServerOptions.maxDepth,
  );

  let mockHttpServer;
  let mockHttpServerHost;

  beforeEach(async () => {
    mockHttpServer = mockServer.listen();
    mockHttpServerHost = `http://localhost:${mockHttpServer.address().port}`;
  });

  afterEach(async () => {
    mockHttpServer.close();
  });

  it('Should exhaustively crawl a server', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, `http://localhost:${mockHttpServer.address().port}`);
    await crawler.crawl({ logging: false, });
    const urls = crawler.getResults();

    expect(urls).to.have.length(actualUrlCount);
  });
});