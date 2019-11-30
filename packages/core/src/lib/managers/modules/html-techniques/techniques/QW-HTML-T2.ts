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

import Technique from "./Technique.object";

const technique: HTMLTechnique = {
  name: 'Using caption elements to associate data table captions with data tables',
  code: 'QW-HTML-T2',
  mapping: 'H39',
  description: 'This technique checks the caption element is correctly use on tables',
  metadata: {
    target: {
      element: 'table'
    },
    'success-criteria': [{
      name: '1.3.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
    }],
    related: ['H51', 'H73', 'F46'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H39',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: '',
  },
  results: new Array < HTMLTechniqueResult > ()
};
class QW_HTML_T2 extends Technique {

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

    const hasChild = await DomUtils.elementHasChild(element, 'caption');
    const childText = await DomUtils.getElementChildTextContent(element, 'caption');

    if (!hasChild) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The caption does not exist in the table element';
      evaluation.resultCode = 'RC1';
    } else if (childText && childText.trim() === '') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The caption is empty';
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Please verify that the caption element identifies the table correctly.';
      evaluation.resultCode = 'RC3';
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T2;