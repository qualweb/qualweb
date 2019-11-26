'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  DomElement,DomUtils as HtmlDomUtils
} from 'htmlparser2';

import {
  DomUtils
} from '@qualweb/util';

import Technique from "./Technique.object";

const technique: HTMLTechnique = {
  name: 'Providing a title using the title element',
  code: 'QW-HTML-T13',
  mapping: 'H25',
  description: 'All HTML and XHTML documents, including those in individual frames in a frameset, have a title element in the head section that defines in a simple phrase the purpose of the document. This helps users to orient themselves within the site quickly without having to search for orientation information in the body of the page.',
  metadata: {
    target: {
      element: 'title'
    },
    'success-criteria': [{
      name: '2.4.2',
      level: 'A',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled'
    }],
    related: ['G88', 'G127'],
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

class QW_HTML_T13 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined): Promise < void > {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element) {
      if (element.children) {
        const text = HtmlDomUtils.getText(element);
        if (text && text!== "") { // the title text exists and needs to be verified
          evaluation.verdict = 'warning';
          evaluation.description = `Please verify the title text correlates to the page's content`;
          evaluation.resultCode = 'RC1';
        } else { // fails if inside the title tag exists another element instead of text
          evaluation.verdict = 'failed';
          evaluation.description = `Title tag contains elements instead of text`;
          evaluation.resultCode = 'RC2';
        }
      } else { // fails if the title tag is empty
        evaluation.verdict = 'failed';
        evaluation.description = `Title text is empty`;
        evaluation.resultCode = 'RC3';
      }

      evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
      evaluation.pointer = DomUtils.getElementSelector(element);

    } else { // fails if title element doesn't exist
      evaluation.verdict = 'failed';
      evaluation.description = `Title tag doesn't exist`;
      evaluation.resultCode = 'RC4';
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T13;
