'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  DomElement,
  DomUtils
} from 'htmlparser2';

import {
  DomUtils as QWDomUtils
} from '@qualweb/util';

import Technique from "./Technique.object";

const technique: HTMLTechnique = {
  name: 'Providing text alternatives on applet elements',
  code: 'QW-HTML-T14',
  mapping: 'H35',
  description: 'Provide a text alternative for an applet by using the alt attribute to label an applet and providing the text alternative in the body of the applet element. In this technique, both mechanisms are required due to the varying support of the alt attribute and applet body text by user agents.',
  metadata: {
    'target': {
      element: 'applet'
    },
    'success-criteria': [{
      name: '1.1.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled'
    }],
    related: ['G94'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H25',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};


class QW_HTML_T14 extends Technique {

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

    if (!QWDomUtils.elementHasAttribute(element, 'alt')) { // fails if the element doesn't contain an alt attribute
      evaluation.verdict = 'failed';
      evaluation.description = `The element doesn't contain an alt attribute`;
      evaluation.resultCode = 'RC1';
    } else if (QWDomUtils.getElementAttribute(element, 'alt').trim() === '') { // fails if the element's alt attribute is empty
      evaluation.verdict = 'failed';
      evaluation.description = `The element's alt attribute is empty`;
      evaluation.resultCode = 'RC2';
    } else {
      const hasText = DomUtils.getText(element);

      if (hasText) { // the element contains a non empty alt attribute and a text in his body
        evaluation.verdict = 'warning';
        evaluation.description = `Please verify that the element's alt attribute value and his body text describes correctly the element`;
        evaluation.resultCode = 'RC3';
      } else { // fails if the element doesn't contain a text in the body
        evaluation.verdict = 'failed';
        evaluation.description = `The element doesn't contain a text in his body`;
        evaluation.resultCode = 'RC4';
      }
    }

    evaluation.htmlCode = QWDomUtils.transformElementIntoHtml(element);
    evaluation.pointer = QWDomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T14;
