import { QualWeb } from '../dist/index.js';
import { expect } from 'chai';
import path from 'path';

describe('Core input method: file', function () {
  it('Should evaluate all urls', async function () {
    this.timeout(0);

    const qualweb = new QualWeb({ adBlock: false, stealth: false });

    const options = {
      file: '/home/node/workspace/qualweb/core/test/urls.txt',
      'wcag-techniques': {
        exclude: ['QW-WCAG-T16']
      }
    };

    await qualweb.start(
      { maxConcurrency: 8, monitor: true },
      { args: ['--no-sandbox', '--ignore-certificate-errors'] }
    );
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    expect(Object.keys(reports).length).to.be.equal(26);
  });
});
