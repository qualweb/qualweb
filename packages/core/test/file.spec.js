import { QualWeb } from '../dist/index';
import { expect } from 'chai';

describe('Core input method: file', function() {
  it('Should evaluate all urls', async function() {
    this.timeout(0);

    const options = { 
      file: './test/urls.txt',
      maxParallelEvaluations: 5
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();
    
    expect(Object.keys(reports).length).to.be.equal(25);
  });
});