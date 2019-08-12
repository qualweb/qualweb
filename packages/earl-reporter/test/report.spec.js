const { expect } = require('chai');
const request = require('request-promise');
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

describe('EARL report', function () {
  describe('"context" field', function () {
    it('should exist', async function () {
      const earl = await reporter.generateSingleEarlReport(evaluationReport);
      expect(Object.keys(earl)).to.be.an('array').and.to.include('context');
    });
    it('should not be empty', async function () {
      const earl = await reporter.generateSingleEarlReport(evaluationReport);
      expect(earl.context.trim()).to.be.not.equal('');
    });
    it('should be valid', async function () {
      this.timeout(10 * 1000);
      const earl = await reporter.generateSingleEarlReport(evaluationReport);
      const contextUrl = earl.context.trim();
      const options = {
        method: 'GET',
        uri: contextUrl,
        resolveWithFullResponse: true
      };
      const response = await request(options);
      expect(response.statusCode).to.be.equal(200);
      expect(response.body.trim()).to.be.not.equal('');
    });
  });

  describe('"graph" field', function() {
    it('should exists', async function () {
      const earl = await reporter.generateSingleEarlReport(evaluationReport);
      expect(Object.keys(earl)).to.be.an('array').and.to.include('graph');
    });
    it('should be of type array', async function () {
      const earl = await reporter.generateSingleEarlReport(evaluationReport);
      expect(earl.graph).to.be.an('array');
    });
    it('should not be empty', async function () {
      const earl = await reporter.generateSingleEarlReport(evaluationReport);
      expect(earl.graph.length).to.be.not.equal(0);
    });
    it('should have only one test subject', async function() {
      const earl = await reporter.generateSingleEarlReport(evaluationReport);
      expect(earl.graph.length).to.be.equal(1);
    });
    describe('"Test subject" field', function() {
      describe('"@type" field', function() {
        it('should exist', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(Object.keys(earl.graph[0])).to.be.an('array').and.to.include('@type');
        });
        it('should be of type string', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(earl.graph[0]['@type']).to.be.a('string');
        });
        it('should not be empty', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(earl.graph[0]['@type'].trim()).to.not.be.equal('');
        });
        it('should be "TestSubject"', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(earl.graph[0]['@type'].trim()).to.be.equal('TestSubject');
        });
      });
      describe('"source" field', function() {
        it('should exist', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(Object.keys(earl.graph[0])).to.be.an('array').and.to.include('source');
        });
        it('should be of type string', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(earl.graph[0]['source']).to.be.a('string');
        });
        it('should not be empty', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(earl.graph[0]['source'].trim()).to.not.be.equal('');
        });
      });
      describe('"assertor" field', function() {
        it('should exist', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(Object.keys(earl.graph[0])).to.be.an('array').and.to.include('assertor');
        })
        describe('"@id" field', function() {
          it('should exist', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(Object.keys(earl.graph[0].assertor)).to.be.an('array').and.to.include('@id');
          });
          it('should be of type string', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['@id']).to.be.a('string');
          });
          it('should not be empty', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['@id'].trim()).to.not.be.equal('');
          });
        });
        describe('"@type" field', function() {
          it('should exist', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(Object.keys(earl.graph[0].assertor)).to.be.an('array').and.to.include('@type');
          });
          it('should be of type string', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['@type']).to.be.a('string');
          });
          it('should not be empty', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['@type'].trim()).to.not.be.equal('');
          });
          it('should be "Software"', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['@type'].trim()).to.be.equal('Software');
          });
        });
        describe('"title" field', function() {
          it('should exist', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(Object.keys(earl.graph[0].assertor)).to.be.an('array').and.to.include('title');
          });
          it('should be of type string', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['title']).to.be.a('string');
          });
          it('should not be empty', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['title'].trim()).to.not.be.equal('');
          });
        });
        describe('"description" field', function() {
          it('should exist', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(Object.keys(earl.graph[0].assertor)).to.be.an('array').and.to.include('description');
          });
          it('should be of type string', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['description']).to.be.a('string');
          });
          it('should not be empty', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['description'].trim()).to.not.be.equal('');
          });
        });
        describe('"hasVersion" field', function() {
          it('should exist', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(Object.keys(earl.graph[0].assertor)).to.be.an('array').and.to.include('hasVersion');
          });
          it('should be of type string', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['hasVersion']).to.be.a('string');
          });
          it('should not be empty', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['hasVersion'].trim()).to.not.be.equal('');
          });
        });
        describe('"homepage" field', function() {
          it('should exist', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(Object.keys(earl.graph[0].assertor)).to.be.an('array').and.to.include('homepage');
          });
          it('should be of type string', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['homepage']).to.be.a('string');
          });
          it('should not be empty', async function() {
            const earl = await reporter.generateSingleEarlReport(evaluationReport);
            expect(earl.graph[0].assertor['homepage'].trim()).to.not.be.equal('');
          });
        });
      });
      describe('"assertions" field', function() {
        it('should exist', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(Object.keys(earl.graph[0])).to.be.an('array').and.to.include('assertions');
        });
        it('should be of type array', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(earl.graph[0].assertions).to.be.an('array');
        });
        it('should not be empty', async function() {
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(earl.graph[0].assertions.length).to.not.be.equal(0);
        });
        it('should have number of assertions equal to the same amount of tests done', async function() {
          const nAssertions = Object.keys(evaluationReport.modules['act-rules'].rules).length +
            (evaluationReport.modules['html-techniques'] ? Object.keys(evaluationReport.modules['html-techniques'].techniques).length : 0) +
            (evaluationReport.modules['css-techniques'] ? Object.keys(evaluationReport.modules['css-techniques'].techniques).length : 0);
          const earl = await reporter.generateSingleEarlReport(evaluationReport);
          expect(earl.graph[0].assertions.length).to.be.equal(nAssertions);
        });
        describe('"assertion" field', function() {
          describe('"@type" field', function() {
            it('should exist', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(Object.keys(earl.graph[0].assertions[0])).to.include('@type');
            });
            it('should be of type string', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(earl.graph[0].assertions[0]['@type']).to.be.a('string');
            });
            it('should not be empty', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(earl.graph[0].assertions[0]['@type'].trim()).to.not.be.equal('');
            });
            it('should be "Assertion"', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(earl.graph[0].assertions[0]['@type'].trim()).to.be.equal('Assertion');
            });
          });
          describe('"test" field', function() {
            it('should exist', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(Object.keys(earl.graph[0].assertions[0])).to.include('test');
            });
            describe('"@id" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].test)).to.include('@id');
              });
              it('should be of type string', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['@id']).to.be.a('string');
              });
              it('should not be empty', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['@id'].trim()).to.not.be.equal('');
              });
            });
            describe('"@type" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].test)).to.include('@type');
              });
              it('should be of type string', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['@type']).to.be.a('string');
              });
              it('should not be empty', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['@type'].trim()).to.not.be.equal('');
              });
              it('should be "TestCase"', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['@type'].trim()).to.be.equal('TestCase');
              });
            });
            describe('"title" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].test)).to.include('title');
              });
              it('should be of type string', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['title']).to.be.a('string');
              });
              it('should not be empty', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['title'].trim()).to.not.be.equal('');
              });
            });
            describe('"description" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].test)).to.include('description');
              });
              it('should be of type string', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['description']).to.be.a('string');
              });
              it('should not be empty', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].test['description'].trim()).to.not.be.equal('');
              });
            });
          });
          describe('"mode" field', function() {
            it('should exist', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(Object.keys(earl.graph[0].assertions[0])).to.include('mode');
            });
            it('should be of type string', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(earl.graph[0].assertions[0]['mode']).to.be.a('string');
            });
            it('should not be empty', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(earl.graph[0].assertions[0]['mode'].trim()).to.not.be.equal('');
            });
            it('should be "earl:automatic"', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(earl.graph[0].assertions[0]['mode'].trim()).to.be.equal('earl:automatic');
            });
          });
          describe('"result" field', function() {
            it('should exist', async function() {
              const earl = await reporter.generateSingleEarlReport(evaluationReport);
              expect(Object.keys(earl.graph[0].assertions[0])).to.include('result');
            });
            describe('"@type" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].result)).to.include('@type');
              });
              it('should be of type string', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['@type']).to.be.a('string');
              });
              it('should not be empty', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['@type'].trim()).to.not.be.equal('');
              });
              it('should be "TestCase"', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['@type'].trim()).to.be.equal('TestResult');
              });
            });
            describe('"outcome" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].result)).to.include('outcome');
              });
              it('should be of type string', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['outcome']).to.be.a('string');
              });
              it('should not be empty', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['outcome'].trim()).to.not.be.equal('');
              });
              it('should be "earl:passed" or "earl:failed" or "earl:inapplicable"', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(['earl:passed', 'earl:failed', 'earl:inapplicable']).to.include(earl.graph[0].assertions[0].result['outcome'].trim());
              });
            });
            describe('"source" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].result)).to.include('source');
              });
              describe('"result" field', function() {
                it('should exist', async function() {
                  const earl = await reporter.generateSingleEarlReport(evaluationReport);
                  expect(Object.keys(earl.graph[0].assertions[0].result.source[0])).to.include('result');
                });
                describe('"pointer" field', function() {
                  it('should exist', async function() {
                    const earl = await reporter.generateSingleEarlReport(evaluationReport);
                    expect(Object.keys(earl.graph[0].assertions[0].result.source[0].result)).to.include('pointer');
                  });
                  it('should be of type string', async function() {
                    const earl = await reporter.generateSingleEarlReport(evaluationReport);
                    expect(earl.graph[0].assertions[0].result.source[0].result.pointer).to.be.a('string');
                  });
                  it('should not be empty', async function() {
                    const earl = await reporter.generateSingleEarlReport(evaluationReport);
                    expect(earl.graph[0].assertions[0].result.source[0].result.pointer.trim()).to.not.be.equal('');
                  });
                });
                describe('"outcome" field', function() {
                  it('should exist', async function() {
                    const earl = await reporter.generateSingleEarlReport(evaluationReport);
                    expect(Object.keys(earl.graph[0].assertions[0].result.source[0].result)).to.include('outcome');
                  });
                  it('should be of type string', async function() {
                    const earl = await reporter.generateSingleEarlReport(evaluationReport);
                    expect(earl.graph[0].assertions[0].result.source[0].result.outcome).to.be.a('string');
                  });
                  it('should not be empty', async function() {
                    const earl = await reporter.generateSingleEarlReport(evaluationReport);
                    expect(earl.graph[0].assertions[0].result.source[0].result.outcome.trim()).to.not.be.equal('');
                  });
                  it('should be "earl:passed" or "earl:failed" or "earl:inapplicable"', async function() {
                    const earl = await reporter.generateSingleEarlReport(evaluationReport);
                    expect(['earl:passed', 'earl:failed', 'earl:inapplicable']).to.include(earl.graph[0].assertions[0].result.source[0].result.outcome.trim());
                  });
                });
              });
            });
            describe('"description" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].result)).to.include('description');
              });
              it('should be of type string', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['description']).to.be.a('string');
              });
              it('should not be empty', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['description'].trim()).to.not.be.equal('');
              });
            });
            describe('"date" field', function() {
              it('should exist', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(Object.keys(earl.graph[0].assertions[0].result)).to.include('date');
              });
              it('should be of type string', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['date']).to.be.a('string');
              });
              it('should not be empty', async function() {
                const earl = await reporter.generateSingleEarlReport(evaluationReport);
                expect(earl.graph[0].assertions[0].result['date'].trim()).to.not.be.equal('');
              });
            });
          });
        });
      });
    });
  });
});