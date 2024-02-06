import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP23', resolve(__dirname, '../fixtures/testcases/BP23/testcases.json'));
