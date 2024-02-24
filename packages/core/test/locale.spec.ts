import { QualwebOptions } from '@qualweb/core';
import { QualWeb } from '../src';
import { expect } from 'chai';

describe('Core locale', function () {
  it('Should give a report in en', async function () {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start(undefined, { headless: 'new', args: ['--ignore-certificate-errors'] });

    const options: QualwebOptions = {
      url: 'http://ciencias.ulisboa.pt',
      translate: 'en',
      execute: {
        act: true
      },
      'act-rules': {
        rules: ['QW-ACT-R1']
      }
    };

    const evaluations = await qualweb.evaluate(options);
    console.log(JSON.stringify(evaluations, null, 2));

    await qualweb.stop();

    expect(true);
  });
});
