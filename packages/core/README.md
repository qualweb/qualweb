# QualWeb core

## How to install

```shell
  $ npm i @qualweb/core --save
```

## How to run

```javascript
  'use strict';

  const { evaluate, generateEarlReport } = require('@qualweb/core');

  (async () => {
    // QualWeb evaluation report
    const reports = await evaluate({ url: 'https://act-rules.github.io/pages/about/' });

    console.log(reports);

    // if you want an EARL report
    const earlReports = await generateEarlReport();

    console.log(earlReport);
  })();
```

# License

ISC