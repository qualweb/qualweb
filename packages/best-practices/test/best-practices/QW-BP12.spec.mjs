import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { buildTest } from './template.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

buildTest('QW-BP12', resolve(__dirname, '../fixtures/testcases/BP12/testcases.json'));
