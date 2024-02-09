# QualWeb core

The core allows you to perform automatic accessibility evaluations on web pages. It contains 3 evaluation modules:

- [@qualweb/act-rules](https://github.com/qualweb/act-rules)
- [@qualweb/wcag-techniques](https://github.com/qualweb/wcag-techniques)
- [@qualweb/best-practices](https://github.com/qualweb/best-practices)

You can also perform evaluations at [http://qualweb.di.fc.ul.pt/evaluator/](http://qualweb.di.fc.ul.pt/evaluator/), or by installing the [chrome extension](https://chrome.google.com/webstore/detail/qualweb-extension/ljgilomdnehokancdcbkmbndkkiggioc).

## How to install

```shell
  $ npm i @qualweb/core --save
```

## How to run

```javascript
  'use strict';

  const { QualWeb, generateEARLReport } = require('@qualweb/core');

  (async () => {
    const plugins = {
      // Check https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-adblocker
      adBlock: true, // Default value = false
      // Check https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth
      stealth: true // Default value = false
    };
    const qualweb = new QualWeb(plugins);

    const clusterOptions = {
      maxConcurrency: 5, // Performs several urls evaluations at the same time - the higher the number given, more resources will be used. Default value = 1
      timeout: 60 * 1000, // Timeout for loading page. Default value = 30 seconds
      monitor: true // Displays urls information on the terminal. Default value = false
    };

    const launchOptions = {
      ... // check https://github.com/puppeteer/puppeteer/blob/v10.1.0/docs/api.md#puppeteerlaunchoptions
      // In most cases there's no need to give additional options. Just leave the field undefined
    };

    // Starts the QualWeb core engine
    await qualweb.start(clusterOptions, launchOptions);

    // QualWeb evaluation report
    const qualwebOptions = {
      url: 'https://act-rules.github.io/pages/about/',
      ...
    };

    // Evaluates the given options - will only return after all urls have finished evaluating or resulted in an error
    const reports = await qualweb.evaluate(qualwebOptions);

    console.log(reports);
    //  {
    //    "url": "report",
    //    "url2": "report2"
    //  }

    // Stops the QualWeb core engine
    await qualweb.stop();

    const earlOptions = {
      // Check the options in the section below
    };

    // if you want an EARL report
    const earlReports = generateEARLReport(reports, earlOptions);

    console.log(earlReports);
    //  {
    //    "url": "earlReport",
    //    "url2": "earlReport2"
    //  }
  })();
```

## Options

The available options fot the **evaluate()** function are:

```jsonc
{
  "url": "https://act-rules.github.io/pages/about/", // url to evaluate
  "urls": ["https://act-rules.github.io/pages/about/", "https://act-rules.github.io/rules/"], // Array of urls
  "file": "/path/to/file/with/urls", // urls must be separated by a newline (\n)
  "crawl": "https://act-rules.github.io", // Domain to crawl and obtain the urls
  "html": "<html-code>", // Full webpage html, or just small snippets
  "log": {
    "file": true, // Logs errors to a file. Default value = false
    "console": false // Logs errors to the console. Default value = false
  },
  "viewport": {
    "mobile": false, // default value = false
    "landscape": true, // default value = viewPort.width > viewPort.height
    "userAgent": "custom user agent", // default value for desktop = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:22.0) Gecko/20100101 Firefox/22.0', default value for mobile = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; DROID2 GLOBAL Build/S273) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
    "resolution": {
      "width": 1920, // default value for desktop = 1366, default value for mobile = 1080
      "height": 1080 // default value for desktop = 768, default value for mobile = 1920
    }
  },
  "waitUntil": ["load", "networkidle0"], // Events to wait before starting evaluation, default value = "load". For more check https://github.com/puppeteer/puppeteer/blob/v10.1.0/docs/api.md#pagegotourl-options
  "validator": "http://127.0.0.1/validate", // HTML validator service endpoint. The url will be attached after of the given endpoint
  "crawlOptions": {
    "maxDepth": 2, // max depth to search, 0 to search only the given domain. Default value = -1 (search everything)
    "maxUrls": 100, // max urls to find. Default value = -1 (search everything)
    "timeout": 60, // how many seconds the domain should be crawled before it ends. Default value = -1 (never stops)
    "maxParallelCrawls": 10, // max urls to crawl at the same time. Default value = 5
    "logging": true // logs domain, current depth, urls found and time passed to the terminal
  },
  "translate": "en", // OR { "translate": "en", "fallback": "en" } OR { own translation object } check https://github.com/qualweb/locale#readme. Default = "en"
  "execute": {
    // choose which modules to execute
    // if this option is not specified, the default values below will be applied, otherwise unspecified values will default to false
    "wappalyzer": false, // wappalyzer module (https://github.com/qualweb/wappalyzer)
    "act": true, // act-rules module (https://github.com/qualweb/act-rules)
    "wcag": true, // wcag-techniques module (https://github.com/qualweb/wcag-techniques)
    "bp": false, // best-practices module (https://github.com/qualweb/best-practices)
    "counter": false // counter module (https://github.com/qualweb/counter)
  },
  "act-rules": {
    // More information about this options at https://github.com/qualweb/act-rules
    "rules": ["QW-ACT-R1", "b5c3f8"], // Array of rules to execute, can be passed the QualWeb Rule ID or the ACT Rule ID
    "exclude": ["QW-ACT-R1", "b5c3f8"], // Array of rules to exclude, can be passed the QualWeb Rule ID or the ACT Rule ID
    "levels": ["A", "AA", "AAA"], // Conformance levels to execute,
    "principles": ["Perceivable", "Operable", "Understandable", "Robust"] // Principles to execute
  },
  "wcag-techniques": {
    // More information about this options at https://github.com/qualweb/wcag-techniques
    "techniques": ["QW-WCAG-T1", "H39"], // Array of techniques to execute, can be passed the QualWeb Technique ID or the WCAG 2.1 Technique Code
    "exclude": ["QW-WCAG-T1", "H39"], // Array of techniques to exclude, can be passed the QualWeb Technique ID or the WCAG 2.1 Technique Code
    "levels": ["A", "AA", "AAA"], // Conformance levels to execute,
    "principles": ["Perceivable", "Operable", "Understandable", "Robust"] // Principles to execute
  },
  "best-practices": {
    // More information about this options at https://github.com/qualweb/best-practices
    "bestPractices": ["QW-BP1", "QW-BP2"], // Array of best practices to execute
    "exclude": ["QW-BP1", "QW-BP2"] // Array of best practices to exclude
  }
}
```

The available options fot the **generateEARLReport()** function are:

```jsonc
{
  "aggregated": true, // default value = false
  "aggregatedName": "websites.json", // The name to save the aggregated earl reports. default value = first url of the list
  "modules": {
    // Choose which modules to convert the report to earl, by default all modules are converted if they were executed
    "act": true, // default value = true
    "wcag": false, // default value = true
    "best-practices": false // default value = true
  } // If the "modules" value is given, any missing module value missing it's automatically set to false
}
```

## Report details

In this section it's explained the evaluation report in detail. For a detailed version of the EARL report check [@qualweb/earl-reporter](https://github.com/qualweb/earl-reporter#report-details).

```jsonc
  {
    "type": "evaluation",
    "system": {
      "name": "QualWeb",
      "description": "QualWeb is an automatic accessibility evaluator for webpages.",
      "version": "QualWeb version",
      "homepage": "http://www.qualweb.di.fc.ul.pt/",
      "date": "date of the evaluation",
      "hash": "unique hash",
      "url": {
        "inputUrl": "inserted url",
        "protocol": "protocol of the url",
        "domainName": "domain name of the url",
        "domain": "domain of the url",
        "uri": "uri of the url",
        "completeUrl": "complete url after all redirects"
      },
      "page": {
        "viewport": {
          "mobile": "was evaluated on a mobile context or not",
          "landscape": "was evaluated on a landscape context or not",
          "userAgent": "user agent used",
          "resolution": {
            "width": "window's width used",
            "height": "window's height used",
          }
        },
        "dom": {
          "html": "html code as a string",
          "title": "Title of the webpage",
          "elementCount": "Element count of the webpage"
        }
      }
    },
    "metadata": {
      "passed": "number of passed rules/techniques/best practices",
      "warning": "number of warning rules/techniques/best practices",
      "failed": "number of failed rules/techniques/best practices",
      "inapplicable": "number of inapplicable rules/techniques/best practices",
    },
    "modules": {
      "act-rules": {
        "type": "act-rules",
        "metadata": {
          "passed": "number of passed rules",
          "warning": "number of warning rules",
          "failed": "number of failed rules",
          "inapplicable": "number of inapplicable rules",
        },
        "assertions": {
          "QW_ACT_R1": {
            "name": "Name of the rule",
            "code": "QualWeb rule id",
            "mapping": "ACT rule id mapping",
            "description": "Description of the rule",
            "metadata": {
              "target": "Any target, can be one element, multiple elements, attributes, a relation between elements",
              "success-criteria?": [
                {
                  "name": "Name of the success criteria",
                  "level": "Level of conformance of the success criteria",
                  "principle": "Principle of the success criteria",
                  "url": "Url of the success criteria"
                }
              ],
              "related?": [], // related WCAG 2.1 techniques
              "url?": "Url of the rule",
              "passed": "Number of passed results",
              "warning": "Number of warning results",
              "failed": "Number ff failed results",
              "type?": [], // usually "ACTRule" or "TestCase"
              "a11yReq?": [], // WCAG 2.1 relation - something like "WCAG21:language"
              "outcome": "Outcome of the rule",
              "description": "Description of the outcome";
            },
            "results": [
              {
                "verdict": "Outcome of the test",
                "description": "Description of the test",
                "resultCode": "Test identifier",
                "pointer?": "Element pointer in CSS notation",
                "htmlCode?": "Element html code",
                "attributes?": "Attributes of the element",
                "accessibleName?": "Accessible name of the test target"
              },
              { ... }
            ]
          },
          "...": { ... }
        }
      },
      "wcag-techniques": {
        "type": "wcag-techniques",
        "metadata": {
          "passed": "number of passed techniques",
          "warning": "number of warning techniques",
          "failed": "number of failed techniques",
          "inapplicable": "number of inapplicable techniques",
        },
        "assertions": {
          "QW_WCAG_T1": {
            "name": "Name of the technique",
            "code": "QualWeb technique id",
            "mapping": "WCAG techniques code mapping",
            "description": "Description of the technique",
            "metadata": {
              "target": "Any target, can be one element, multiple elements, attributes, a relation between elements",
              "success-criteria?": [
                {
                  "name": "Name of the success criteria",
                  "level": "Level of conformance of the success criteria",
                  "principle": "Principle of the success criteria",
                  "url": "Url of the success criteria"
                }
              ],
              "related?": [], // related WCAG 2.1 techniques
              "url?": "Url of the technique",
              "passed": "Number of passed results",
              "warning": "Number of warning results",
              "failed": "Number ff failed results",
              "type?": [], // usually "ACTRule" or "TestCase"
              "a11yReq?": [], // WCAG 2.1 relation - something like "WCAG21:language"
              "outcome": "Outcome of the technique",
              "description": "Description of the outcome";
            },
            "results": [
              {
                "verdict": "Outcome of the test",
                "description": "Description of the test",
                "resultCode": "Test identifier",
                "pointer?": "Element pointer in CSS notation",
                "htmlCode?": "Element html code",
                "attributes?": "Attributes of the element" // if available
              },
              { ... }
            ]
          },
          "...": { ... }
        }
      },
      "best-practices": {
        "type": "best-practices",
        "metadata": {
          "passed": "number of passed best practices",
          "warning": "number of warning best practices",
          "failed": "number of failed best practices",
          "inapplicable": "number of inapplicable best practices",
        },
        "assertions": {
          "QW_BP1": {
            "name": "Name of the technique",
            "code": "QualWeb best practices id",
            "description": "Description of the best practices",
            "metadata": {
              "target": "Any target, can be one element, multiple elements, attributes, a relation between elements",
              "success-criteria?": [
                {
                  "name": "Name of the success criteria",
                  "level": "Level of conformance of the success criteria",
                  "principle": "Principle of the success criteria",
                  "url": "Url of the success criteria"
                }
              ],
              "related?": [], // related WCAG 2.1 techniques
              "passed": "Number of passed results",
              "warning": "Number of warning results",
              "failed": "Number ff failed results",
              "type?": [], // usually "ACTRule" or "TestCase"
              "a11yReq?": [], // WCAG 2.1 relation - something like "WCAG21:language"
              "outcome": "Outcome of the best practices",
              "description": "Description of the outcome";
            },
            "results": [
              {
                "verdict": "Outcome of the test",
                "description": "Description of the test",
                "resultCode": "Test identifier",
                "pointer?": "Element pointer in CSS notation",
                "htmlCode?": "Element html code",
                "attributes?": "Attributes of the element" // if available
              },
              { ... }
            ]
          },
          "...": { ... }
        }
      },
      "counter": {
        "type": "counter",
        "data": {
          "roles": {
            "button": 2,
            "link": 4,
            ...
          },
          "tags": {
            "div": 10,
            "table": 3,
            ...
          }
        }
      }
    }
  }
```

## Implemented ACT Rules

| QualWeb Rule ID | ACT Rule ID                                        | ACT Rule Name                                                                       |
| --------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| QW-ACT-R1       | [2779a5](https://act-rules.github.io/rules/2779a5) | HTML Page has a title                                                               |
| QW-ACT-R2       | [b5c3f8](https://act-rules.github.io/rules/b5c3f8) | HTML has lang attribute                                                             |
| QW-ACT-R3       | [5b7ae0](https://act-rules.github.io/rules/5b7ae0) | HTML lang and xml:lang match                                                        |
| QW-ACT-R4       | [bc659a](https://act-rules.github.io/rules/bc659a) | Meta-refresh no delay                                                               |
| QW-ACT-R5       | [bf051a](https://act-rules.github.io/rules/bf051a) | Validity of HTML Lang attribute                                                     |
| QW-ACT-R6       | [59796f](https://act-rules.github.io/rules/59796f) | Image button has accessible name                                                    |
| QW-ACT-R7       | [b33eff](https://act-rules.github.io/rules/b33eff) | Orientation of the page is not restricted using CSS transform property              |
| QW-ACT-R9       | [b20e66](https://act-rules.github.io/rules/b20e66) | Links with identical accessible names have equivalent purpose                       |
| QW-ACT-R10      | [4b1c6c](https://act-rules.github.io/rules/4b1c6c) | `iframe` elements with identical accessible names have equivalent purpose           |
| QW-ACT-R11      | [97a4e1](https://act-rules.github.io/rules/97a4e1) | Button has accessible name                                                          |
| QW-ACT-R12      | [c487ae](https://act-rules.github.io/rules/c487ae) | Link has accessible name                                                            |
| QW-ACT-R13      | [6cfa84](https://act-rules.github.io/rules/6cfa84) | Element with `aria-hidden` has no focusable content                                 |
| QW-ACT-R14      | [b4f0c3](https://act-rules.github.io/rules/b4f0c3) | meta viewport does not prevent zoom                                                 |
| QW-ACT-R15      | [80f0bf](https://act-rules.github.io/rules/80f0bf) | audio or video has no audio that plays automatically                                |
| QW-ACT-R16      | [e086e5](https://act-rules.github.io/rules/e086e5) | Form control has accessible name                                                    |
| QW-ACT-R17      | [23a2a8](https://act-rules.github.io/rules/23a2a8) | Image has accessible name                                                           |
| QW-ACT-R18      | [3ea0c8](https://act-rules.github.io/rules/3ea0c8) | `id` attribute value is unique                                                      |
| QW-ACT-R19      | [cae760](https://act-rules.github.io/rules/cae760) | iframe element has accessible name                                                  |
| QW-ACT-R20      | [674b10](https://act-rules.github.io/rules/674b10) | role attribute has valid value                                                      |
| QW-ACT-R21      | [7d6734](https://act-rules.github.io/rules/7d6734) | svg element with explicit role has accessible name                                  |
| QW-ACT-R22      | [de46e4](https://act-rules.github.io/rules/de46e4) | Element within body has valid lang attribute                                        |
| QW-ACT-R23      | [c5a4ea](https://act-rules.github.io/rules/c5a4ea) | video element visual content has accessible alternative                             |
| QW-ACT-R24      | [73f2c2](https://act-rules.github.io/rules/73f2c2) | autocomplete attribute has valid value                                              |
| QW-ACT-R25      | [5c01ea](https://act-rules.github.io/rules/5c01ea) | ARIA state or property is permitted                                                 |
| QW-ACT-R26      | [eac66b](https://act-rules.github.io/rules/eac66b) | video element auditory content has accessible alternative                           |
| QW-ACT-R27      | [5f99a7](https://act-rules.github.io/rules/5f99a7) | This rule checks that each aria- attribute specified is defined in ARIA 1.1.        |
| QW-ACT-R28      | [4e8ab6](https://act-rules.github.io/rules/4e8ab6) | Element with role attribute has required states and properties                      |
| QW-ACT-R29      | [e7aa44](https://act-rules.github.io/rules/e7aa44) | Audio element content has text alternative                                          |
| QW-ACT-R30      | [2ee8b8](https://act-rules.github.io/rules/2ee8b8) | Visible label is part of accessible name                                            |
| QW-ACT-R31      | [c3232f](https://act-rules.github.io/rules/c3232f) | Video element visual-only content has accessible alternative                        |
| QW-ACT-R32      | [1ec09b](https://act-rules.github.io/rules/1ec09b) | video element visual content has strict accessible alternative                      |
| QW-ACT-R33      | [ff89c9](https://act-rules.github.io/rules/ff89c9) | ARIA required context role                                                          |
| QW-ACT-R34      | [6a7281](https://act-rules.github.io/rules/6a7281) | ARIA state or property has valid value                                              |
| QW-ACT-R35      | [ffd0e9](https://act-rules.github.io/rules/ffd0e9) | Heading has accessible name                                                         |
| QW-ACT-R36      | [a25f45](https://act-rules.github.io/rules/a25f45) | Headers attribute specified on a cell refers to cells in the same table element     |
| QW-ACT-R37      | [afw4f7](https://act-rules.github.io/rules/afw4f7) | Text has minimum contrast                                                           |
| QW-ACT-R38      | [bc4a75](https://act-rules.github.io/rules/bc4a75) | ARIA required owned elements                                                        |
| QW-ACT-R39      | [d0f69e](https://act-rules.github.io/rules/d0f69e) | All table header cells have assigned data cells                                     |
| QW-ACT-R40      | [59br37](https://act-rules.github.io/rules/59br37) | Zoomed text node is not clipped with CSS overflow                                   |
| QW-ACT-R41      | [36b590](https://act-rules.github.io/rules/36b590) | Error message describes invalid form field value                                    |
| QW-ACT-R42      | [8fc3b6](https://act-rules.github.io/rules/8fc3b6) | Object element has non-empty accessible name                                        |
| QW-ACT-R43      | [0ssw9k](https://act-rules.github.io/rules/0ssw9k) | Scrollable element is keyboard accessible                                           |
| QW-ACT-R44      | [fd3a94](https://act-rules.github.io/rules/fd3a94) | Links with identical accessible names and context serve equivalent purpose          |
| QW-ACT-R48      | [46ca7f](https://act-rules.github.io/rules/46ca7f) | Element marked as decorative is not exposed                                         |
| QW-ACT-R49      | [aaa1bf](https://act-rules.github.io/rules/aaa1bf) | Audio or video that plays automatically has no audio that lasts more than 3 seconds |
| QW-ACT-R50      | [4c31df](https://act-rules.github.io/rules/4c31df) | Audio or video that plays automatically has a control mechanism                     |
| QW-ACT-R51      | [fd26cf](https://act-rules.github.io/rules/fd26cf) | video element visual-only content is media alternative for text                     |
| QW-ACT-R52      | [ac7dc6](https://act-rules.github.io/rules/ac7dc6) | video element visual-only content has description track                             |
| QW-ACT-R53      | [ee13b5](https://act-rules.github.io/rules/ee13b5) | video element visual-only content has transcript                                    |
| QW-ACT-R54      | [d7ba54](https://act-rules.github.io/rules/d7ba54) | video element visual-only content has audio track alternative                       |
| QW-ACT-R55      | [1ea59c](https://act-rules.github.io/rules/1ea59c) | video element visual content has audio description                                  |
| QW-ACT-R56      | [ab4d13](https://act-rules.github.io/rules/ab4d13) | video element content is media alternative for text                                 |
| QW-ACT-R57      | [f196ce](https://act-rules.github.io/rules/f196ce) | video element visual content has description track                                  |
| QW-ACT-R58      | [2eb176](https://act-rules.github.io/rules/2eb176) | audio element content has transcript                                                |
| QW-ACT-R59      | [afb423](https://act-rules.github.io/rules/afb423) | audio element content is media alternative for text                                 |
| QW-ACT-R60      | [f51b46](https://act-rules.github.io/rules/f51b46) | video element auditory content has captions                                         |
| QW-ACT-R61      | [1a02b0](https://act-rules.github.io/rules/1a02b0) | video element visual content has transcript                                         |
| QW-ACT-R62      | [oj04fd](https://act-rules.github.io/rules/oj04fd) | Element in sequential focus order has visible focus                                 |
| QW-ACT-R63      | [b40fd1](https://act-rules.github.io/rules/b40fd1) | Document has a landmark with non-repeated content                                   |
| QW-ACT-R64      | [047fe0](https://act-rules.github.io/rules/047fe0) | Document has heading for non-repeated content                                       |
| QW-ACT-R65      | [307n5z](https://act-rules.github.io/rules/307n5z) | Element with presentational children has no focusable content                       |
| QW-ACT-R66      | [m6b1q3](https://act-rules.github.io/rules/m6b1q3) | Menuitem has non-empty accessible name                                              |
| QW-ACT-R67      | [24afc2](https://act-rules.github.io/rules/24afc2) | Letter spacing in style attributes is not !important                                |
| QW-ACT-R68      | [78fd32](https://act-rules.github.io/rules/78fd32) | Line height in style attributes is not !important                                   |
| QW-ACT-R69      | [9e45ec](https://act-rules.github.io/rules/9e45ec) | Word spacing in style attributes is not !important                                  |
| QW-ACT-R70      | [akn7bn](https://act-rules.github.io/rules/akn7bn) | frame with negative tabindex has no interactive elements                            |
| QW-ACT-R71      | [bisz58](https://act-rules.github.io/rules/bisz58) | `meta` element has no refresh delay (no exception)                                  |
| QW-ACT-R72      | [8a213c](https://act-rules.github.io/rules/8a213c) | First focusable element is link to non-repeated content                             |
| QW-ACT-R73      | [3e12e1](https://act-rules.github.io/rules/3e12e1) | Block of repeated content is collapsible                                            |
| QW-ACT-R74      | [ye5d6e](https://act-rules.github.io/rules/ye5d6e) | Document has an instrument to move focus to non-repeated content                    |
| QW-ACT-R75      | [cf77f2](https://act-rules.github.io/rules/cf77f2) | Bypass Blocks of Repeated Content                                                   |
| QW-ACT-R76      | [09o5cg](https://act-rules.github.io/rules/09o5cg) | Text has enhanced contrast                                                          |
| QW-ACT-R77      | [in6db8](https://act-rules.github.io/rules/in6db8) | ARIA required ID references exist                                                   |

## Implemented WCAG 2.1 Techniques

| QualWeb Technique ID | WCAG Technique ID                                                                                                                                                       | WCAG Technique Name                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| QW-WCAG-T1           | [H24](https://www.w3.org/WAI/WCAG21/Techniques/html/H24)                                                                                                                | Providing text alternatives for the area elements of image maps                                                                                      |
| QW-WCAG-T2           | [H39](https://www.w3.org/WAI/WCAG21/Techniques/html/H39)                                                                                                                | Using caption elements to associate data table captions with data tables                                                                             |
| QW-WCAG-T3           | [H71](https://www.w3.org/WAI/WCAG21/Techniques/html/H71)                                                                                                                | Providing a description for groups of form controls using fieldset and legend elements                                                               |
| QW-WCAG-T4           | [H73](https://www.w3.org/WAI/WCAG21/Techniques/html/H73)                                                                                                                | Using the summary attribute of the table element to give an overview of data tables                                                                  |
| QW-WCAG-T5           | [H36](https://www.w3.org/WAI/WCAG21/Techniques/html/H36)                                                                                                                | Using alt attributes on images used as submit buttons                                                                                                |
| QW-WCAG-T6           | [SCR20](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR20)                                                                                              | Using both keyboard and other device-specific functions                                                                                              |
| QW-WCAG-T7           | [H28](https://www.w3.org/WAI/WCAG21/Techniques/html/H28)                                                                                                                | Providing definitions for abbreviations by using the abbr element                                                                                    |
| QW-WCAG-T8           | [F30](https://www.w3.org/WAI/WCAG21/Techniques/failures/F30)                                                                                                            | Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives                                                |
| QW-WCAG-T9           | [G141](https://www.w3.org/WAI/WCAG21/Techniques/general/G141)                                                                                                           | Organizing a page using headings                                                                                                                     |
| QW-WCAG-T10          | [H2](https://www.w3.org/WAI/WCAG21/Techniques/html/H2)                                                                                                                  | Combining adjacent image and text links for the same resource                                                                                        |
| QW-WCAG-T11          | [H35](https://www.w3.org/WAI/WCAG21/Techniques/html/H35)                                                                                                                | Providing text alternatives on applet elements                                                                                                       |
| QW-WCAG-T12          | [F46](https://www.w3.org/WAI/WCAG21/Techniques/failures/F46)                                                                                                            | Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables                      |
| QW-WCAG-T13          | [F47](https://www.w3.org/WAI/WCAG21/Techniques/failures/F47)                                                                                                            | Failure of Success Criterion 2.2.2 due to using the blink element                                                                                    |
| QW-WCAG-T14          | [H43](https://www.w3.org/WAI/WCAG21/Techniques/html/H43)                                                                                                                | Using id and headers attributes to associate data cells with header cells in data tables                                                             |
| QW-WCAG-T15          | [H59](https://www.w3.org/WAI/WCAG21/Techniques/html/H59)                                                                                                                | Using the link element and navigation tools                                                                                                          |
| QW-WCAG-T16          | [H88](https://www.w3.org/WAI/WCAG21/Techniques/html/H88)                                                                                                                | Using HTML according to spec                                                                                                                         |
| QW-WCAG-T17          | [G162](https://www.w3.org/WAI/WCAG21/Techniques/general/G162)                                                                                                           | Positioning labels to maximize predictability of relationships                                                                                       |
| QW-WCAG-T18          | [H51](https://www.w3.org/WAI/WCAG21/Techniques/html/H51)                                                                                                                | Using table markup to present tabular information                                                                                                    |
| QW-WCAG-T19          | [H32](https://www.w3.org/WAI/WCAG21/Techniques/html/H32)                                                                                                                | Providing submit buttons                                                                                                                             |
| QW-WCAG-T20          | [H33](https://www.w3.org/WAI/WCAG21/Techniques/html/H33)                                                                                                                | Supplementing link text with the title attribute                                                                                                     |
| QW-WCAG-T21          | [F89](https://www.w3.org/WAI/WCAG21/Techniques/failures/F89)                                                                                                            | Failure of Success Criteria 2.4.4, 2.4.9 and 4.1.2 due to not providing an accessible name for an image which is the only content in a link          |
| QW-WCAG-T22          | [F52](https://www.w3.org/WAI/WCAG21/Techniques/failures/F52)                                                                                                            | Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded                                             |
| QW-WCAG-T23          | [G1](https://www.w3.org/WAI/WCAG21/Techniques/general/G1)                                                                                                               | Adding a link at the top of each page that goes directly to the main content area                                                                    |
| QW-WCAG-T24          | [F55](https://www.w3.org/WAI/WCAG21/Techniques/failures/F55)                                                                                                            | Failure of Success Criteria 2.1.1, 2.4.7, and 3.2.1 due to using script to remove focus when focus is received                                       |
| QW-WCAG-T25          | [H63](https://www.w3.org/WAI/WCAG21/Techniques/html/H63)                                                                                                                | Using the scope attribute to associate header cells and data cells in data tables                                                                    |
| QW-WCAG-T26          | [F59](https://www.w3.org/WAI/WCAG21/Techniques/failures/F59)                                                                                                            | Failure of Success Criterion 4.1.2 due to using script to make div or span a user interface control in HTML without providing a role for the control |
| QW-WCAG-T27          | [F88](https://www.w3.org/WAI/WCAG21/Techniques/failures/F88)                                                                                                            | Failure of Success Criterion 1.4.8 due to using text that is justified (aligned to both the left and the right margins)                              |
| QW-WCAG-T28          | [C12](https://www.w3.org/WAI/WCAG21/Techniques/css/C12) [C13](https://www.w3.org/WAI/WCAG21/Techniques/css/C13) [C14](https://www.w3.org/WAI/WCAG21/Techniques/css/C14) | Using `percent, em, names` for font sizes                                                                                                            |
| QW-WCAG-T29          | [C19](https://www.w3.org/WAI/WCAG21/Techniques/css/C19)                                                                                                                 | Specifying alignment either to the left or right in CSS                                                                                              |
| QW-WCAG-T30          | [F4](https://www.w3.org/WAI/WCAG21/Techniques/failures/F4)                                                                                                              | Failure of Success Criterion 2.2.2 due to using text-decoration:blink without a mechanism to stop it in less than five seconds                       |
| QW-WCAG-T31          | [F24](https://www.w3.org/WAI/WCAG21/Techniques/failures/F24)                                                                                                            | Failure of Success Criterion 1.4.3, 1.4.6 and 1.4.8 due to specifying foreground colors without specifying background colors or vice versa           |
| QW-WCAG-T32          | [H48](https://www.w3.org/WAI/WCAG21/Techniques/html/H48)                                                                                                                | Using ol, ul and dl for lists or groups of links                                                                                                     |

# Evaluation problems

Sometimes, some webpages fail to evaluate, or the evaluation may take a really long time. Before creating an issue check the **error.log** file and verify that:

- The URL is correct, and it uses http or https, or www, or both;
- The webpage exists;
- If using https, that the certificate is valid;
  - If you really want to evaluate the page with an invalid certificate, add "--ignore-certificate-errors" to the `args` in qualweb puppeteer launch options.
- The webpage is not password protected;
- The webpage is an [HTML Document](https://dom.spec.whatwg.org/#concept-document).

# License

ISC

# Versions

- 0.7.32 - Updated ACT-Rules c487ae(R12), 6cfa84 (R13), 73f2c2 (R24), 46ca7f (R48) and 78fd32 (R68)
- 0.7.31 - Removed dependencies on Wappalyzer module (continued)
- 0.7.30 - Removed dependencies on Wappalyzer module
- 0.7.29 - Fixed ACT-Rules bf051a (R5) and bc4a75 (R38)
