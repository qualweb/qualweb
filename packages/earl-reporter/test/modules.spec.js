const { expect } = require('chai');
const reporter = require('../dist/index');

// https://ciencias.ulisboa.pt - 05/08/2019 15:31
const evaluationReport = {
  "type": "evaluation",
  "system": {
    "name": "QualWeb",
    "description": "QualWeb is an automatic accessibility evaluator for webpages.",
    "version": "3.0.0",
    "homepage": "http://www.qualweb.di.fc.ul.pt/",
    "date": "8/5/2019",
    "hash": "491d2298c471c51df262d524741bb9aa9eb70090",
    "url": {
      "inputUrl": "https://ciencias.ulisboa.pt",
      "protocol": "https",
      "domainName": "ciencias.ulisboa.pt",
      "domain": "pt",
      "uri": "",
      "completeUrl": "https://ciencias.ulisboa.pt"
    }
  },
  "modules": {
    "act-rules": {
      "type": "act-rules",
      "rules": {
        "QW-ACT-R4": {
          "name": "Meta-refresh no delay",
          "code": "QW-ACT-R4",
          "mapping": "bc659a",
          "description": "This rule checks that the meta element is not used for delayed redirecting or refreshing.",
          "metadata": {
            "target": {
              "element": "meta"
            },
            "success-criteria": [{
                "name": "2.1.1",
                "level": "A",
                "principle": "Operable"
              },
              {
                "name": "2.2.4",
                "level": "AAA",
                "principle": "Operable"
              },
              {
                "name": "3.2.5",
                "level": "AAA",
                "principle": "Understandable"
              }
            ],
            "related": [
              "H76",
              "F40",
              "F41"
            ],
            "url": "https://act-rules.github.io/rules/bc659a",
            "passed": 0,
            "failed": 0,
            "inapplicable": 6,
            "type": [
              "ACTRule",
              "TestCase"
            ],
            "outcome": "inapplicable",
            "description": "\"Content\" attribute is invalid\""
          },
          "results": [{
              "verdict": "inapplicable",
              "description": "\"Content\" attribute is invalid\"",
              "code": "<meta http-equiv=\"Content-Type\" content=\"text/html; charset&#61;utf-8\">",
              "pointer": "html > head > meta:nth-of-type(1)"
            },
            {
              "verdict": "inapplicable",
              "description": "Inexistent attribute \"http-equiv\"",
              "code": "<meta name=\"theme-color\" content=\"#2c3fb1\">",
              "pointer": "html > head > meta:nth-of-type(2)"
            },
            {
              "verdict": "inapplicable",
              "description": "Inexistent attribute \"http-equiv\"",
              "code": "<meta name=\"generator\" content=\"Drupal 7 (https://www.drupal.org)\">",
              "pointer": "html > head > meta:nth-of-type(3)"
            },
            {
              "verdict": "inapplicable",
              "description": "Inexistent attribute \"http-equiv\"",
              "code": "<meta name=\"MobileOptimized\" content=\"width\">",
              "pointer": "html > head > meta:nth-of-type(4)"
            },
            {
              "verdict": "inapplicable",
              "description": "Inexistent attribute \"http-equiv\"",
              "code": "<meta name=\"HandheldFriendly\" content=\"true\">",
              "pointer": "html > head > meta:nth-of-type(5)"
            },
            {
              "verdict": "inapplicable",
              "description": "Inexistent attribute \"http-equiv\"",
              "code": "<meta name=\"viewport\" content=\"width&#61;device-width, initial-scale&#61;1\">",
              "pointer": "html > head > meta:nth-of-type(6)"
            }
          ]
        },
        "QW-ACT-R1": {
          "name": "HTML Page has a title",
          "code": "QW-ACT-R1",
          "mapping": "2779a5",
          "description": "This rule checks that the HTML page has a title.",
          "metadata": {
            "target": {
              "element": "title"
            },
            "success-criteria": [{
              "name": "2.4.2",
              "level": "A",
              "principle": "Operable"
            }],
            "related": [],
            "url": "https://act-rules.github.io/rules/2779a5",
            "passed": 1,
            "inapplicable": 0,
            "failed": 0,
            "type": [
              "ACTRule",
              "TestCase"
            ],
            "a11yReq": [
              "WCAG21:title"
            ],
            "outcome": "passed",
            "description": "Title element exists and it's not empty"
          },
          "results": [{
            "verdict": "passed",
            "description": "Title element exists and it's not empty",
            "code": "<title>Faculdade de Ciências da Universidade de Lisboa</title>",
            "pointer": "html > head > title:nth-of-type(1)"
          }]
        },
        "QW-ACT-R2": {
          "name": "HTML has lang attribute",
          "code": "QW-ACT-R2",
          "mapping": "b5c3f8",
          "description": "This rule checks that the html element has a non-empty lang or xml:lang attribute.",
          "metadata": {
            "target": {
              "element": "html",
              "attributes": [
                "lang",
                "xml:lang"
              ]
            },
            "success-criteria": [{
              "name": "3.1.1",
              "level": "A",
              "principle": "Understandable"
            }],
            "related": [],
            "url": "https://act-rules.github.io/rules/b5c3f8",
            "passed": 1,
            "inapplicable": 0,
            "failed": 0,
            "type": [
              "ACTRule",
              "TestCase"
            ],
            "a11yReq": [
              "WCAG21:language"
            ],
            "outcome": "passed",
            "description": "The lang attribute has a value "
          },
          "results": [{
            "verdict": "passed",
            "description": "The lang attribute has a value ",
            "code": "<html class=\"no-js js\" lang=\"pt-pt\" dir=\"ltr\"></html>",
            "pointer": "html"
          }]
        },
        "QW-ACT-R3": {
          "name": "HTML lang and xml:lang match",
          "code": "QW-ACT-R3",
          "mapping": "5b7ae0",
          "description": "The rule checks that for the html element, there is no mismatch between the primary language in non-empty lang and xml:lang attributes, if both are used.",
          "metadata": {
            "target": {
              "element": "html",
              "attributes": [
                "lang",
                "xml:lang"
              ]
            },
            "success-criteria": [{
              "name": "3.1.1",
              "level": "A",
              "principle": "Understandable"
            }],
            "related": [],
            "url": "https://act-rules.github.io/rules/5b7ae0",
            "passed": 0,
            "inapplicable": 1,
            "failed": 0,
            "type": [
              "ACTRule",
              "TestCase"
            ],
            "a11yReq": [
              "WCAG21:language"
            ],
            "outcome": "inapplicable",
            "description": "lang or xml:lang attribute doesn't exist in html element"
          },
          "results": [{
            "verdict": "inapplicable",
            "description": "lang or xml:lang attribute doesn't exist in html element",
            "test": "https://act-rules.github.io/rules/5b7ae0",
            "code": "<html class=\"no-js js\" lang=\"pt-pt\" dir=\"ltr\"></html>",
            "pointer": "html"
          }]
        },
        "QW-ACT-R5": {
          "name": "Validity of HTML Lang attribute",
          "code": "QW-ACT-R5",
          "mapping": "bf051a",
          "description": "This rule checks the lang or xml:lang attribute has a valid language subtag.",
          "metadata": {
            "target": {
              "element": "html",
              "attributes": [
                "lang",
                "xml:lang"
              ]
            },
            "success-criteria": [{
              "name": "3.1.1",
              "level": "A",
              "principle": "Understandable"
            }],
            "related": [],
            "url": "https://act-rules.github.io/rules/bf051a",
            "passed": 1,
            "inapplicable": 0,
            "failed": 0,
            "type": [
              "ACTRule",
              "TestCase"
            ],
            "a11yReq": [
              "WCAG21:language"
            ],
            "outcome": "passed",
            "description": "The lang attribute has a valid value "
          },
          "results": [{
            "verdict": "passed",
            "description": "The lang attribute has a valid value ",
            "test": "https://act-rules.github.io/rules/bf051a",
            "code": "<html class=\"no-js js\" lang=\"pt-pt\" dir=\"ltr\"></html>",
            "pointer": "html"
          }]
        }
      }
    }
  }
};

describe('Testing report modules', function() {
  it('Should report act module', async function() {
    const earl = await reporter.generateEARLReport([evaluationReport], { modules: { act: true }});
    expect(earl[0]['@graph'][0].assertions.length).to.not.be.equal(0);
  });
  it('Should report act module 2', async function() {
    const earl = await reporter.generateEARLReport([evaluationReport], {});
    expect(earl[0]['@graph'][0].assertions.length).to.not.be.equal(0);
  });
  it('Should report act module 3', async function() {
    const earl = await reporter.generateEARLReport([evaluationReport]);
    expect(earl[0]['@graph'][0].assertions.length).to.not.be.equal(0);
  });
  it('Should not report act module', async function() {
    const earl = await reporter.generateEARLReport([evaluationReport], { modules: { act: false }});
    expect(earl[0]['@graph'][0].assertions.length).to.be.equal(0);
  });
});