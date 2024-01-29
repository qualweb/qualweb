import { buildTest } from './template.mjs';

import testcases from '../fixtures/testcases/H42/testcases.json' assert { type: 'json' };

buildTest('QW-BP1', testcases);
