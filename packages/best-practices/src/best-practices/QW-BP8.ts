'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomElement } from 'htmlparser2';
import { DomUtils as QWDomUtils, AccessibilityTreeUtils } from '@qualweb/util';
const stew = new (require('stew-select')).Stew();
import { trim } from 'lodash';

const bestPractice: BestPracticeType = {
  name: 'Headings with images should have an accessible name',
  code: 'QW-BP10',
  description: 'Headings with at least one image should have an accessible name',
  metadata: {
    target: {
      element: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      children: 'img'
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

class QW_BP8 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined, dom: DomElement[], url: string): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const images = stew.select(element, 'img');
    const svgs = stew.select(element, 'svg');
    let svgANames: string[] = [];


    if (images.length === 0 && svgs.length === 0) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `This heading doesn't have images`;
      evaluation.resultCode = 'RC1';
    } else {
      for (let svg of svgs) {
        let aName = await AccessibilityTreeUtils.getAcessibleNameSVG(url, QWDomUtils.getElementSelector(svg));
        if (aName && trim(aName) !== "")
          svgANames.push(aName)
      }

      let aName = AccessibilityTreeUtils.getAccessibleName(element);
      if (aName !== '' && aName !== undefined ||svgANames.length>0) {
        evaluation.verdict = 'passed';
        evaluation.description = `This heading with at least one image has an accessible name`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `This heading with at least one image does not have an accessible name`;
        evaluation.resultCode = 'RC3';
      }
    }

    evaluation.htmlCode = QWDomUtils.transformElementIntoHtml(element);
    evaluation.pointer = QWDomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP8;
