import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP15', resolve(__dirname, '../fixtures/testcases/BP15/testcases.json'));
