import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP6', resolve(__dirname, '../fixtures/testcases/BP6/testcases.json'));
