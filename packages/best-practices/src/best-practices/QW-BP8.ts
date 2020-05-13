'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { AccessibilityUtils } from '@qualweb/util';
import { BestPractice, ElementExists, ElementHasChild } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@BestPractice
class QW_BP8 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasChild('img, svg')
  execute(element: QWElement | undefined, page: QWPage): void{

    if (!element) {
      return;
    }

   const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const images = element.getElements('img');
    const svgs = element.getElements('svg');
    const svgANames = new Array<string>();


    if (images.length + svgs.length === 0) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `This heading doesn't have images`;
      evaluation.resultCode = 'RC1';
    } else {
      for (const svg of svgs || []) {
        const aName = AccessibilityUtils.getAccessibleNameSVG(svg, page);
        if (aName && aName.trim() !== '') {
          svgANames.push(aName)
        }
      }

      const aName = AccessibilityUtils.getAccessibleName(element, page);
      if (aName || svgANames.length > 0) {
        evaluation.verdict = 'passed';
        evaluation.description = `This heading with at least one image has an accessible name`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `This heading with at least one image does not have an accessible name`;
        evaluation.resultCode = 'RC3';
      }
    }

    evaluation.htmlCode = element.getElementHtmlCode( true, true);
    evaluation.pointer =element.getElementSelector();

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP8;
