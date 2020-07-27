import cli from '../dist/index';
import { expect } from 'chai';
import { exec } from 'child_process';

describe('CLI', function() {
  it('Print options', async function() {
    cli();
  });
});
