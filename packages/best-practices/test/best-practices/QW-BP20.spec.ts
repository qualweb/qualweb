import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP20', resolve(__dirname, '../fixtures/testcases/BP20/testcases.json'));
