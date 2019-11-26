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
  name: 'Failure of Success Criterion 1.4.8 due to using text that is justified (aligned to both the left and the right margins)',
  code: 'QW-HTML-T43',
  mapping: 'F88',
  description: 'This failure describes situations where blocks of text that are justified (aligned to both the left and the right margins) occurs in HTML, using the \'align\' attribute.',
  metadata: {
    target: {
      element: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'col', 'colgroup', 'tbody', 'thead', 'tfoot', 'tr', 'th', 'td'],
      attributes: 'align'
    },
    'success-criteria': [{
      name: '1.4.8',
      level: 'AAA',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation'
    }],
    related: ['C22'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F88',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<HTMLTechniqueResult>()
};

class QW_HTML_T43 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'There is no element eligible to use the \'align\' attribute';
      evaluation.resultCode = 'RC1';
    } else {
      const alignAttribute = DomUtils.getElementAttribute(element, 'align');

      if (alignAttribute) {
        if (alignAttribute.trim() === 'justify') {
          evaluation.verdict = 'failed';
          evaluation.description = 'This content shouldn\'t be justified';
          evaluation.resultCode = 'RC2';
        } else {
          evaluation.verdict = 'passed';
          evaluation.description = 'This content is not justified';
          evaluation.resultCode = 'RC3';
        }
      } else {
        return; // if it doesnt have the align attribute, it doesnt matter
      }

      evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
      evaluation.pointer = DomUtils.getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T43;
