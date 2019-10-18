const cli = require('../dist/index');
const { expect } = require('chai');

describe('CLI', function() {
  it('should work', async function() {
    this.timeout(10 * 10000);
    
    await cli(['-c', 'https://lodash.com']);
  });
});