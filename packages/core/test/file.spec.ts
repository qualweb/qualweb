// import { QualWeb } from '../src';
// import { expect } from 'chai';
// import path from 'path';

// describe('Core input method: file', function () {
//   it('Should evaluate all urls', async function () {
//     this.timeout(0);

//     const qualweb = new QualWeb({ adBlock: false, stealth: false });

//     const urlFilePath = path.resolve(__dirname, 'urls.txt');

//     const options = {
//       file: urlFilePath,
//       'wcag-techniques': {
//         exclude: ['QW-WCAG-T16']
//       }
//     };

//     await qualweb.start(
//       { maxConcurrency: 8, monitor: true },
//       { args: ['--no-sandbox', '--ignore-certificate-errors'] }
//     );
//     const reports = await qualweb.evaluate(options);
//     await qualweb.stop();

//     expect(Object.keys(reports)).to.have.length(25);
//   });
// });
