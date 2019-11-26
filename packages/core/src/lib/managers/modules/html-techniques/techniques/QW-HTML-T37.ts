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
  name: 'Adding a link at the beginning of a block of repeated content to go to the end of the block',
  code: 'QW-HTML-T37',
  mapping: 'G123',
  description: 'The objective of this technique is to provide a mechanism to bypass a block of material by skipping to the end of the block.',
  metadata: {
    target: {
      element: 'a',
      attributes: 'href'
    },
    'success-criteria': [{
      name: '2.4.1',
      level: 'A',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks'
    }],
    related: ['G1', 'G124'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G123',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T37 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise < void > {
    
    if (element === undefined) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const refElement = DomUtils.getElementReferencedByHREF(processedHTML, element);
    const hidden = DomUtils.isElementHidden(element);
    if (refElement) {
      if (!hidden) {
        evaluation.verdict = 'warning';
        evaluation.description = 'This link skips a content block';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'This link that skips a content block is not visible';
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `This link is not used to skip a content block`;
      evaluation.resultCode = 'RC3';
    }

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T37;
