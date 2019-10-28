import QW_ACT_R1 from './rules/QW-ACT-R1';
import QW_ACT_R2 from './rules/QW-ACT-R2';
import QW_ACT_R3 from './rules/QW-ACT-R3';
import QW_ACT_R4 from './rules/QW-ACT-R4';
import QW_ACT_R5 from './rules/QW-ACT-R5';
import QW_ACT_R6 from './rules/QW-ACT-R6';
import QW_ACT_R7 from './rules/QW-ACT-R7';
import QW_ACT_R8 from './rules/QW-ACT-R8';
import QW_ACT_R9 from './rules/QW-ACT-R9';
import QW_ACT_R10 from './rules/QW-ACT-R10';
import QW_ACT_R11 from './rules/QW-ACT-R11';
import QW_ACT_R12 from './rules/QW-ACT-R12';
import QW_ACT_R13 from './rules/QW-ACT-R13';
import QW_ACT_R14 from './rules/QW-ACT-R14';
import QW_ACT_R18 from './rules/QW-ACT-R18';

const rules = {
  'QW-ACT-R1': new QW_ACT_R1(),
  'QW-ACT-R2': new QW_ACT_R2(),
  'QW-ACT-R3': new QW_ACT_R3(),
  'QW-ACT-R4': new QW_ACT_R4(),
  'QW-ACT-R5': new QW_ACT_R5(),
  'QW-ACT-R6': new QW_ACT_R6(),
  'QW-ACT-R7': new QW_ACT_R7(),
  'QW-ACT-R8': new QW_ACT_R8(),
  'QW-ACT-R9': new QW_ACT_R9(),
  'QW-ACT-R10': new QW_ACT_R10(),
  'QW-ACT-R11': new QW_ACT_R11(),
  'QW-ACT-R12': new QW_ACT_R12(),
  'QW-ACT-R13': new QW_ACT_R13(),
  'QW-ACT-R14': new QW_ACT_R14(),
  'QW-ACT-R18': new QW_ACT_R18()
};

const rulesToExecute = {
  'QW-ACT-R1': true,
  'QW-ACT-R2': true,
  'QW-ACT-R3': true,
  'QW-ACT-R4': true,
  'QW-ACT-R5': true,
  'QW-ACT-R6': true,
  'QW-ACT-R7': true,
  'QW-ACT-R8': true,
  'QW-ACT-R9': true,
  'QW-ACT-R10': true,
  'QW-ACT-R11': true,
  'QW-ACT-R12': true,
  'QW-ACT-R13': true,
  'QW-ACT-R14': true,
  'QW-ACT-R18': true
};

export {
  rules,
  rulesToExecute
};
