'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { AccessibilityUtils } from '@qualweb/util';
import { ElementHandle, Page } from 'puppeteer';
import { BestPractice, ElementExists, ElementHasChild } from '../lib/decorator';

@BestPractice
class QW_BP8 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasChild('img, svg')
  async execute(element: ElementHandle, page: Page): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const svgs = await element.$$('svg');
    const svgANames = new Array<string>();

    for (const svg of svgs || []) {
      const aName = await AccessibilityUtils.getAccessibleNameSVG(svg, page);
      if (aName && aName.trim() !== '') {
        svgANames.push(aName);
      }
    }

    const aName = await AccessibilityUtils.getAccessibleName(element, page);
    if (aName || svgANames.length > 0) {
      evaluation.verdict = 'passed';
      evaluation.description = `This heading with at least one image has an accessible name`;
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `This heading with at least one image does not have an accessible name`;
      evaluation.resultCode = 'RC3';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP8;
