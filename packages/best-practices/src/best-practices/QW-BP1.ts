'use strict';

import { BestPractice as BestPracticeType } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomElement } from 'htmlparser2';

const bestPractice: BestPracticeType = {

};

class QW_BP1 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined, dom: DomElement[]): Promise<void> {
    
  }
}

export = QW_BP1;