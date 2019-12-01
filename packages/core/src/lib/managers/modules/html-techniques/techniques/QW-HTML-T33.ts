'use strict';

import {trim} from "lodash";

import {
  ElementHandle
} from 'puppeteer';

import {
  DomUtils,AccessibilityTreeUtils
} from '../../../util/index';

import Technique from './Technique.object';
import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';


const technique: HTMLTechnique = {
  name: 'Providing submit buttons',
  code: 'QW-HTML-T33',
  mapping: 'H33',
  description: 'Supplementing link text with the title attribute',
  metadata: {
    target: {
      element: 'a'
    },
    'success-criteria': [{
      name: '2.4.4',
      level: 'A',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context'
    }, {
      name: '2.4.9',
      level: 'AAA',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only'
    }],
    related: ['C7', 'H30'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H33',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<HTMLTechniqueResult>()
};

class QW_HTML_T33 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: ElementHandle | undefined): Promise < void > {
    if (element === undefined||!(await DomUtils.elementHasAttributes(element))) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    let trimTitle;
    let title =await DomUtils.getElementAttribute(element, 'title');
    if (title)
      trimTitle = trim(title);
    let text = await AccessibilityTreeUtils.getTrimmedText(element);

    if (!trimTitle || trimTitle === "") {
      evaluation.verdict = 'failed';
      evaluation.description = `The element's title attribute is empty`;
      evaluation.resultCode = 'RC1';
    } else if (text && trimTitle === text) {
      evaluation.verdict = 'failed';
      evaluation.description = `The element contains a title attribute equal to the text in the link`;
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = `Please verify that the element's title attribute describes correctly the link`;
      evaluation.resultCode = 'RC3';
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);


    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T33;
