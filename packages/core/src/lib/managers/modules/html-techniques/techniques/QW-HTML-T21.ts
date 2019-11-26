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

const technique: HTMLTechnique = {
  name: 'Using semantic elements to mark up structure',
  code: 'QW-HTML-T21',
  mapping: 'G115',
  description: 'This technique checks that no elements are being used to control the visual text presentation',
  metadata: {
    target: {
      element: ['b', 'basefont', 'font', 'i', 's', 'strike', 'u']
    },
    'success-criteria': [{
      name: '1.3.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
    }],
    related: ['H39', 'H42', 'H44', 'H48', 'H49', 'H51', 'H71'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G115',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T21 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined): Promise < void > {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'passed';
      evaluation.description = `The webpage doesn't use elements to control the visual text presentation`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The webpage uses the element ${element.name} to control the visual text presentation`;
      evaluation.resultCode = 'RC2';

      evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
      evaluation.pointer = DomUtils.getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T21;