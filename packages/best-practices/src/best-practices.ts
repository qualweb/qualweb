'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP7 from './best-practices/QW-BP7';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP7': new QW_BP7()
};

export {
  bestPractices
};