'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomElement, DomUtils } from 'htmlparser2';
import { DomUtils as QWDomUtils } from '@qualweb/util';
const stew = new(require('stew-select')).Stew();

const bestPractice: BestPracticeType = {
  name: 'Images as content only inside headers',
  code: 'QW-BP1',
  mapping: 'H42',
  description: 'Header with an image without an alt text attribute as the only content',
  metadata: {
    target: {
      element: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      children: 'img'
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

class QW_BP8 extends BestPractice {

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

    const images = stew.select(element, 'img');

    if (images.length === 0) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `This header doesn't have images`;
      evaluation.resultCode = 'RC1';
    } else {
      const headerText = DomUtils.getText(element);

      if (headerText.trim() !== '') {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `This header has an image, but also a text to describe it`;
        evaluation.resultCode = 'RC2';
      } else {
        let hasAltTextValue = false;
        for (const img of images || []) {
          const altText = QWDomUtils.getElementAttribute(img, 'alt');
          if (altText.trim() !== '') {
            hasAltTextValue = true;
            break;
          }
        }

        if (hasAltTextValue) {
          evaluation.verdict = 'passed';
          evaluation.description = `This header has only an image, and the image has an alt text to describe it`;
          evaluation.resultCode = 'RC3';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `This header has only an image, and the image doesn't have an alt text to describe it`;
          evaluation.resultCode = 'RC4';
        }
      }
    }
    
    evaluation.htmlCode = QWDomUtils.transformElementIntoHtml(element);
    evaluation.pointer = QWDomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP8;