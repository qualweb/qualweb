import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP25', resolve(__dirname, '../fixtures/testcases/BP25/testcases.json'));
