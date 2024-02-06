import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP11', resolve(__dirname, '../fixtures/testcases/BP11/testcases.json'));
