import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP4', resolve(__dirname, '../fixtures/testcases/BP4/testcases.json'));
