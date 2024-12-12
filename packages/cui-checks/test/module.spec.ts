import { expect } from 'chai';
import { QualWeb } from '@qualweb/core';
import { CUIChecks } from '../src';

describe('Module in core', () => {
  it('Runs an evaluation via @qualweb/core', async function () {
    this.timeout(0);

    const qw = new QualWeb();

    await qw.start({}, {
      // headless: false,
    });

    const cuiCheckInstance = new CUIChecks();

    const urlToEvaluate = 'https://www.google.com';

    const allReports = await qw.evaluate({
      url: urlToEvaluate,
      modules: [cuiCheckInstance],
    });

    await qw.stop();

    const urlReport = allReports[urlToEvaluate];

    // TODO: write a more comprehensive set of assertions.
    expect(urlReport).to.not.be.undefined;
    expect(urlReport.metadata.failed).to.be.greaterThanOrEqual(0);
    expect(urlReport.metadata.inapplicable).to.be.greaterThanOrEqual(0);
    expect(urlReport.metadata.passed).to.be.greaterThanOrEqual(0);
    expect(urlReport.metadata.warning).to.be.greaterThanOrEqual(0);
  });
});