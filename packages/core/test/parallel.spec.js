const core = require('../dist/index');
const { expect } = require('chai');
const fetch = require('node-fetch');

describe('Should do parallel evaluations', function() {
  it('should have correct results', async function() {
    this.timeout(1000 * 1000);
    
    const response = await fetch('https://act-rules.github.io/testcases.json')
    const testCases = await response.json();
    const rule = '2779a5';
    const tcs = testCases.testcases.filter(tc => tc.ruleId === rule);
    const urls = tcs.map(tc => tc.url);

    await core.start();
    
    const options = {
      urls,
      execute: {
        act: true
      },
      'act-rules': {
        rules: [rule]
      },
      maxParallelEvaluations: urls.length
    };
    
    await core.evaluate(options);
    const earlReport = Object.values(await core.generateEarlReport({ aggregated: true, modules: { act: true }}));
    
    await core.stop();

    let valid = true;
    for (let i = 0 ; i < tcs.length ; i++) {
      try {
        const result = earlReport[0]['@graph'].filter(r => r.source === tcs[i].url)[0];
        //console.warn(result.source + '   ' + tcs[i].url);
        //console.warn(result.assertions[0].result.outcome + '   earl:' + tcs[i].expected);
        //console.log(result)
        if (result.assertions[0].result.outcome !== 'earl:' + tcs[i].expected) {
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