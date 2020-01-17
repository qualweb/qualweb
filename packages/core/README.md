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

```jsonc
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
    "execute": { // choose which modules to execute
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

```jsonc
  {
    "aggregated": true, // default value = false
    "aggregatedName": "websites.json", // The name to save the aggregated earl reports. default value = first url of the list
    "modules": { // Choose which modules to convert the report to earl, by default all modules are converted if they were executed
      "act": true, // default value = true
      "html": false, // default value = true
      "css": false, // default value = true
      "best-practices": false // default value = true
    } // If the "modules" value is given, any missing module value missing it's automatically set to false  
  }
```

## Implemente ACT rules

| QualWeb Rule ID | ACT Rule ID | ACT Rule Name |
|---|---|---|
| QW-ACT-R1 | [2779a5](https://act-rules.github.io/rules/2779a5) | HTML Page has a title |
| QW-ACT-R2 | [b5c3f8](https://act-rules.github.io/rules/b5c3f8) | HTML has lang attribute |
| QW-ACT-R3 | [5b7ae0](https://act-rules.github.io/rules/5b7ae0) | HTML lang and xml:lang match |
| QW-ACT-R4 | [bc659a](https://act-rules.github.io/rules/bc659a) | Meta-refresh no delay |
| QW-ACT-R5 | [bf051a](https://act-rules.github.io/rules/bf051a) | Validity of HTML Lang attribute |
| QW-ACT-R6 | [59796f](https://act-rules.github.io/rules/59796f) | Image button has accessible name |
| QW-ACT-R7 | [b33eff](https://act-rules.github.io/rules/b33eff) | Orientation of the page is not restricted using CSS transform property |
| QW-ACT-R8 | [9eb3f6](https://act-rules.github.io/rules/9eb3f6) | Image filename is accessible name for image |
| QW-ACT-R11 | [97a4e1](https://act-rules.github.io/rules/97a4e1) | Button has accessible name |
| QW-ACT-R12 | [c487ae](https://act-rules.github.io/rules/c487ae) | Link has accessible name |
| QW-ACT-R13 | [6cfa84](https://act-rules.github.io/rules/6cfa84) | Element with `aria-hidden` has no focusable content |
| QW-ACT-R14 | [b4f0c3](https://act-rules.github.io/rules/b4f0c3) | meta viewport does not prevent zoom |
| QW-ACT-R15 | [80f0bf](https://act-rules.github.io/rules/80f0bf) | audio or video has no audio that plays automatically |
| QW-ACT-R16 | [e086e5](https://act-rules.github.io/rules/e086e5) | Form control has accessible name |
| QW-ACT-R17 | [23a2a8](https://act-rules.github.io/rules/23a2a8) | Image has accessible name |
| QW-ACT-R18 | [3ea0c8](https://act-rules.github.io/rules/3ea0c8) | `id` attribute value is unique |
| QW-ACT-R19 | [cae760](https://act-rules.github.io/rules/cae760) | iframe element has accessible name |
| QW-ACT-R20 | [674b10](https://act-rules.github.io/rules/674b10) | role attribute has valid value |
| QW-ACT-R21 | [7d6734](https://act-rules.github.io/rules/7d6734) | svg element with explicit role has accessible name |
| QW-ACT-R22 | [de46e4](https://act-rules.github.io/rules/de46e4) | Element within body has valid lang attribute |
| QW-ACT-R23 | [c5a4ea](https://act-rules.github.io/rules/c5a4ea) | video element visual content has accessible alternative |
| QW-ACT-R24 | [73f2c2](https://act-rules.github.io/rules/73f2c2) | autocomplete attribute has valid value |
| QW-ACT-R25 | [5c01ea](https://act-rules.github.io/rules/5c01ea) | ARIA state or property is permitted |
| QW-ACT-R26 | [eac66b](https://act-rules.github.io/rules/eac66b) | video element auditory content has accessible alternative |
| QW-ACT-R27 | [5f99a7](https://act-rules.github.io/rules/5f99a7) | This rule checks that each aria- attribute specified is defined in ARIA 1.1. |
| QW-ACT-R28 | [4e8ab6](https://act-rules.github.io/rules/4e8ab6) | Element with role attribute has required states and properties |
| QW-ACT-R29 | [e7aa44](https://act-rules.github.io/rules/e7aa44) | Audio element content has text alternative |
| QW-ACT-R30 | [2ee8b8](https://act-rules.github.io/rules/2ee8b8) | Visible label is part of accessible name |
| QW-ACT-R31 | [c3232f](https://act-rules.github.io/rules/c3232f) | Video element visual-only content has accessible alternative |
| QW-ACT-R32 | [1ec09b](https://act-rules.github.io/rules/1ec09b) | video element visual content has strict accessible alternative  |
| QW-ACT-R33 | [ff89c9](https://act-rules.github.io/rules/ff89c9) | ARIA required context role |
| QW-ACT-R34 | [6a7281](https://act-rules.github.io/rules/6a7281) | ARIA state or property has valid value |

# License

ISC