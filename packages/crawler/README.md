# QualWeb Crawler

Crawler mechanism for QualWeb. Implementation using [puppeteer](https://github.com/puppeteer/puppeteer).

## How to install

```shell
  $ npm i @qualweb/crawler --save
```

## How to run

```javascript
  'use strict';

  const puppeteer = require('puppeteer');
  const Crawler = require('@qualweb/crawler');

  (async () => {
    const browser = await puppeteer.launch();

    const viewport = {
      // check https://github.com/puppeteer/puppeteer/blob/v8.0.0/docs/api.md#pagesetviewportviewport
    };

    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt', viewport);

    const options = {
      maxDepth?: 2, // max depth to search, 0 to search only the given domain. Default value = -1 (search everything)
      maxUrls?: 100, // max urls to find. Default value = -1 (search everything)
      timeout?: 60, // how many seconds the domain should be crawled before it ends. Default value = -1 (never stops)
      maxParallelCrawls?: 10, // max urls to crawl at the same time. Default value = 5
      logging?: true // logs domain, current depth, urls found and time passed to the terminal
    };

    await crawler.crawl(options);

    await browser.close();

    const urls = crawler.getResults();

    console.log(urls);
  })();
```

# License

ISC