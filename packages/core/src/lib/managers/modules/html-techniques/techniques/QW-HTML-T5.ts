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
  name: 'Using alt attributes on images used as submit buttons',
  code: 'QW-HTML-T5',
  mapping: 'H36',
  description: 'This technique checks all input elements that are buttons use alt text',
  metadata: {
    target: {
      element: 'input'
    },
    'success-criteria': [{
      name: '1.1.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content'
    }],
    related: ['G94'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H36',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T5 extends Technique {

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

    const hasAlt = await DomUtils.elementHasAttribute(element, 'alt');
    const alt = await DomUtils.getElementAttribute(element, 'alt');

    if (!hasAlt) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The alt does not exist in the input element';
      evaluation.resultCode = 'RC1';
    } else if (alt && alt.trim() === '') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The alt is empty';
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Please verify that the alt is a valid description of the input image';
      evaluation.resultCode = 'RC3';
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T5;
