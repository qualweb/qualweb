const cli = require('../dist/index');
const { expect } = require('chai');

describe('CLI', function() {
  it('should work', async function() {
    this.timeout(10 * 10000);
   await cli(['-u','  https://www.accessibility.nl/wai-tools/validation-test-sites/cimot-melden/ ','-r', 'earl-a','-m','act','-act-rules','9eb3f6'])
  });
});
