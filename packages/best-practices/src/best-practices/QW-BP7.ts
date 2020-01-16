'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';

class QW_BP7 extends BestPractice {

  constructor() {
    super({
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
    });
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const titleValue = await DomUtils.getElementText(element);
    const regExConsecutiveSymbols = new RegExp('[,\\-;!?\'][,\\-;!?\']');
    const regExAllowedSymbols = new RegExp('^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\\-;!?\' ]*$');
    const regExConsecutiveDots = new RegExp('^[^.]*(\\.{2}(\\.{2,})?)[^.]*$');
    const regExConsecutiveSpaces = new RegExp('[ ][ ]');

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
    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP7;
