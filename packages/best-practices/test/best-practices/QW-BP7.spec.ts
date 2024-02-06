import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { buildTest } from './template.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

buildTest('QW-BP7', resolve(__dirname, '../fixtures/testcases/BP7/testcases.json'));
