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

import Technique from "./Technique.object";

const technique: HTMLTechnique = {
  name: 'Positioning labels to maximize predictability of relationships',
  code: 'QW-HTML-T25',
  mapping: 'G162',
  description: 'This technique checks the correct position of labels in forms',
  metadata: {
    target: {
      element: 'form'
    },
    'success-criteria': [{
        name: '1.3.1',
        level: 'A',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
      },
      {
        name: '3.3.2',
        level: 'A',
        principle: 'Understandable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions'
      },
    ],
    related: ['H44', 'H71', 'H65', 'G131', 'G167'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G162.html',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: '',
  },
  results: new Array < HTMLTechniqueResult > ()
};


class QW_HTML_T25 extends Technique {

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

    const result = this.verifyInputLabelPosition(element);

    if (result === 'checkbox') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The checkbox label is not immediately after the field';
      evaluation.resultCode = 'RC1';
    } else if (result === 'radio') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The radio label is not immediately after the field';
      evaluation.resultCode = 'RC2';
    } else if (result === 'other') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The form field label is not immediately before the field';
      evaluation.resultCode = 'RC3';
    } else if (result === 'noLabel') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The form field does not have a label';
      evaluation.resultCode = 'RC4';
    } else if (result === 'pass') {
      evaluation.verdict = 'passed';
      evaluation.description = 'The form field has well positioned label';
      evaluation.resultCode = 'RC5';
    }

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }

  verifyInputLabelPosition(elem: DomElement): string | undefined {
    if (elem.attribs) {
      if (elem.attribs['type'] === 'radio' || elem.attribs['type'] === 'checkbox') {
        if (elem.next) {
          if (elem.next.name === 'label' && elem.next.attribs && elem.next.attribs['for'] === elem.attribs['id']) {
            return 'pass';
          }
        } else if (elem.prev) {
          if (elem.prev.name === 'label' && elem.prev.attribs && elem.prev.attribs['for'] === elem.attribs['id']) {
            return elem.attribs['type'];
          }
        } else {
          return 'noLabel'
        }
      }
      if (elem.attribs['type'] !== 'checkbox' && elem.attribs['type'] !== 'radio') {
        if (elem.prev) {
          if (elem.prev.name === 'label' && elem.prev.attribs && elem.prev.attribs['for'] === elem.attribs['id']) {
            return 'pass';
          }
        } else if (elem.next) {
          if (elem.next.name === 'label' && elem.next.attribs && elem.next.attribs['for'] === elem.attribs['id']) {
            return 'other';
          }
        } else {
          return 'noLabel'
        }
      }
    }

    return undefined;
  }
}

export = QW_HTML_T25;