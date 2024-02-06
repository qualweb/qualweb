import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { buildTest } from './template.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// buildTest('QW-BP3', resolve(__dirname, '../fixtures/testcases/BP3/testcases.json'));

describe('QW-BP3', () => {
  it('Rule has no implementation');
});
