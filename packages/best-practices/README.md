# QualWeb best practices

## How to install

```shell
  $ npm i @qualweb/best-practices --save
```

## How to run

### Additional packages

```shell
  $ npm i @qualweb/get-dom-puppeteer --save
```

```javascript
  'use strict';

  const { getDom } = require('@qualweb/get-dom-puppeteer');
  const { executeBestPractices } = require('@qualweb/best-practices');

  (async () => {
    const dom = await getDom('https://act-rules.github.io/pages/about/');

    const report = await executeBestPractices(dom.source.html.parsed, dom.processed.html.parsed);

    console.log(report);
  })();
```

# License

ISC