'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP9 from './best-practices/QW-BP9';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP9': new QW_BP9()
};

export {
  bestPractices
};