import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP24', resolve(__dirname, '../fixtures/testcases/BP24/testcases.json'));
