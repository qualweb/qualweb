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
    const report = await evaluate({ url: 'https://act-rules.github.io/pages/about/' });

    console.log(report);

    // if you want an EARL report
    const earlReport = await generateEarlReport();

    console.log(earlReport);
  })();
```

# License

ISC