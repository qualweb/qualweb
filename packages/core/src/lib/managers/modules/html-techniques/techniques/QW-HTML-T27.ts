'use strict';

import _ from 'lodash';
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
  name: 'Providing descriptive headings',
  code: 'QW-HTML-T27',
  mapping: 'G130',
  description: 'The objective of this technique is to make section headings within Web content descriptive',
  metadata: {
    target: {
      element: 'h1, h2, h3, h4, h5, h6'
    },
    'success-criteria': [{
      name: '2.4.6',
      level: 'AA',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels'
    }],
    related: [],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G130',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T27 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined): Promise < void > {

    if (!element) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };


    evaluation.verdict = 'warning';
    evaluation.description = 'Check that each heading identifies its section of the content';
    evaluation.resultCode = 'RC1';

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);
    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T27;