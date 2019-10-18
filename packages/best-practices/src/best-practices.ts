'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP8 from './best-practices/QW-BP8';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP8': new QW_BP8()
};

export {
  bestPractices
};