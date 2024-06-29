// import { QualWeb } from '../src';
// import { expect } from 'chai';

// import { createKoaServer, koaServerPageCount } from './util';
// import { Server } from 'http';

// describe('Core input method: crawler', function () {
//   // Mock server set up.
//   const mockServerOptions = {
//     childLinksPerPage: 3,
//     maxDepth: 3,
//   };

//   const mockServer = createKoaServer(mockServerOptions);

//   const actualUrlCount = koaServerPageCount(
//     mockServerOptions.childLinksPerPage,
//     mockServerOptions.maxDepth,
//   );

//   let mockHttpServer: Server;
//   let mockHttpServerHost: string;

//   beforeEach(async () => {
//     await new Promise(r => mockHttpServer = mockServer.listen(r));

//     const address = mockHttpServer.address();

//     mockHttpServerHost = typeof(address) === 'string'
//       ? address
//       : `http://localhost:${address!.port}`
//       ;
//   });

//   afterEach(async () => {
//     mockHttpServer.close();
//   });

//   it('Should evaluate all urls', async function () {
//     this.timeout(0);

//     const qualweb = new QualWeb({ adBlock: true, stealth: true });

//     const urls = await qualweb.crawl(mockHttpServerHost, {
//       maxUrls: 1000,
//       logging: true
//     });

//     expect(urls).to.have.length(actualUrlCount);

//     const options = {
//       urls,
//       'wcag-techniques': {
//         exclude: ['QW-WCAG-T16']
//       }
//     };

//     await qualweb.start(
//       { maxConcurrency: 5, monitor: true },
//       { args: ['--no-sandbox', '--ignore-certificate-errors'] }
//     );
//     const reports = await qualweb.evaluate(options);
//     await qualweb.stop();

//     expect(Object.keys(reports)).to.have.length(actualUrlCount);
//   });
// });
