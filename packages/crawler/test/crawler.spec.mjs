import { Crawler } from '../dist/index.js';
import { expect } from 'chai';
import { createKoaServer, usePuppeteer } from './util.mjs';

describe('Testing crawler execution', function () {
  const proxy = usePuppeteer();
  const mockServer = createKoaServer({
    childLinksPerPage: 10,
    maxDepth: 10,
  });
  let mockHttpServer;
  let mockServerHost;
  
  before(async () => {
    mockHttpServer = mockServer.listen();
    mockServerHost = `http://localhost:${mockHttpServer.address().port}`;
  });

  after(async () => {
    mockHttpServer.close();
  })

  it('maxDepth: 0', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockServerHost);
    await crawler.crawl({ logging: false, maxDepth: 0 });
    const urls = crawler.getResults();
    expect(urls.length).to.be.greaterThan(1);
  });

  it('maxDepth: 1', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockServerHost);
    await crawler.crawl({ logging: false, maxDepth: 1 });
    const urls = crawler.getResults();
    // console.log(urls.length);
    // expect(urls.length).to.be.greaterThan(1);
    expect(urls).to.have.length(111);
  });

  it('maxUrls: 10', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockServerHost);
    await crawler.crawl({ logging: false, maxUrls: 10 });
    const urls = crawler.getResults();
    // console.log(urls.length);
    // expect(urls.length).to.be.greaterThan(1);
    expect(urls).to.have.length(10);
  });

  it('MaxUrls: 100', async function () {
    this.timeout(0);
    const crawler = new Crawler(proxy.browser, mockServerHost);
    await crawler.crawl({ logging: false, maxUrls: 100 });
    const urls = crawler.getResults();
    // console.log(urls.length);
    // expect(urls.length).to.be.greaterThan(1);
    expect(urls).to.have.length(100);
  });

  it('Timeout: 20 seconds', async function () {
    // Expect this test to run for just over 20 seconds.
    this.timeout(30 * 1000);
    const crawler = new Crawler(proxy.browser, mockServerHost);
    await crawler.crawl({ logging: false, timeout: 20 });
    const urls = crawler.getResults();
    expect(urls.length).to.be.greaterThan(1);
  });

  it('Timeout: 1 minute', async function () {
    // Expect this test to run for just over 60 seconds.
    this.timeout(70 * 1000);
    const crawler = new Crawler(proxy.browser, mockServerHost);
    await crawler.crawl({ logging: false, timeout: 60 });
    const urls = crawler.getResults();
    expect(urls.length).to.be.greaterThan(1);
  });
});
