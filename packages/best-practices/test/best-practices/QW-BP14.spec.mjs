import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { buildTest } from './template.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// buildTest('QW-BP14', resolve(__dirname, '../fixtures/testcases/BP14/testcases.json'));

describe('QW-BP14', () => {
  it('Rule has no implementation');
});
