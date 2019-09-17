# QualWeb EARL reporter

EARL reporter module for QualWeb.

## How to install

```shell
  $ npm i @qualweb/earl-reporter --save
```

## How to run

### Additional packages

```shell
  $ npm i @qualweb/get-dom-puppeteer --save
  $ npm i @qualweb/act-rules --save
```

```javascript
  'use strict';

  const { getDom } = require('@qualweb/get-dom-puppeteer');
  const { executeACTR } = require('@qualweb/act-rules');
  const reporter = require('@qualweb/earl-reporter');

  (async () => {
    // Generate EARL assertions in case of partial report is given
    const { source, processed } = await getDom('https://act-rules.github.io/pages/about/');
    const report = await executeACTR(source.html.parsed, processed.html.parsed);
    const assertions = await reporter.generateEarlAssertions(report);

    console.log(assertions);

    // Generate full single EARL report - based on only one test subject
    const dom = await getDom('https://act-rules.github.io/pages/about/');

    // Example evaluation report
    const evaluationReport = {
      type: 'evaluation',
      system: {
        name: 'QualWeb',
        description: 'Web accessibility evaluator',
        version: '3.0.0',
        homepage: 'http://qualweb.di.fc.ul.pt',
        date: 'current date',
        hash: 'some hash',
        url: {
          completeUrl: 'https://act-rules.github.io/pages/about/'
        },
        dom: {
          title: 'some title',
          elementCount: 456
        }
      },
      modules: {
        'act-rules': ACTRulesReport;
        'html-techniques': HTMLTechniquesReport;
        'css-techniques': CSSTechniquesReport;
      }
    };

    const earlReport = await reporter.generateSingleEarlReport(evaluationReport);

    console.log(earlReport);

    // Generate full aggregated EARL report - on report based on multiple test subjects

    const evaluations = [evaluationReport1, evaluationReport2, ...];

    const aggregatedEarlReport = await reporter.generateAggregatedEarlReport(evaluations);

    console.log(aggregatedEarlReport);
  })();
```

# License

ISC