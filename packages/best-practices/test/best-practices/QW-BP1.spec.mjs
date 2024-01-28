import { buildTest } from './template.mjs';

import allTestcases from '../fixtures/testcases.json' assert { type: 'json' };

const bp1Testcase = allTestcases.testcases['qw-bp1'];

buildTest(bp1Testcase.name, bp1Testcase.testcases);
