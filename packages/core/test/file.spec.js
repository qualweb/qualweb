import { QualWeb } from '../dist/index';
import { expect } from 'chai';

describe('Core input method: file', function() {
  it('Should evaluate all urls', async function() {
    this.timeout(0);

    const options = { 
      file: './test/urls.txt',
      maxParallelEvaluations: 10
    };

    const qualweb = new QualWeb({ stealth: true, adBlock: true });

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();
    
    expect(Object.keys(reports).length).to.be.equal(10);
  });
});