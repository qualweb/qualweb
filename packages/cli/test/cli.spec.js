const cli = require('../dist/index');
const { expect } = require('chai');

describe('CLI', function() {
  it('should work', async function() {
    this.timeout(20 * 100000000000000);
   //await cli(['-u','  https://www.accessibility.nl/wai-tools/validation-test-sites/cimot-melden/ ','-r', 'earl-a','-m','act','-act-rules','9eb3f6'])
      await cli(['-u','https://www.publico.pt/','-r', 'earl-a','-m','act'])
  });
});
