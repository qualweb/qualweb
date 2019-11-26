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
} from '../../../index/util';

import Technique from './Technique.object';

const technique: HTMLTechnique = {
  name: 'Using the summary attribute of the table element to give an overview of data tables',
  code: 'QW-HTML-T4',
  mapping: 'H73',
  description: 'This technique checks the correct use of the summary attribute for table elements',
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
    related: ['H39', 'H51', 'F46'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H73',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};


class QW_HTML_T4 extends Technique {

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

    const caption = await DomUtils.getElementChildTextContent(element, 'caption');
    const hasSummary = await DomUtils.elementHasAttribute(element, 'summary');
    const summary = await DomUtils.getElementAttribute(element, 'summary');

    if (!hasSummary) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The summary does not exist in the table element';
      evaluation.resultCode = 'RC1';
    } else if (summary && summary.trim() === '') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The summary is empty';
      evaluation.resultCode = 'RC2';
    } else if (caption && summary.trim() === caption.trim()) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The caption is a duplicate of the summary';
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Please verify that the summary is a valid description of the table';
      evaluation.resultCode = 'RC4';
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T4;
