import { Crawler } from '../dist/index.js';
import { expect } from 'chai';
import { createKoaServer, usePuppeteer } from './util.mjs';

describe('Slow tests (timeouts)', () => {
  const proxy = usePuppeteer();
  const mockServer = createKoaServer({
    childLinksPerPage: 1,
    maxDepth: 1,
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

  it('Timeout: 20 seconds', async function () {
    // Expect this test to run for just over 20 seconds.
    this.timeout(25 * 1000);
    const crawler = new Crawler(proxy.browser, mockHttpServerHost);
    await crawler.crawl({ logging: false, timeout: 20 });
    const urls = crawler.getResults();
    expect(urls.length).to.be.greaterThan(1);
  });

  it('Timeout: 1 minute', async function () {
    // Expect this test to run for just over 60 seconds.
    this.timeout(70 * 1000);
    const crawler = new Crawler(proxy.browser, mockHttpServerHost);
    await crawler.crawl({ logging: false, timeout: 60 });
    const urls = crawler.getResults();
    expect(urls.length).to.be.greaterThan(1);
  });
});