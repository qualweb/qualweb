import { Crawler } from '../dist/index.js';
import { expect } from 'chai';
import { createKoaServer, usePuppeteer } from './util.mjs';

describe('Count limit tests (maxUrls)', function () {
  const proxy = usePuppeteer();
  const mockServer = createKoaServer({
    childLinksPerPage: 10,
    maxDepth: 10,
  });
  let mockHttpServer;
  let mockHttpServerHost;

  beforeEach(async () => {
    await new Promise(r => mockHttpServer = mockServer.listen(r));
    mockHttpServerHost = `http://localhost:${mockHttpServer.address().port}`;
  });

  afterEach(async () => {
    mockHttpServer.close();
  });

  it('Should stop after detecting 10 URLs (maxUrls: 10)', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockHttpServerHost);
    await crawler.crawl({ logging: false, maxUrls: 10 });
    const urls = crawler.getResults();

    expect(urls).to.have.length(10);
  });

  it('Should stop after detecting 100 URLs (maxUrls: 100)', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockHttpServerHost);
    await crawler.crawl({ logging: false, maxUrls: 100 });
    const urls = crawler.getResults();

    expect(urls).to.have.length(100);
  });
});
