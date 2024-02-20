import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP19', resolve(__dirname, '../fixtures/testcases/BP19/testcases.json'));
