import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP30', resolve(__dirname, '../fixtures/testcases/BP30/testcases.json'));
