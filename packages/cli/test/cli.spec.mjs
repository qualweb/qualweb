import cli from '../dist/index.js';

describe('CLI', function () {
  it('Print options', async function () {
    await cli();
  });
});
