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

import Technique from "./Technique.object";

const technique: HTMLTechnique = {
  name: 'Using the title attribute of the frame and iframe elements',
  code: 'QW-HTML-T10',
  mapping: 'H64',
  description: 'The objective of this technique is to demonstrate the use of the title attribute of the frame or iframe element to describe the contents of each frame',
  metadata: {
    target: {
      element: 'frame, iframe'
    },
    'success-criteria': [{
        name: '2.4.1',
        level: 'A',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks'
      },
      {
        name: '4.1.2',
        level: 'A',
        principle: 'Robust',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
      }
    ],
    related: [],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H64',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T10 extends Technique {

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

    //1. Check each frame and iframe element in the HTML or XHTML
    //source code for the presence of a title attribute.
    // 2. Check that the title attribute contains text that identifies the frame.
    if (DomUtils.elementHasAttribute(element, 'title')) {
      if (DomUtils.getElementAttribute(element, 'title').trim() !== '') {
        evaluation.verdict = 'warning';
        evaluation.description = 'Verify if title attribute contains text that identifies the frame';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'Title attribute is empty';
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `frame or iframe doesn't have title attribute`;
      evaluation.resultCode = 'RC3';
    }

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T10;