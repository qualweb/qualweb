import * as QW_ACT_R1 from './rules/QW-ACT-R1';
import * as QW_ACT_R2 from './rules/QW-ACT-R2';
import * as QW_ACT_R3 from './rules/QW-ACT-R3';
import * as QW_ACT_R4 from './rules/QW-ACT-R4';
import * as QW_ACT_R5 from './rules/QW-ACT-R5';

const rules = {
  'QW-ACT-R1': QW_ACT_R1,
  'QW-ACT-R2': QW_ACT_R2,
  'QW-ACT-R3': QW_ACT_R3,
  'QW-ACT-R4': QW_ACT_R4,
  'QW-ACT-R5': QW_ACT_R5
};

const rulesToExecute = {
  'QW-ACT-R1': true,
  'QW-ACT-R2': true,
  'QW-ACT-R3': true,
  'QW-ACT-R4': true,
  'QW-ACT-R5': true
};

export {
  rules,
  rulesToExecute
};