import { QualWeb } from '../dist/index';
import { expect } from 'chai';
import path from 'path';

describe('Core input method: file', function() {
  it('Should evaluate all urls', async function() {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: true, stealth: true });

    const options = { 
      file: path.resolve(__dirname, 'urls.txt'),
      'wcag-techniques': {
        exclude: ['QW-WCAG-T16']
      }
    };

    await qualweb.start({ maxConcurrency: 5, monitor: true }, { args: ['--no-sandbox', '--ignore-certificate-errors']});
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();
    
    expect(Object.keys(reports).length).to.be.equal(25);
  });
});