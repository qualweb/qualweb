'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP11 from './best-practices/QW-BP11';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP11': new QW_BP11()
};

export {
  bestPractices
};