import { Crawler } from '../dist/index.js';
import { expect } from 'chai';
import { createKoaServer, usePuppeteer } from './util.mjs';

describe('Depth tests (maxDepth)', function () {
  const proxy = usePuppeteer();

  const mockServer = createKoaServer({
    childLinksPerPage: 10,
    maxDepth: 10,
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
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockHttpServerHost);
    await crawler.crawl({ logging: false, maxDepth: 1 });
    const urls = crawler.getResults();

    expect(urls).to.have.length(10);
  });
});