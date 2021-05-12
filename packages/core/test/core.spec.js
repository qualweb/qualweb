import { QualWeb, generateEARLReport } from '../dist/index';
import { expect } from 'chai';

describe('Core', function () {
  it('Should evaluate one url', async function () {
    this.timeout(0);

    const qualweb = new QualWeb();

    await qualweb.start({ headless: true, args: ['--ignore-certificate-errors'] });

    const evaluations = await qualweb.evaluate({ url: 'http://www.cm-gaviao.pt/pt/turismo/museus/100-turismo/museus/324-museu-do-sabao', execute: { wcag: true }, "wcag-techniques": { exclude: ['QW-WCAG-T16'] } });
    console.log(evaluations)
    const earlReports = generateEARLReport(evaluations);

    await qualweb.stop();

    expect(earlReports['http://www.cm-gaviao.pt/pt/turismo/museus/100-turismo/museus/324-museu-do-sabao']['@graph'].length).to.be.equal(1);
  });
});
