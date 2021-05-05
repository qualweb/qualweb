import { QualWeb } from '../dist/index';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start({ headless: true, args: ['--ignore-certificate-errors'] });

    const options = { 
      url: 'http://ciencias.ulisboa.pt',
      translate: 'pt',
      execute: { 
        act: true 
      }, 
      "act-rules": { 
        rules: ['QW-ACT-R1', 'QW-ACT-R2'] 
      } 
    };

    const evaluations = await qualweb.evaluate(options);
    console.log(JSON.stringify(evaluations, null, 2))

    await qualweb.stop();

    expect(true);
  });
});
