'use strict';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP4 from './best-practices/QW-BP4';

const bestPractices = {
  'QW-BP1': new QW_BP1(),
  'QW-BP4': new QW_BP4()
};

export {
  bestPractices
};