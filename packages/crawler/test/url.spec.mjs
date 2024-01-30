import { Crawler } from '../dist/index.js';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { expect } from 'chai';
import { createKoaServer, usePuppeteer } from './util.mjs';

describe('Url crawling', function () {
  const proxy = usePuppeteer();

  const koaServer = createKoaServer({ childLinksPerPage: 10, maxDepth: 10 }).listen();
  const host = `http://localhost:${koaServer.address().port}`;

  it('should have more than 1 urls', async function () {
    this.timeout(0);

    puppeteer.use(StealthPlugin());

    const crawler = new Crawler(proxy.browser, host);
    await crawler.crawl({ logging: false, maxDepth: 0 });
    const urls = crawler.getResults();

    expect(urls).to.have.length(11);
  });

  after(() => koaServer.close());
});
