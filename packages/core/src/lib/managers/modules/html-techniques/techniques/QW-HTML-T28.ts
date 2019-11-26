'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  DomElement
} from 'htmlparser2';

import {
  DomUtils
} from '@qualweb/util';

import Technique from './Technique.object';
const stew = new(require('stew-select')).Stew();

const technique: HTMLTechnique = {
  name: 'Using ol, ul and dl for lists or groups of links',
  code: 'QW-HTML-T28',
  mapping: 'H48',
  description: 'The objective of this technique is to create lists of related items using list elements appropriate for their purposes',
  metadata: {
    target: {
      element: ['li', 'dd', 'dt']
    },
    'success-criteria': [{
      name: '1.3.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
    }],
    related: ['H40'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H48',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T28 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined): Promise < void > {

    if (element === undefined || !element.parent) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const hasLi = stew.select(element, 'li').length !== 0;
    const hasDd = stew.select(element, 'dd').length !== 0;
    const hasDt = stew.select(element, 'dt').length !== 0;

    if (hasLi && element.name === 'ul') { // fails if the element doesn't contain an alt attribute
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that content that has the visual appearance of a list (with or without bullets) is marked as an unordered list';
      evaluation.resultCode = 'RC1';
    } else if (hasLi && element.name === 'ol') {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that content that has the visual appearance of a numbered list is marked as an ordered list.';
      evaluation.resultCode = 'RC2';
    } else if (element.name === 'dl' && (hasDt || hasDd)) {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that content is marked as a definition list when terms and their definitions are presented in the form of a list.';
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `A list item is not contained in a correct list element`;
      evaluation.resultCode = 'RC4';
    }

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T28;