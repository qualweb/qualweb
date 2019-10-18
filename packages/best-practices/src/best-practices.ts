'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP10 from './best-practices/QW-BP10';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP10': new QW_BP10()
};

export {
  bestPractices
};