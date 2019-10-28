import QW_ACT_R1 from './rules/QW-ACT-R1';
import QW_ACT_R2 from './rules/QW-ACT-R2';
import QW_ACT_R3 from './rules/QW-ACT-R3';
import QW_ACT_R4 from './rules/QW-ACT-R4';
import QW_ACT_R5 from './rules/QW-ACT-R5';
import QW_ACT_R6 from './rules/QW-ACT-R6';
import QW_ACT_R7 from './rules/QW-ACT-R7';
import QW_ACT_R8 from './rules/QW-ACT-R8';

const rules = {
  'QW-ACT-R1': new QW_ACT_R1(),
  'QW-ACT-R2': new QW_ACT_R2(),
  'QW-ACT-R3': new QW_ACT_R3(),
  'QW-ACT-R4': new QW_ACT_R4(),
  'QW-ACT-R5': new QW_ACT_R5(),
  'QW-ACT-R6': new QW_ACT_R6(),
  'QW-ACT-R7': new QW_ACT_R7(),
  'QW-ACT-R8': new QW_ACT_R8()
 
};

const rulesToExecute = {
  'QW-ACT-R1': true,
  'QW-ACT-R2': true,
  'QW-ACT-R3': true,
  'QW-ACT-R4': true,
  'QW-ACT-R5': true,
  'QW-ACT-R6': true,
  'QW-ACT-R7': true,
  'QW-ACT-R8': true
};

export {
  rules,
  rulesToExecute
};
