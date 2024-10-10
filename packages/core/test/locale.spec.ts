import { expect } from 'chai';
import type { QualwebOptions } from '@qualweb/common';
import { QualWeb } from '../src';

describe('Core locale', function () {
  it('Should give a report in en', async function () {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start(undefined, { headless: true, args: ['--ignore-certificate-errors'] });

    const options: QualwebOptions = {
      url: 'http://ciencias.ulisboa.pt',
      translate: 'en',
      modulesToExecute: {
        "act-rules": true,
        "best-practices": false,
        "wcag-techniques": false,
        counter: false,
      },
      modules: {
        'act-rules': {
          include: ['QW-ACT-R1']
        },
        "best-practices": {},
        "wcag-techniques": {},
        counter: {},
      }
    };

    const evaluations = await qualweb.evaluate(options);
    console.log(JSON.stringify(evaluations, null, 2));

    await qualweb.stop();

    expect(true);
  });
});
