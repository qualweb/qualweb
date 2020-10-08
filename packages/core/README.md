# QualWeb core

The core allows you to perform automatic accessibility evaluations on web pages. It contains 4 evaluation modules:
 - [@qualweb/act-rules](https://github.com/qualweb/act-rules)
 - [@qualweb/html-techniques](https://github.com/qualweb/html-techniques)
 - [@qualweb/css-techniques](https://github.com/qualweb/css-techniques)
 - [@qualweb/best-practices](https://github.com/qualweb/best-practices)

## How to install

```shell
  $ npm i @qualweb/core --save
```

## How to run

```javascript
  'use strict';

  const { QualWeb } = require('@qualweb/core');

  (async () => {
    const qualweb = new QualWeb();
    // Starts the QualWeb core engine - only needs to run once
    const launchOptions = {
      ... // check https://github.com/puppeteer/puppeteer/blob/v3.0.3/docs/api.md#puppeteerlaunchoptions
      // in most of the cases there's no need to give additional options. Just leave the field undefined
    };
    await qualweb.start(launchOptions);

    // QualWeb evaluation report
    const evaluationOptions = { 
      url: 'https://act-rules.github.io/pages/about/',
      ...
    };

    // Evaluates the given options - will only return after all urls have finished evaluating or resulted in an error
    const reports = await qualweb.evaluate(evaluationOptions);

    console.log(reports);
    //  {
    //    "url": "report",
    //    "url2": "report2"
    //  }

    const earlOptions = {
      // Check the options in the section below
    };

    // if you want an EARL report
    const earlReports = await qualweb.generateEarlReport(reports, earlOptions);

    console.log(earlReports);
    //  {
    //    "url": "earlReport",
    //    "url2": "earlReport2"
    //  }

    // Stops the QualWeb core engine
    await qualweb.stop();
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

## Report details

In this section it's explained the evaluation report in detail. For detailed version of the EARL report check [@qualweb/earl-reporter](https://github.com/qualweb/earl-reporter#report-details).

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
          "source": {
            "html": {
              "plain": "html code as a string",
              "parsed": "html parsed using htmlparser2", // https://github.com/fb55/htmlparser2
            },
            "title": "Title of the webpage source code",
            "elementCount": "Element count of the webpage source code"
          },
          "processed": {
            "html": {
              "plain": "html code as a string"
            },
            "title": "Title of the webpage",
            "elementCount": "Element count of the webpage"
          },
          "stylesheets": [
            {
              "file": "path to the stylesheet file",
              "content": {
                "plain": "stylesheet file content as a string",
                "parsed": "stylesheet file content parsed using css" // https://github.com/reworkcss/css
              }
            }
          ]
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
            "code": "QualWeb rule code",
            "mapping": "ACT rule code mapping",
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
      "html-techniques": {
        "type": "html-techniques",
        "metadata": {
          "passed": "number of passed techniques",
          "warning": "number of warning techniques",
          "failed": "number of failed techniques",
          "inapplicable": "number of inapplicable techniques",
        },
        "assertions": {
          "QW_HTML_T1": {
            "name": "Name of the technique",
            "code": "QualWeb technique code",
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
      "css-techniques": {
        "type": "css-techniques",
        "metadata": {
          "passed": "number of passed techniques",
          "warning": "number of warning techniques",
          "failed": "number of failed techniques",
          "inapplicable": "number of inapplicable techniques",
        },
        "assertions": {
          "QW_CSS_T1": {
            "name": "Name of the technique",
            "code": "QualWeb technique code",
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
                "pointer?": "Element pointer in CSS notation", // if available
                "htmlCode?": "Element html code", // if available
                "attributes?": "Attributes of the element", // if available,
                "cssCode?": "Element CSS code",
                "stylesheetFile?": "path to the stylesheet file",
                "selector?": {
                  "value?": "Value of the selector",
                  "position?": "Position of the selector",
                },
                "property?": {
                  "name?": "CSS property name",
                  "value?": "CSS property value",
                  "position?": "CSS property position"
                }
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
            "code": "QualWeb best practices code",
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
      }
    }
  }
```

## Implemented ACT Rules

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
| QW-ACT-R9 | [b20e66](https://act-rules.github.io/rules/b20e66) | Links with identical accessible names have equivalent purpose |
| QW-ACT-R10 | [4b1c6c](https://act-rules.github.io/rules/4b1c6c) | `iframe` elements with identical accessible names have equivalent purpose |
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
| QW-ACT-R35 | [ffd0e9](https://act-rules.github.io/rules/ffd0e9) | Heading has accessible name |
| QW-ACT-R36 | [a25f45](https://act-rules.github.io/rules/a25f45) | Headers attribute specified on a cell refers to cells in the same table element |
| QW-ACT-R37 | [afw4f7](https://act-rules.github.io/rules/afw4f7) | Text has minimum contrast |
| QW-ACT-R38 | [bc4a75](https://act-rules.github.io/rules/bc4a75) | ARIA required owned elements |
| QW-ACT-R39 | [d0f69e](https://act-rules.github.io/rules/d0f69e) | All table header cells have assigned data cells |
| QW-ACT-R40 | [59br37](https://act-rules.github.io/rules/59br37) | Zoomed text node is not clipped with CSS overflow |
| QW-ACT-R41 | [36b590](https://act-rules.github.io/rules/36b590) | Error message describes invalid form field value |
| QW-ACT-R42 | [8fc3b6](https://act-rules.github.io/rules/8fc3b6) | Object element has non-empty accessible name |
| QW-ACT-R43 | [0ssw9k](https://act-rules.github.io/rules/0ssw9k) | Scrollable element is keyboard accessible |
| QW-ACT-R44 | [fd3a94](https://act-rules.github.io/rules/fd3a94) | Links with identical accessible names and context serve equivalent purpose |
| QW-ACT-R45 | [c6f8a9](https://act-rules.github.io/rules/c6f8a9) | Child elements of list(s) follow context model |
| QW-ACT-R46 | [a73be2](https://act-rules.github.io/rules/a73be2) | List elements follow content model |
| QW-ACT-R47 | [b8bb68](https://act-rules.github.io/rules/b8bb68) | Text spacing in `style` attributes is not `!important` |
| QW-ACT-R48 | [46ca7f](https://act-rules.github.io/rules/46ca7f) | Element marked as decorative is not exposed |

## Implemented WCAG 2.1 HTML Techniques

| QualWeb Technique ID | WCAG Technique ID | WCAG Technique Name |
|---|---|---|
| QW-HTML-T1 | [H24](https://www.w3.org/WAI/WCAG21/Techniques/html/H24) | Providing text alternatives for the area elements of image maps |
| QW-HTML-T2 | [H39](https://www.w3.org/WAI/WCAG21/Techniques/html/H39) | Using caption elements to associate data table captions with data tables |
| QW-HTML-T3 | [H71](https://www.w3.org/WAI/WCAG21/Techniques/html/H71) | Providing a description for groups of form controls using fieldset and legend elements |
| QW-HTML-T4 | [H73](https://www.w3.org/WAI/WCAG21/Techniques/html/H73) | Using the summary attribute of the table element to give an overview of data tables |
| QW-HTML-T5 | [H36](https://www.w3.org/WAI/WCAG21/Techniques/html/H36) | Using alt attributes on images used as submit buttons |
| QW-HTML-T6 | [SCR20](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR20) | Using both keyboard and other device-specific functions |
| QW-HTML-T7 | [H28](https://www.w3.org/WAI/WCAG21/Techniques/html/H28) | Providing definitions for abbreviations by using the abbr element |
| QW-HTML-T8 | [F30](https://www.w3.org/WAI/WCAG21/Techniques/failures/F30) | Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives |
| QW-HTML-T9 | [G141](https://www.w3.org/WAI/WCAG21/Techniques/general/G141) | Organizing a page using headings |
| QW-HTML-T10 | [H64](https://www.w3.org/WAI/WCAG21/Techniques/html/H64) | Using the title attribute of the frame and iframe elements |
| QW-HTML-T11 | [H2](https://www.w3.org/WAI/WCAG21/Techniques/html/H2) | Combining adjacent image and text links for the same resource |
| QW-HTML-T13 | [H25](https://www.w3.org/WAI/WCAG21/Techniques/html/H25) | Providing a title using the title element |
| QW-HTML-T14 | [H35](https://www.w3.org/WAI/WCAG21/Techniques/html/H35) | Providing text alternatives on applet elements |
| QW-HTML-T15 | [F46](https://www.w3.org/WAI/WCAG21/Techniques/failures/F46) | Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables |
| QW-HTML-T16 | [F47](https://www.w3.org/WAI/WCAG21/Techniques/failures/F47) | Failure of Success Criterion 2.2.2 due to using the blink element |
| QW-HTML-T17 | [H43](https://www.w3.org/WAI/WCAG21/Techniques/html/H43) | Using id and headers attributes to associate data cells with header cells in data tables |
| QW-HTML-T19 | [H59](https://www.w3.org/WAI/WCAG21/Techniques/html/H59) | Using the link element and navigation tools |
| QW-HTML-T20 | [H88](https://www.w3.org/WAI/WCAG21/Techniques/html/H88) | Using HTML according to spec |
| QW-HTML-T22 | [G140](https://www.w3.org/WAI/WCAG21/Techniques/general/G140) | Separating information and structure from presentation to enable different presentations |
| QW-HTML-T23 | [G125](https://www.w3.org/WAI/WCAG21/Techniques/general/G125) | Providing links to navigate to related Web pages |
| QW-HTML-T24 | [G88](https://www.w3.org/WAI/WCAG21/Techniques/general/G88) | Providing descriptive titles for Web pages |
| QW-HTML-T25 | [G162](https://www.w3.org/WAI/WCAG21/Techniques/general/G162) | Positioning labels to maximize predictability of relationships |
| QW-HTML-T26 | [F25](https://www.w3.org/WAI/WCAG21/Techniques/failures/F25) | Failure of Success Criterion 2.4.2 due to the title of a Web page not identifying the contents |
| QW-HTML-T27 | [G130](https://www.w3.org/WAI/WCAG21/Techniques/general/G130) | Providing descriptive headings |
| QW-HTML-T28 | [H48](https://www.w3.org/WAI/WCAG21/Techniques/html/H48) | Using ol, ul and dl for lists or groups of links |
| QW-HTML-T30 | [H51](https://www.w3.org/WAI/WCAG21/Techniques/html/H51) | Using table markup to present tabular information |
| QW-HTML-T31 | [H45](https://www.w3.org/WAI/WCAG21/Techniques/html/H45) | Using longdesc |
| QW-HTML-T32 | [H32](https://www.w3.org/WAI/WCAG21/Techniques/html/H32) | Providing submit buttons |
| QW-HTML-T33 | [H33](https://www.w3.org/WAI/WCAG21/Techniques/html/H33) | Supplementing link text with the title attribute |
| QW-HTML-T34 | [F89](https://www.w3.org/WAI/WCAG21/Techniques/failures/F89) | Failure of Success Criteria 2.4.4, 2.4.9 and 4.1.2 due to not providing an accessible name for an image which is the only content in a link  |
| QW-HTML-T35 | [F52](https://www.w3.org/WAI/WCAG21/Techniques/failures/F52) | Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded  |
| QW-HTML-T37 | [G123](https://www.w3.org/WAI/WCAG21/Techniques/general/G123) | Adding a link at the beginning of a block of repeated content to go to the end of the block |
| QW-HTML-T38 | [G1](https://www.w3.org/WAI/WCAG21/Techniques/general/G1) | Adding a link at the top of each page that goes directly to the main content area |
| QW-HTML-T39 | [H37](https://www.w3.org/WAI/WCAG21/Techniques/html/H37) | Accessible name on img and svg elements |
| QW-HTML-T40 | [F55](https://www.w3.org/WAI/WCAG21/Techniques/failures/F55) | Failure of Success Criteria 2.1.1, 2.4.7, and 3.2.1 due to using script to remove focus when focus is received |
| QW-HTML-T41 | [H63](https://www.w3.org/WAI/WCAG21/Techniques/html/H63) | Using the scope attribute to associate header cells and data cells in data tables |
| QW-HTML-T42 | [F59](https://www.w3.org/WAI/WCAG21/Techniques/failures/F59) | Failure of Success Criterion 4.1.2 due to using script to make div or span a user interface control in HTML without providing a role for the control |
| QW-HTML-T43 | [F88](https://www.w3.org/WAI/WCAG21/Techniques/failures/F88) | Failure of Success Criterion 1.4.8 due to using text that is justified (aligned to both the left and the right margins) |

## Implemented WCAG 2.1 CSS Techniques

| QualWeb Technique ID | WCAG Technique ID | WCAG Technique Name |
|---|---|---|
| QW-CSS-T1 | [C12](https://www.w3.org/WAI/WCAG21/Techniques/css/C12) [C13](https://www.w3.org/WAI/WCAG21/Techniques/css/C13) [C14](https://www.w3.org/WAI/WCAG21/Techniques/css/C14) | Using "percent, em, names" for font sizes |
| QW-CSS-T2 | [C19](https://www.w3.org/WAI/WCAG21/Techniques/css/C19) | Specifying alignment either to the left or right in CSS |
| QW-CSS-T5 | [C24](https://www.w3.org/WAI/WCAG21/Techniques/css/C24) | Using percentage values in CSS for container sizes |
| QW-CSS-T6 | [F4](https://www.w3.org/WAI/WCAG21/Techniques/failures/F4) | Failure of Success Criterion 2.2.2 due to using text-decoration:blink without a mechanism to stop it in less than five seconds |
| QW-CSS-T7 | [F24](https://www.w3.org/WAI/WCAG21/Techniques/failures/F24) | Failure of Success Criterion 1.4.3, 1.4.6 and 1.4.8 due to specifying foreground colors without specifying background colors or vice versa |

# License

ISC