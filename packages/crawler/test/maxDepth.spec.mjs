import { Crawler } from '../dist/index.js';
import { expect } from 'chai';
import { createKoaServer, koaServerPageCount, usePuppeteer } from './util.mjs';

describe('Depth tests (maxDepth)', function () {
  const proxy = usePuppeteer();

  const childLinksPerPage = 10;
  const maxDepth = 10;

  const mockServer = createKoaServer({
    childLinksPerPage,
    maxDepth,
  });

  let mockHttpServer;
  let mockHttpServerHost;

  beforeEach(async () => {
    mockHttpServer = mockServer.listen();
    mockHttpServerHost = `http://localhost:${mockHttpServer.address().port}`;
  });

  afterEach(async () => {
    mockHttpServer.close();
  });

  it('Should only crawl the surface level of URLs (maxDepth: 0)', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, `http://localhost:${mockHttpServer.address().port}`);
    await crawler.crawl({ logging: false, maxDepth: 0 });
    const urls = crawler.getResults();
    
    expect(urls).to.have.length(11);
  });

  it('Should only crawl URLs that are one level deep (maxDepth: 1)', async function () {
    const maxDepth = 1;

    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockHttpServerHost);
    await crawler.crawl({ logging: false, maxDepth });
    const urls = crawler.getResults();

    // The crawler's maxDepth does not consider the index-level to be a nesting,
    // so it will crawl '/', '/*', and '/*/*', so to speak. Adding 1 to the max
    // depth used for the estimated calculation matches that expectation.
    const expectedUrlCount = koaServerPageCount(childLinksPerPage, maxDepth + 1);

    expect(urls).to.have.length(expectedUrlCount);
  });
});