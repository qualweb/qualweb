'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import { DomElement } from 'htmlparser2';
import { DomUtils } from '@qualweb/util';

import BestPractice from './BestPractice.object';
const stew = new (require('stew-select')).Stew();

const bestPractice: BestPracticeType = {
  name: 'Using consecutive links with the same href and one contains an image',
  code: 'QW-BP13',
  description: 'Using consecutive links with the same href in which one of the links contains an image',
  metadata: {
    target: {
      element: 'a'
    },
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<BestPracticeResult>()
};

class QW_BP13 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined): Promise<void> {

    if (!element || !element.children) {
      return;
    }

    let list: DomElement[] = [];
    let consecutive = 0;
    let href;
    for (let child of element.children) {
      if (child && child.name === "a" && consecutive > 0 && (DomUtils.getElementAttribute(child, "href") === href)) {
        list.push(child);
        consecutive++;
      }
      if (child && child.name === "a") {
        href = DomUtils.getElementAttribute(child, "href");
        if (href) {
          list.push(child);
          consecutive++;
        }
      } else if (consecutive >= 2) {
        this.doEvaluation(list);
        consecutive = 0;
        list = [];
      } else {
        consecutive = 0;
        list = [];
      }
    }


  }

  private doEvaluation(list: DomElement[]) {
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    let result = list.length;
    let img = [];
    for (let child of list) {
      if (img.length === 0)
        img = stew.select(child, "img");
    }
    if (result > 2 && img.length > 0) {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are no consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC2';
    }


    evaluation.htmlCode = DomUtils.transformElementIntoHtml(list[0]);
    evaluation.pointer = DomUtils.getElementSelector(list[0]);

    super.addEvaluationResult(evaluation);

  }
}

export = QW_BP13;