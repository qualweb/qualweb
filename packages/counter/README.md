# Counter module

Counts how many of each role and how many of each tag exists in the webpage.

## How to use

This package is intended to be used with [@qualweb/core](https://github.com/qualweb/core).

Add both packages to your project: 

```bash
npm i --save @qualweb/core @qualweb/counter
```

In your own code, pass an instance of the `Counter` class to QualWeb's evaluate method:

```typescript
import { Counter } from '@qualweb/counter';
import { QualWeb } from '@qualweb/core';

async function main() {
  const qw = new QualWeb();

  await qw.start();

  const counterInstance = new Counter();

  const urlToEvaluate = 'https://www.google.com';

  const report = await qw.evaluate({
    url: urlToEvaluate,
    modules: [counterInstance],
  });

  await qw.stop();

  console.debug(report[urlToEvaluate]);
}
```

# License

ISC