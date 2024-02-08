import { QualWeb } from '../dist/index.js';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import { resolve } from 'node:path';

describe('Core input method: file', function () {
  it('Should evaluate normally', async function () {
    this.timeout(0);

    const urlsPath = resolve(__dirname, 'urls.txt');

    const options = {
      urls: readFileSync(urlsPath).toString().split('\n'),
      maxParallelEvaluations: 9
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    expect(Object.keys(reports)).to.have.length(23);
  });
});
