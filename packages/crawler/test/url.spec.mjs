import { Crawler } from '../dist/index.js';
import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('Url crawling', function () {
  it('should have more than 1 urls', async function () {
    this.timeout(0);

    const browser = await puppeteer.launch();
    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt');
    await crawler.crawl({ logging: true, maxDepth: 0 });
    const urls = crawler.getResults();
    console.log(urls);

    await browser.close();

    expect(urls.length).to.be.greaterThan(1);
  });
});
