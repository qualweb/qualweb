import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP10', resolve(__dirname, '../fixtures/testcases/BP10/testcases.json'));
