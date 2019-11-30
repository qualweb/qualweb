'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  ElementHandle
} from 'puppeteer';

import {
  DomUtils
} from '../../../util/index';

import Technique from './Technique.object';

const technique: HTMLTechnique = {
  name: 'Providing definitions for abbreviations by using the abbr element',
  code: 'QW-HTML-T7',
  mapping: 'H28',
  description: 'The objective of this technique is to provide expansions or definitions for abbreviations by using the abbr element',
  metadata: {
    target: {
      element: 'abbr'
    },
    'success-criteria': [{
      name: '3.1.4',
      level: 'AAA',
      principle: 'Understandable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/abbreviations'
    }],
    related: ['G91', 'H30'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H28',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T7 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: ElementHandle | undefined): Promise < void > {

    if (!element) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const hasTitle = await DomUtils.elementHasAttribute(element, 'title');
    const title = await DomUtils.getElementAttribute(element, 'title');

    if (hasTitle && title && title.trim() !== '') {
      evaluation.verdict = 'passed';
      evaluation.description = `The element abbrv has the definition in the title attribute`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The element abbrv doesn't have the definition in the title attribute`;
      evaluation.resultCode = 'RC2';
    }
    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T7;