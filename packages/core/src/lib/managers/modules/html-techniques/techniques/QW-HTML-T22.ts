'use strict';

import intersection from 'lodash/intersection';
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
  name: 'Separating information and structure from presentation to enable different presentations',
  code: 'QW-HTML-T22',
  mapping: 'G140',
  description: 'This technique checks that no attributes are being used to control the visual text presentation',
  metadata: {
    target: {
      attributes: ['text', 'vlink', 'alink', 'link']
    },
    'success-criteria': [{
        name: '1.3.1',
        level: 'A',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
      },
      {
        name: '1.4.5',
        level: 'AA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text'
      },
      {
        name: '1.4.9',
        level: 'AAA',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text-no-exception'
      }
    ],
    related: ['C29'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G140',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T22 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: ElementHandle | undefined): Promise < void > {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'passed';
      evaluation.description = `The webpage doesn't use attributes to control the visual text presentation`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The webpage uses attributes in ${await DomUtils.getElementTagName(element)} element to control the visual text presentation`;
      evaluation.resultCode = 'RC2';

      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);

      const hasAttributes = await DomUtils.elementHasAttributes(element);
      const attributes = await DomUtils.getElementAttributesName(element);

      evaluation.attributes = hasAttributes ? intersection(attributes, ['text', 'vlink', 'alink', 'link']) : undefined;
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T22;
