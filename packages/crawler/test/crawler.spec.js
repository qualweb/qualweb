const Crawl = require('../dist/index');
const { expect } = require('chai');

describe('Testing crawler execution', function() {
  it('should crawl everything', async function() {
    this.timeout(10 * 100000);
    const crawler = new Crawl('https://lodash.com');
    await crawler.start();
    const urls = crawler.getResults();
    console.log(urls);
    expect(urls.length).to.be.greaterThan(1);
  });
});