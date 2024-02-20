import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP9', resolve(__dirname, '../fixtures/testcases/BP9/testcases.json'));
