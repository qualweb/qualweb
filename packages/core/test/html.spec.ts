import { QualWeb } from '../src';
import { expect } from 'chai';
import { readFileSync } from 'fs';

describe('Core input method: html', function () {
  it('Should evaluate normally', async function () {
    this.timeout(0);

    const options = {
      html: readFileSync('./test/test.html').toString(),
      // TODO: consider mock/dummy module to help ensure all URLs covered.
      modules: [],
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    expect(reports['customHtml']).to.not.be.equal(undefined);
  });
});
