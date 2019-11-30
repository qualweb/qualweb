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

import Technique from './Technique.object';

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

  async execute(element: ElementHandle | undefined): Promise < void > {

    if (!element) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const hasAlt = await DomUtils.elementHasAttribute(element, 'alt');
    const alt = await DomUtils.getElementAttribute(element, 'alt');

    if (!hasAlt) { // fails if the element doesn't contain an alt attribute
      evaluation.verdict = 'failed';
      evaluation.description = `The element doesn't contain an alt attribute`;
      evaluation.resultCode = 'RC1';
    } else if (alt && alt.trim() === '') { // fails if the element's alt attribute is empty
      evaluation.verdict = 'failed';
      evaluation.description = `The element's alt attribute is empty`;
      evaluation.resultCode = 'RC2';
    } else {
      const text = await DomUtils.getElementText(element);

      if (text !== undefined) { // the element contains a non empty alt attribute and a text in his body
        evaluation.verdict = 'warning';
        evaluation.description = `Please verify that the element's alt attribute value and his body text describes correctly the element`;
        evaluation.resultCode = 'RC3';
      } else { // fails if the element doesn't contain a text in the body
        evaluation.verdict = 'failed';
        evaluation.description = `The element doesn't contain a text in his body`;
        evaluation.resultCode = 'RC4';
      }
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T14;
