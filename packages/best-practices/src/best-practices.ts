'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP5 from './best-practices/QW-BP5';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP5': new QW_BP5()
};

export {
  bestPractices
};