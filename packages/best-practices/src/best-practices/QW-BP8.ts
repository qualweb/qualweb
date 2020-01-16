'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomUtils, AccessibilityTreeUtils } from '@qualweb/util';
import {ElementHandle, Page} from "puppeteer";

class QW_BP8 extends BestPractice {

  constructor() {
    super({
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
    });
  }


  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const images = await element.$$('img');
    const svgs = await element.$$('svg');
    const svgANames = new Array<string>();


    if (images.length + svgs.length === 0) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `This heading doesn't have images`;
      evaluation.resultCode = 'RC1';
    } else {
      for (const svg of svgs || []) {
        const aName = await AccessibilityTreeUtils.getAccessibleNameSVG(svg, page);
        if (aName && aName.trim() !== '') {
          svgANames.push(aName)
        }
      }

      const aName = await AccessibilityTreeUtils.getAccessibleName(element, page);
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

    evaluation.htmlCode = DomUtils.getElementHtmlCode(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP8;
