'use strict';

import {BestPractice as BestPracticeType, BestPracticeResult} from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import {DomElement, DomUtils} from 'htmlparser2';
import {DomUtils as QWDomUtils} from '@qualweb/util';

const bestPractice: BestPracticeType = {
  name: 'Title element contains ASCII-art',
  code: 'QW-BP7',
  description: 'Title element contains ASCII-art',
  metadata: {
    target: {
      element: 'title'
    },
    related: [],
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<BestPracticeResult>()
};

class QW_BP7 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const titleValue = DomUtils.getText(element);
    let regExConsecutiveSymbols = new RegExp('[,\\-;!?\'][,\\-;!?\']');
    let regExAllowedSymbols = new RegExp('^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\\-;!?\' ]*$');
    let regExConsecutiveDots = new RegExp('^[^.]*(\\.{2}(\\.{2,})?)[^.]*$');
    let regExConsecutiveSpaces = new RegExp('[ ][ ]');

    if (!regExAllowedSymbols.test(titleValue)) {
      evaluation.verdict = 'failed';
      evaluation.description = `The title element contains other symbols than .,;-!?`;
      evaluation.resultCode = `RC1`;
    } else {
      if (regExConsecutiveDots.test(titleValue) || regExConsecutiveSymbols.test(titleValue) || regExConsecutiveSpaces.test(titleValue)) {
        evaluation.verdict = 'failed';
        evaluation.description = `The title element contains ASCII art`;
        evaluation.resultCode = `RC2`;
      } else {
        evaluation.verdict = 'passed';
        evaluation.description = `The title element doesn't contain ASCII art`;
        evaluation.resultCode = `RC3`;
      }
    }
    evaluation.htmlCode = QWDomUtils.transformElementIntoHtml(element);
    evaluation.pointer = QWDomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP7;
