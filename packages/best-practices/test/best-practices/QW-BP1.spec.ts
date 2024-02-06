import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP1', resolve(__dirname, '../fixtures/testcases/H42/testcases.json'));
