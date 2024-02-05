import { expect } from 'chai';
import { generateEARLReport } from '../src';

// https://ciencias.ulisboa.pt - 05/08/2019 15:31
import evaluationReport from './fixtures/evaluationreport.json';

describe('EARL report', function () {
  describe('"@context" field', function () {
    it('should exist', function () {
      const earl = generateEARLReport([evaluationReport] as any);
      expect(Object.keys(earl[0])).to.be.an('array').and.to.include('@context');
    });
    it('should not be empty',  function () {
      const earl = generateEARLReport([evaluationReport] as any);
      expect(earl[0]['@context']).to.be.not.equal({});
    });
  });

  describe('"@graph" field', function() {
    it('should exists',  function () {
      const earl = generateEARLReport([evaluationReport] as any);
      expect(Object.keys(earl[0])).to.be.an('array').and.to.include('@graph');
    });
    it('should be of type array',  function () {
      const earl = generateEARLReport([evaluationReport] as any);
      expect(earl[0]['@graph']).to.be.an('array');
    });
    it('should not be empty',  function () {
      const earl = generateEARLReport([evaluationReport] as any);
      expect(earl[0]['@graph'].length).to.be.not.equal(0);
    });
    it('should have only one test subject',  function() {
      const earl = generateEARLReport([evaluationReport] as any);
      expect(earl[0]['@graph'].length).to.be.equal(1);
    });
    describe('"Test subject" field', function() {
      describe('"@type" field', function() {
        it('should exist',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(Object.keys(earl[0]['@graph'][0])).to.be.an('array').and.to.include('@type');
        });
        it('should be of type string',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(earl[0]['@graph'][0]['@type']).to.be.a('string');
        });
        it('should not be empty',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(earl[0]['@graph'][0]['@type'].trim()).to.not.be.equal('');
        });
        it('should be "TestSubject"',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(earl[0]['@graph'][0]['@type'].trim()).to.be.equal('TestSubject');
        });
      });
      describe('"source" field', function() {
        it('should exist',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(Object.keys(earl[0]['@graph'][0])).to.be.an('array').and.to.include('source');
        });
        it('should be of type string',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(earl[0]['@graph'][0]['source']).to.be.a('string');
        });
        it('should not be empty',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(earl[0]['@graph'][0]['source'].trim()).to.not.be.equal('');
        });
      });
      describe('"assertor" field', function() {
        it('should exist',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(Object.keys(earl[0]['@graph'][0])).to.be.an('array').and.to.include('assertor');
        })
        describe('"@id" field', function() {
          it('should exist',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(Object.keys(earl[0]['@graph'][0].assertor)).to.be.an('array').and.to.include('@id');
          });
          it('should be of type string',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['@id']).to.be.a('string');
          });
          it('should not be empty',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['@id'].trim()).to.not.be.equal('');
          });
        });
        describe('"@type" field', function() {
          it('should exist',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(Object.keys(earl[0]['@graph'][0].assertor)).to.be.an('array').and.to.include('@type');
          });
          it('should be of type string',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['@type']).to.be.a('string');
          });
          it('should not be empty',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['@type'].trim()).to.not.be.equal('');
          });
          it('should be "Software"',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['@type'].trim()).to.be.equal('Software');
          });
        });
        describe('"title" field', function() {
          it('should exist',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(Object.keys(earl[0]['@graph'][0].assertor)).to.be.an('array').and.to.include('title');
          });
          it('should be of type string',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['title']).to.be.a('string');
          });
          it('should not be empty',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['title'].trim()).to.not.be.equal('');
          });
        });
        describe('"description" field', function() {
          it('should exist',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(Object.keys(earl[0]['@graph'][0].assertor)).to.be.an('array').and.to.include('description');
          });
          it('should be of type string',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['description']).to.be.a('string');
          });
          it('should not be empty',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['description'].trim()).to.not.be.equal('');
          });
        });
        describe('"hasVersion" field', function() {
          it('should exist',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(Object.keys(earl[0]['@graph'][0].assertor)).to.be.an('array').and.to.include('hasVersion');
          });
          it('should be of type string',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['hasVersion']).to.be.a('string');
          });
          it('should not be empty',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['hasVersion'].trim()).to.not.be.equal('');
          });
        });
        describe('"homepage" field', function() {
          it('should exist',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(Object.keys(earl[0]['@graph'][0].assertor)).to.be.an('array').and.to.include('homepage');
          });
          it('should be of type string',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['homepage']).to.be.a('string');
          });
          it('should not be empty',  function() {
            const earl = generateEARLReport([evaluationReport] as any);
            expect(earl[0]['@graph'][0].assertor['homepage'].trim()).to.not.be.equal('');
          });
        });
      });
      describe('"assertions" field', function() {
        it('should exist',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(Object.keys(earl[0]['@graph'][0])).to.be.an('array').and.to.include('assertions');
        });
        it('should be of type array',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(earl[0]['@graph'][0].assertions).to.be.an('array');
        });
        it('should not be empty',  function() {
          const earl = generateEARLReport([evaluationReport] as any);
          expect(earl[0]['@graph'][0].assertions.length).to.not.be.equal(0);
        });
        it('should have number of assertions equal to the same amount of tests done',  function() {
          const nAssertions = Object.keys(evaluationReport.modules['act-rules'].assertions).length +
            (evaluationReport.modules['wcag-techniques'] ? Object.keys(evaluationReport.modules['wcag-techniques'].assertions).length : 0) +
            (evaluationReport.modules['best-practices'] ? Object.keys(evaluationReport.modules['best-practices'].assertions).length : 0);
          const earl = generateEARLReport([evaluationReport] as any);
          expect(earl[0]['@graph'][0].assertions.length).to.be.equal(nAssertions);
        });
        describe('"assertion" field', function() {
          describe('"@type" field', function() {
            it('should exist',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(Object.keys(earl[0]['@graph'][0].assertions[0])).to.include('@type');
            });
            it('should be of type string',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(earl[0]['@graph'][0].assertions[0]['@type']).to.be.a('string');
            });
            it('should not be empty',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(earl[0]['@graph'][0].assertions[0]['@type'].trim()).to.not.be.equal('');
            });
            it('should be "Assertion"',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(earl[0]['@graph'][0].assertions[0]['@type'].trim()).to.be.equal('Assertion');
            });
          });
          describe('"test" field', function() {
            it('should exist',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(Object.keys(earl[0]['@graph'][0].assertions[0])).to.include('test');
            });
            describe('"@id" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].test)).to.include('@id');
              });
              it('should be of type string',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['@id']).to.be.a('string');
              });
              it('should not be empty',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['@id'].trim()).to.not.be.equal('');
              });
            });
            describe('"@type" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].test)).to.include('@type');
              });
              it('should be of type string',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['@type']).to.be.a('string');
              });
              it('should not be empty',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['@type'].trim()).to.not.be.equal('');
              });
              it('should be "TestCase"',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['@type'].trim()).to.be.equal('TestCase');
              });
            });
            describe('"title" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].test)).to.include('title');
              });
              it('should be of type string',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['title']).to.be.a('string');
              });
              it('should not be empty',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['title'].trim()).to.not.be.equal('');
              });
            });
            describe('"description" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].test)).to.include('description');
              });
              it('should be of type string',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['description']).to.be.a('string');
              });
              it('should not be empty',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].test['description'].trim()).to.not.be.equal('');
              });
            });
          });
          describe('"mode" field', function() {
            it('should exist',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(Object.keys(earl[0]['@graph'][0].assertions[0])).to.include('mode');
            });
            it('should be of type string',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(earl[0]['@graph'][0].assertions[0]['mode']).to.be.a('string');
            });
            it('should not be empty',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(earl[0]['@graph'][0].assertions[0]['mode'].trim()).to.not.be.equal('');
            });
            it('should be "earl:automatic"',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(earl[0]['@graph'][0].assertions[0]['mode'].trim()).to.be.equal('earl:automatic');
            });
          });
          describe('"result" field', function() {
            it('should exist',  function() {
              const earl = generateEARLReport([evaluationReport] as any);
              expect(Object.keys(earl[0]['@graph'][0].assertions[0])).to.include('result');
            });
            describe('"@type" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].result)).to.include('@type');
              });
              it('should be of type string',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['@type']).to.be.a('string');
              });
              it('should not be empty',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['@type'].trim()).to.not.be.equal('');
              });
              it('should be "TestCase"',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['@type'].trim()).to.be.equal('TestResult');
              });
            });
            describe('"outcome" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].result)).to.include('outcome');
              });
              it('should be of type string',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['outcome']).to.be.a('string');
              });
              it('should not be empty',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['outcome'].trim()).to.not.be.equal('');
              });
              it('should be "earl:passed" or "earl:failed" or "earl:inapplicable"',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(['earl:passed', 'earl:failed', 'earl:inapplicable']).to.include(earl[0]['@graph'][0].assertions[0].result['outcome'].trim());
              });
            });
            describe('"source" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].result)).to.include('source');
              });
              describe('"result" field', function() {
                it('should exist',  function() {
                  const earl = generateEARLReport([evaluationReport] as any);
                  expect(Object.keys(earl[0]['@graph'][0].assertions[0].result.source[0])).to.include('result');
                });
                describe('"pointer" field', function() {
                  it('should exist',  function() {
                    const earl = generateEARLReport([evaluationReport] as any);
                    expect(Object.keys(earl[0]['@graph'][0].assertions[0].result.source[0].result)).to.include('pointer');
                  });
                  it('should be of type string',  function() {
                    const earl = generateEARLReport([evaluationReport] as any);
                    expect(earl[0]['@graph'][0].assertions[0].result.source[0].result.pointer).to.be.a('string');
                  });
                  it('should not be empty',  function() {
                    const earl = generateEARLReport([evaluationReport] as any);
                    expect(earl[0]['@graph'][0].assertions[0].result.source[0].result.pointer?.trim()).to.not.be.equal('');
                  });
                });
                describe('"outcome" field', function() {
                  it('should exist',  function() {
                    const earl = generateEARLReport([evaluationReport] as any);
                    expect(Object.keys(earl[0]['@graph'][0].assertions[0].result.source[0].result)).to.include('outcome');
                  });
                  it('should be of type string',  function() {
                    const earl = generateEARLReport([evaluationReport] as any);
                    expect(earl[0]['@graph'][0].assertions[0].result.source[0].result.outcome).to.be.a('string');
                  });
                  it('should not be empty',  function() {
                    const earl = generateEARLReport([evaluationReport] as any);
                    expect(earl[0]['@graph'][0].assertions[0].result.source[0].result.outcome.trim()).to.not.be.equal('');
                  });
                  it('should be "earl:passed" or "earl:failed" or "earl:inapplicable"',  function() {
                    const earl = generateEARLReport([evaluationReport] as any);
                    expect(['earl:passed', 'earl:failed', 'earl:inapplicable']).to.include(earl[0]['@graph'][0].assertions[0].result.source[0].result.outcome.trim());
                  });
                });
              });
            });
            describe('"description" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].result)).to.include('description');
              });
              it('should be of type string',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['description']).to.be.a('string');
              });
              it('should not be empty',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['description'].trim()).to.not.be.equal('');
              });
            });
            describe('"date" field', function() {
              it('should exist',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(Object.keys(earl[0]['@graph'][0].assertions[0].result)).to.include('date');
              });
              it('should be of type string',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['date']).to.be.a('string');
              });
              it('should not be empty',  function() {
                const earl = generateEARLReport([evaluationReport] as any);
                expect(earl[0]['@graph'][0].assertions[0].result['date'].trim()).to.not.be.equal('');
              });
            });
          });
        });
      });
    });
  });
});