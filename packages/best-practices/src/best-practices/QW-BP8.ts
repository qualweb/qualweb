'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomUtils as QWDomUtils, AccessibilityTreeUtils } from '@qualweb/util';
import { trim } from 'lodash';
import {ElementHandle, Page} from "puppeteer";

const bestPractice: BestPracticeType = {
  name: 'Headings with images should have an accessible name',
  code: 'QW-BP8',
  description: 'Headings with at least one image should have an accessible name',
  metadata: {
    target: {
      element: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      children: 'img'
    },
    related: ['G130'],
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


  async execute(element: ElementHandle | undefined,page:Page): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const images = await element.$$( 'img');
    const svgs = await element.$$( 'svg');
    let svgANames: string[] = [];


    if (images.length === 0 && svgs.length === 0) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `This heading doesn't have images`;
      evaluation.resultCode = 'RC1';
    } else {
      for (let svg of svgs) {
        let aName = await AccessibilityTreeUtils.getAccessibleNameSVG(svg,page);
        if (aName && trim(aName) !== "")
          svgANames.push(aName)
      }

      let aName = await AccessibilityTreeUtils.getAccessibleName(element,page);
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
