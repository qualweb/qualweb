const cli = require('../dist/index');
const { expect } = require('chai');

describe('CLI', function() {
  it('should work', async function() {
    this.timeout(10 * 10000);
    
    await cli(['-f', 'test/urls.txt', '-maxParallelEvaluations', '2', '-m', 'act', '-r', 'earl-a']);
  });

  it.only('should evaluate https://www.nav.no/', async function() {
    this.timeout(10 * 10000);
    
    await cli(['-u', 'https://www.nav.no/', '-m', 'act', '-r', 'earl', '-act-rules', 'QW-ACT-R35']);
  });
});