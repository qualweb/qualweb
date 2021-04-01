const Crawl = require('../dist/index');
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const fs = require('fs');

describe('Testing crawler execution', function() {
  it('should crawl everything', async function() {
    this.timeout(0);
    const crawler = new Crawl('https://ciencias.ulisboa.pt');
    await crawler.start();
    const urls = crawler.getResults();
    console.log(urls);
    expect(urls.length).to.be.greaterThan(1);
  });

  it.only('Should crawl: puppeteer', async function() {
    this.timeout(0);
    const browser = await puppeteer.launch();
    const crawler = new Crawl(browser, 'https://lead-me-cost.eu/');
    await crawler.crawl({  log: true });
    await browser.close();
    const urls = crawler.getResults();
    console.log(urls.length);
    //fs.writeFileSync('urls.txt', urls.join('\n'));
    expect(urls.length).to.be.greaterThan(1);
  })
});