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
    const options = { 
      url: 'https://act-rules.github.io/pages/about/' 
    };

    const reports = await evaluate(options);

    console.log(reports);

    const earlOptions = {
      // Check the options in the section below
    }

    // if you want an EARL report
    const earlReports = await generateEarlReport(earlOptions);

    console.log(earlReport);
  })();
```

## Options

The available options fot the **evaluate()** function are:

```json
  {
    "url": "https://act-rules.github.io/pages/about/", // url to evaluate
    "urls": ["https://act-rules.github.io/pages/about/", "https://act-rules.github.io/rules/"], // Array of urls
    "file": "/path/to/file/with/urls", // urls must be separacted by a newline (\n)
    "crawl": "https://act-rules.github.io", // Experimental feature - domain to crawl and obtain the urls
    "viewport": {
      "mobile": false, // default value = false
      "landscape": true, // default value = viewPort.width > viewPort.height
      "userAgent": "custom user agent", // default value for desktop = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:22.0) Gecko/20100101 Firefox/22.0', default value for mobile = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; DROID2 GLOBAL Build/S273) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
      "resolution": {
        "width": 1920, // default value for desktop = 1366, default valuet for mobile = 1080
        "height": 1080 // default value for desktop = 768, default valuet for mobile = 1920
      }
    },
    "maxParallelEvaluations": "5", // Experimental feature - performs several urls evaluations at the same time - the higher the number given, more resources will be used
    "execute": { // choose witch modules to execute
      "wappalyzer": false, // wappalyzer module (https://github.com/qualweb/wappalyzer) - default value = false
      "act": true, // act-rules module (https://github.com/qualweb/act-rules) - default value = true
      "html": true, // html-techniques module (https://github.com/qualweb/html-techniques) - default value = true
      "css": false, // css-rules module (https://github.com/qualweb/css-techniques) - default value = true
      "bp": false // best-practices module (https://github.com/qualweb/best-practices) - default value = true
    },
    "act-rules": { // More information about this options at https://github.com/qualweb/act-rules
      "rules": ["QW-ACT-R1", "b5c3f8"], // Array of rules to execute, can be passed the QualWeb Rule ID or the ACT Rule ID
      "levels": ["A", "AA", "AAA"], // Conformance levels to execute, 
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"] // Principles to execute
    },
    "html-techniques": { // More information about this options at https://github.com/qualweb/html-techniques
      "rules": ["QW-HTML-T1", "H39"], // Array of techniques to execute, can be passed the QualWeb Technique ID or the WCAG 2.1 Technique Code
      "levels": ["A", "AA", "AAA"], // Conformance levels to execute, 
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"] // Principles to execute
    },
    "css-techniques": { // More information about this options at https://github.com/qualweb/css-techniques
      "rules": ["QW-CSS-RT", "C19"], // Array of techniques to execute, can be passed the QualWeb Technique ID or the WCAG 2.1 Technique Code
      "levels": ["A", "AA", "AAA"], // Conformance levels to execute, 
      "principles": ["Perceivable", "Operable", "Understandable", "Robust"] // Principles to execute
    },
    "best-practices": { // More information about this options at https://github.com/qualweb/best-practices
      "bestPractices": ["QW-BP1", "QW-BP2"] // Array of best practices to execute
    }
  }
```

The available options fot the **generateEarlReport()** function are:

```json
  {
    "aggregated": true, // default value = false
    "modules": { // Choose witch modules to convert the report to earl, by default all modules are converted if they were executed
      "act": true, // default value = true
      "html": false, // default value = true
      "css": false, // default value = true
      "best-practices": false // default value = true
    } // If the "modules" value is given, any missing module value missing it's automatically set to false  
  }
```

# License

ISC