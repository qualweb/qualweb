# QualWeb Crawler

Crawler mechanism for qualweb. Implementation using [simplecrawler](https://github.com/simplecrawler/simplecrawler).

## How to install

```shell
  $ npm i @qualweb/crawler --save
```

## How to run

```javascript
  'use strict';

  const Crawl = require('@qualweb/crawler');

  (async () => {
    const crawler = new Crawl('https://lodash.com');

    await crawler.start();

    const urls = crawler.getResults();

    console.log(urls);
  })();
```

# License

ISC