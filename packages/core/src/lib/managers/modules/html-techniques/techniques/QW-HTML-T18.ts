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
  name: 'Failure due to using meta redirect with a time limit',
  code: 'QW-HTML-T18',
  mapping: 'F40',
  description: 'meta http-equiv of {time-out}; url=... is often used to automatically redirect users. When this occurs after a time delay, it is an unexpected change of context that may interrupt the user. It is acceptable to use the meta element to create a redirect when the time-out is set to zero, since the redirect is instant and will not be perceived as a change of context. However, it is preferable to use server-side methods to accomplish this.',
  metadata: {
    target: {
      element: 'meta'
    },
    'success-criteria': [{
        name: '2.2.1',
        level: 'A',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable'
      },
      {
        name: '2.2.4',
        level: 'AAA',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/interruptions'
      }
    ],
    related: ['SVR1', 'H76'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F40',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T18 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined): Promise < void > {

    if (element === undefined) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element.attribs !== undefined) { // always true
      let content = (element.attribs['content']).split(';');
      let contentSeconds = parseInt(content[0]);
      if (content.length === 1) {
        // Meta redirect with no url is refresh
      } else if (contentSeconds <= 72000 && contentSeconds >= 1) {
        evaluation.verdict = 'failed';
        evaluation.description = 'Time interval to redirect is between 1 and 72000 seconds';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = `Meta redirect time interval is correctly used`;
        evaluation.resultCode = 'RC2';
      }
      evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
      evaluation.pointer = DomUtils.getElementSelector(element);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T18;