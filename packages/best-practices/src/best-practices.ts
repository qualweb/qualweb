'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP2 from './best-practices/QW-BP2';
import QW_BP3 from './best-practices/QW-BP3';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP2': new QW_BP2(),
  'QW-BP3': new QW_BP3()
};

export {
  bestPractices
};