import { QualWeb, QualwebOptions } from '../src';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import DummyModule from './lib/DummyModule';

describe('Core input method: html', function () {
  it('Should run module on custom html', async function () {
    this.timeout(0);

    let wasRun: boolean = false;

    const dummyModule = new DummyModule(undefined, (_page, _options, _translate, data) => {
      wasRun = true;
      return DummyModule.emptyReport();
    });

    const options: QualwebOptions = {
      html: readFileSync('./test/test.html').toString(),
      modules: [dummyModule],
    };

    const qualweb = new QualWeb();

    await qualweb.start();
    const reports = await qualweb.evaluate(options);
    await qualweb.stop();

    // Expect the "customHtml" key to be present in the reports object. This
    // indicates that a report was generated for a page with custom HTML.
    expect(reports['customHtml']).to.not.be.equal(undefined);
    // Expect the wasRun variable to be true. This proves that the module was
    // actually executed on the page.
    expect(wasRun).to.be.equal(true);
  });
});
