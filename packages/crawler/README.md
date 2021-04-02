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
    const browser = puppeteer.launch();
    const crawler = new Crawler(browser, 'https://ciencias.ulisboa.pt');

    const options = {
      maxDepth?: 2, // max depth to search, 0 to search only the given domain. Default value = -1 (search everything)
      maxUrls?: 100, // max urls to find. Default value = -1 (search everything)
      maxParallelCrawls?: 10, // max urls to crawl at the same time. Default value = 5
      logging?: true // logs current depth and urls found to the terminal
    };

    await crawler.crawl(options);

    await browser.close();

    const urls = crawler.getResults();

    console.log(urls);
  })();
```

# License

ISC