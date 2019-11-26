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
  name: 'Using the link element and navigation tools\n',
  code: 'QW-HTML-T1',
  mapping: 'H24',
  description: 'The objective of this technique is to describe how the link element can provide metadata about the position of an HTML page within a set of Web pages or can assist in locating content with a set of Web pages.',
  metadata: {
    target: {
      'parent-sibling': 'img',
      parent: 'map',
      element: 'area'
    },
    'success-criteria': [{
        name: '2.4.5',
        level: 'AA',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/multiple-ways'
      },
      {
        name: '2.4.8',
        level: 'AAA',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/location'
      }
    ],
    related: ['G1', 'G63', 'G64', 'G123'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H59',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T19 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined): Promise < void > {

    if (!element || !element.parent) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    let parentName = element.parent["name"];

    if (parentName != "head") {
      evaluation.verdict = 'failed';
      evaluation.description = `The element is not contained in the head element`;
      evaluation.resultCode = 'RC1';
    } else if (!element.attribs) { // fails if the element doesn't contain an alt attribute
      evaluation.verdict = 'failed';
      evaluation.description = `The element doesn't contain a rel or an href attribute`;
      evaluation.resultCode = 'RC2';
    } else {
      const rel = element.attribs["rel"];
      const href = element.attribs["href"];

      if (!rel) {
        evaluation.verdict = 'warning';
        evaluation.description = `The element doesn't contain a rel attribute check if this element pertains navigation `;
        evaluation.resultCode = 'RC3';
      } else if (!href) {
        evaluation.verdict = 'warning';
        evaluation.description = `The element doesn't contain an href attribute check if this element pertains navigation`;
        evaluation.resultCode = 'RC4';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'The element contains a rel and an href attribute that should be manually verified';
        evaluation.resultCode = 'RC5';
      }
    }
    
    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T19;