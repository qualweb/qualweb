'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP2 from './best-practices/QW-BP2';
import QW_BP3 from './best-practices/QW-BP3';
import QW_BP4 from './best-practices/QW-BP4';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP2': new QW_BP2(),
  'QW-BP3': new QW_BP3(),
  'QW-BP4': new QW_BP4()
};

export {
  bestPractices
};