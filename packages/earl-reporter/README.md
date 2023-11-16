# QualWeb EARL reporter

EARL reporter module for QualWeb.

## How to use

**This is an internal module of QualWeb. To use it check either [@qualweb/cli](https://github.com/qualweb/cli) or [@qualweb/core](https://github.com/qualweb/core).**

## Report details

```jsonc
  {
    "@context": "https://act-rules.github.io/earl-context.json",
    "@graph": [
      {
        "@type": "TestSubject",
        "source": "url of the tested webpage",
        "redirectedTo": "final url after redirects (if any)",
        "assertor": {
          "@id": "QualWeb",
          "@type": "Software",
          "title": "QualWeb",
          "description": "QualWeb is an automatic accessibility evaluator for webpages.",
          "hasVersion": "QualWeb version",
          "homepage": "http://www.qualweb.di.fc.ul.pt/"
        },
        "assertions": [
          {
            "@type": "Assertion",
            "test": {
              "@id": "url fo the rule/technique",
              "@type": "TestCase",
              "title": "rule/technique name",
              "description": "rule/technique description"
            },
            "mode": "earl:automatic",
            "result": {
              "@type": "TestResult",
              "outcome": "outcome of the rule/technique",
              "source": [
                {
                  "result": {
                    "pointer": "Pointer to the test target in CSS notation",
                    "outcome": "outcome of the test"
                  }
                },
                {
                  ...
                }
              ],
              "description": "Description of the outcome",
              "date": "Date of the evaluation"
            }
          },
          {
            ...
          }
        ]
      },
      {
        ...
      }
    ]
  }
```

# License

ISC