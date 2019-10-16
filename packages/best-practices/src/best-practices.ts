'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP6 from './best-practices/QW-BP6';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP6': new QW_BP6()
};

export {
  bestPractices
};