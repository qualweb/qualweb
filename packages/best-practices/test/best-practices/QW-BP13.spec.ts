import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP13', resolve(__dirname, '../fixtures/testcases/BP13/testcases.json'));
