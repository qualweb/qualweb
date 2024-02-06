import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP7', resolve(__dirname, '../fixtures/testcases/BP7/testcases.json'));
