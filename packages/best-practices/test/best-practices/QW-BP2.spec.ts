import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP2', resolve(__dirname, '../fixtures/testcases/BP2/testcases.json'));
