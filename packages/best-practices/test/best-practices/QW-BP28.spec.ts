import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP28', resolve(__dirname, '../fixtures/testcases/BP28/testcases.json'));
