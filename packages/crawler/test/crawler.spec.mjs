import { Crawler } from '../dist/index.js';
import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('Testing crawler execution', function () {
  let browser;

  before(async function () {
    browser = await puppeteer.launch();
  });

  after(async function () {
    await browser.close();
  });

  it('maxDepth: 0', async function () {
    this.timeout(0);
    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt');
    await crawler.crawl({ logging: true, maxDepth: 0 });
    const urls = crawler.getResults();
    console.log(urls.length);
    expect(urls.length).to.be.greaterThan(1);
  });

  it('maxDepth: 1', async function () {
    this.timeout(0);
    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt');
    await crawler.crawl({ logging: true, maxDepth: 1 });
    const urls = crawler.getResults();
    console.log(urls.length);
    expect(urls.length).to.be.greaterThan(1);
  });

  it('maxUrls: 10', async function () {
    this.timeout(0);
    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt');
    await crawler.crawl({ logging: true, maxUrls: 10 });
    const urls = crawler.getResults();
    console.log(urls.length);
    expect(urls.length).to.be.greaterThan(1);
  });

  it('MaxUrls: 100', async function () {
    this.timeout(0);
    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt');
    await crawler.crawl({ logging: true, maxUrls: 100 });
    const urls = crawler.getResults();
    console.log(urls.length);
    expect(urls.length).to.be.greaterThan(1);
  });

  it('Timeout: 20 seconds', async function () {
    this.timeout(0);
    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt');
    await crawler.crawl({ logging: true, timeout: 20 });
    const urls = crawler.getResults();
    console.log(urls.length);
    expect(urls.length).to.be.greaterThan(1);
  });

  it('Timeout: 1 minute', async function () {
    this.timeout(0);
    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt');
    await crawler.crawl({ logging: true, timeout: 60 });
    const urls = crawler.getResults();
    console.log(urls.length);
    expect(urls.length).to.be.greaterThan(1);
  });
});
