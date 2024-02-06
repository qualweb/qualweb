import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP29', resolve(__dirname, '../fixtures/testcases/BP29/testcases.json'));
