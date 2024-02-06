import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP21', resolve(__dirname, '../fixtures/testcases/BP21/testcases.json'));
