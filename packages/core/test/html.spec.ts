import { QualWeb } from '../dist/index.js';
import { expect } from 'chai';
import { readFileSync } from 'fs';

describe('Core input method: html', function () {
  it('Should evaluate normally', async function () {
    this.timeout(0);

    const options = {
      html: readFileSync('./test/test.html').toString()
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    expect(reports['customHtml']).to.not.be.equal(undefined);
  });
});
