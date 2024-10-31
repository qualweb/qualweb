import { generateEARLReport } from '@qualweb/earl-reporter';
import { QualWeb } from '../src';
import { expect } from 'chai';
import fetch from 'node-fetch';

describe('Should do parallel evaluations', function () {
  it('Should have correct results', async function () {
    this.timeout(0);

    const response = await fetch('https://act-rules.github.io/testcases.json');
    const testCases = await response.json();
    const rule = '2779a5';
    const tcs = testCases.testcases.filter((tc: any) => tc.ruleId === rule);
    const urls = tcs.map((tc: any) => tc.url);

    const qualweb = new QualWeb();

    await qualweb.start();

    const options = {
      urls,
      // TODO: consider mock/dummy module to help ensure all URLs covered.
      modules: [],
      maxParallelEvaluations: urls.length,
    };

    const evaluations = await qualweb.evaluate(options);
    const earlReport = Object.values(generateEARLReport(evaluations, { aggregated: true, modules: { act: true } }));

    await qualweb.stop();

    let valid = true;
    for (let i = 0; i < tcs.length; i++) {
      try {
        const result = earlReport[0]['@graph'].filter((r) => r.source === tcs[i].url)[0];
        if (
          result.assertions[0].result.outcome !== 'earl:' + tcs[i].expected &&
          result.assertions[0].result.outcome !== 'earl:cantTell'
        ) {
          valid = false;
        }
      } catch (err) {
        valid = false;
        console.error(err);
      }
    }

    if (valid) {
      console.warn('Test validation passed');
    } else {
      console.warn('Test validation failed');
    }
    expect(valid).to.be.true;
  });
});
