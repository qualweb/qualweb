import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP5', resolve(__dirname, '../fixtures/testcases/BP5/testcases.json'));
