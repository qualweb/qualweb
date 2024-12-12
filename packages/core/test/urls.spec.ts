import { QualWeb } from '../src';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import { resolve } from 'node:path';

describe('Core input method: file', function () {
  it('Should evaluate normally', async function () {
    this.timeout(0);

    const urlsPath = resolve(__dirname, 'urls.txt');

    const options = {
      urls: readFileSync(urlsPath).toString().split('\r\n').map((url) => url.trim()),
      maxParallelEvaluations: 9,
      // TODO: consider mock/dummy module to help ensure all URLs covered.
      modules: [],
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    expect(Object.keys(reports)).to.have.length(25);
  });
});
