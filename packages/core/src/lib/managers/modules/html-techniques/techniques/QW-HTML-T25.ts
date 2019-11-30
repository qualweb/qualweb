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

  async execute(element: ElementHandle | undefined): Promise < void > {

    if (!element) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const result = await this.verifyInputLabelPosition(element);

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

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }

  private async verifyInputLabelPosition(element: ElementHandle): Promise<string | undefined> {
    if (await DomUtils.elementHasAttributes(element)) {
      const type = await DomUtils.getElementAttribute(element, 'type');

      const prevElement = await DomUtils.getElementPreviousSibling(element);
      let prevElementTagName;
      let prevElementHasAttributes
      let prevElementAttributeFor;

      if (prevElement) {
        prevElementTagName = await DomUtils.getElementTagName(prevElement);
        prevElementHasAttributes = await DomUtils.elementHasAttributes(prevElement);
        prevElementAttributeFor = await DomUtils.getElementAttribute(prevElement, 'for');
      }

      const nextElement = await DomUtils.getElementNextSibling(element);
      let nextElementTagName;
      let nextElementHasAttributes;
      let nextElementAttributeFor;

      if (nextElement) {
        nextElementTagName = await DomUtils.getElementTagName(nextElement);
        nextElementHasAttributes = await DomUtils.elementHasAttributes(nextElement);
        nextElementAttributeFor = await DomUtils.getElementAttribute(nextElement, 'for');
      }

      const elementId = await DomUtils.getElementAttribute(element, 'id');

      if (type && (type === 'radio' || type === 'checkbox')) {
        if (nextElement) {
          if (nextElementTagName === 'label' && nextElementHasAttributes && nextElementAttributeFor === elementId) {
            return 'pass';
          }
        } else if (prevElement) {
          if (prevElementTagName === 'label' && prevElementHasAttributes && prevElementAttributeFor === elementId) {
            return type;
          }
        } else {
          return 'noLabel';
        }
      }
      if (type && (type !== 'checkbox' && type !== 'radio')) {
        if (prevElement) {
          if (prevElementTagName === 'label' && prevElementHasAttributes && prevElementAttributeFor === elementId) {
            return 'pass';
          }
        } else if (nextElement) {
          if (nextElementTagName === 'label' && nextElementHasAttributes && nextElementAttributeFor === elementId) {
            return 'other';
          }
        } else {
          return 'noLabel';
        }
      }
    }

    return undefined;
  }
}

export = QW_HTML_T25;