import { expect } from 'chai';
import { QualWeb, QualwebOptions } from '../src';

describe('Core locale', function () {
  it('Should give a report in en', async function () {
    expect.fail('FIXME: missing dummy module for translation');
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start(undefined, { headless: true, args: ['--ignore-certificate-errors'] });

    const options: QualwebOptions = {
      url: 'http://ciencias.ulisboa.pt',
      translate: 'en',
      modules: [
        // FIXME: add a dummy module to test localization on.
      ],
      // modules: {
      //   'act-rules': {
      //     include: ['QW-ACT-R1']
      //   },
      //   "best-practices": {},
      //   "wcag-techniques": {},
      //   counter: {},
      // }
    };

    const evaluations = await qualweb.evaluate(options);
    console.log(JSON.stringify(evaluations, null, 2));

    await qualweb.stop();

    expect(true);
  });
});
