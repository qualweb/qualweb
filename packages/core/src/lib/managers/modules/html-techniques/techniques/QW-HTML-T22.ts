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
  name: 'Separating information and structure from presentation to enable different presentations',
  code: 'QW-HTML-T22',
  mapping: 'G140',
  description: 'This technique checks that no attributes are being used to control the visual text presentation',
  metadata: {
    target: {
      attributes: ['text', 'vlink', 'alink', 'link']
    },
    'success-criteria': [{
        name: '1.3.1',
        level: 'A',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
      },
      {
        name: '1.4.5',
        level: 'AA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text'
      },
      {
        name: '1.4.9',
        level: 'AAA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text-no-exception'
      }
    ],
    related: ['C29'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G140',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T22 extends Technique {

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
      evaluation.description = `The webpage doesn't use attributes to control the visual text presentation`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The webpage uses attributes in ${element.name} element to control the visual text presentation`;
      evaluation.resultCode = 'RC2';

      evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
      evaluation.pointer = DomUtils.getElementSelector(element);
      evaluation.attributes = element.attribs ? _.intersection(Object.keys(element.attribs), ['text', 'vlink', 'alink', 'link']) : undefined;
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T22;
