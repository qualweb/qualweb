import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP8', resolve(__dirname, '../fixtures/testcases/BP8/testcases.json'));
