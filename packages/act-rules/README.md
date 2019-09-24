# QualWeb ACT Rules Module

Implementation of the [ACT rules](https://act-rules.github.io/rules/).

## How to install

```shell
  $ npm i @qualweb/act-rules --save
```

## How to run

### Additional packages

```shell
  $ npm i @qualweb/get-dom-puppeteer --save
```

```javascript
  'use strict';

  const { getDom } = require('@qualweb/get-dom-puppeteer');
  const { executeACTR } = require('@qualweb/act-rules');

  (async () => {
    const dom = await getDom('https://act-rules.github.io/pages/about/');

    const report = await executeACTR(dom.source.html.parsed, dom.processed.html.parsed);

    // print rules executed
    console.log(Object.keys(report));
    // ['QW-ACT-R1', 'QW-ACT-R2', 'QW-ACT-R3', ...]

    // print rule outcome
    console.log(report['QW-ACT-R1'].metadata.outcome);
    // 'passed' | 'failed' | 'notApplicable'

    // print rule results
    console.log(report['QW-ACT-R1'].results[0]);
    // {
    //   verdict: 'passed'
    //   description: 'HTML page has title element'
    //   code: '<title>Some title</title>'
    //   pointer: 'html > head > title'
    // }
  })();
```

## Configure

If you want you can configure the module to run only specific rules, or rules based on their principles and conform levels. For that, just import the `configure` function from the module.

```javascript
'use strict';

  const { getDom } = require('@qualweb/get-dom-puppeteer');
  const { configure, executeACTR } = require('@qualweb/act-rules');

  (async () => {
    const dom = await getDom('https://act-rules.github.io/pages/about/');

    const options = {
      rules: ['QW-ACT-R1', 'QW-ACT-R2'], // will execute these rules regarding the other options given
      principles: ['Understandable'], // will only execute rules that belong to the 'Understandable' principle
      levels: ['A', 'AA'] // will only execute rules that belong to the 'A' and 'AA' conform levels
    };

    // In this case, with these options, all rules that belong to the 'Understandable' principle and the 'A' and 'AA' conform levels and rules 'QW-ACT-R1' and 'QW-ACT-R2' will be executed

    configure(options);

    const report = await executeACTR(dom.source.html.parsed, dom.processed.html.parsed);
  })();
```

# License

ISC