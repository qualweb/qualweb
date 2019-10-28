'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP2 from './best-practices/QW-BP2';
import QW_BP3 from './best-practices/QW-BP3';
import QW_BP4 from './best-practices/QW-BP4';
import QW_BP5 from './best-practices/QW-BP5';
import QW_BP6 from './best-practices/QW-BP6';
import QW_BP7 from './best-practices/QW-BP7';
import QW_BP8 from './best-practices/QW-BP8';
import QW_BP9 from './best-practices/QW-BP9';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP2': new QW_BP2(),
  'QW-BP3': new QW_BP3(),
  'QW-BP4': new QW_BP4(),
  'QW-BP5': new QW_BP5(),
  'QW-BP6': new QW_BP6(),
  'QW-BP7': new QW_BP7(),
  'QW-BP8': new QW_BP8(),
  'QW-BP9': new QW_BP9(),
};

export {
  bestPractices
};