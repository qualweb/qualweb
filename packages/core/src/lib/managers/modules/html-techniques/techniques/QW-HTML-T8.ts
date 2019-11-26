'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';

import { AccessibilityTreeUtils} from '@qualweb/util';
import {
  DomElement
} from 'htmlparser2';

import {
  DomUtils
} from '@qualweb/util';

import Technique from './Technique.object';

const technique: HTMLTechnique = {
  name: 'Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives',
  code: 'QW-HTML-T8',
  mapping: 'F30',
  description: 'This describes a failure condition for all techniques involving text alternatives. If the text in the \'text alternative\' cannot be used in place of the non-text content without losing information or function then it fails because it is not, in fact, an alternative to the non-text content.',
  metadata: {
    target: {
      attributes: 'alt'
    },
    'success-criteria': [{
        name: '1.1.1',
        level: 'A',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content'
      },
      {
        name: '1.2.1',
        level: 'A',
        principle: 'Perceivable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded'
      }
    ],
    related: [],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F30',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T8 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise < void > {

    if (!element || !DomUtils.elementHasAttributes(element)) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const default_title = ['spacer', 'image', 'picture', 'separador', 'imagem', 'fotografia'];

    const pattern = new RegExp('.+\\.(jpg|jpeg|png|gif|tiff|bmp)');
    const pattern1 = new RegExp('^picture/s[0-9]+');
    const pattern2 = new RegExp('[0-9]+');
    const pattern3 = new RegExp('^Intro#[0-9]+');
    const pattern4 = new RegExp('^imagem/s[0-9]+');

    let altText = AccessibilityTreeUtils.getAccessibleName(element, processedHTML,false,false);
    if (!altText || altText === '' ){
        evaluation.verdict = 'failed';
        evaluation.description = 'Text alternative is not actually a text alternative for the non-text content';
        evaluation.resultCode = 'RC1';
    }else{
      altText = altText.toLocaleLowerCase();
      if(!pattern4.test(altText.toLocaleLowerCase()) && !pattern3.test(altText) && !pattern2.test(altText) && !pattern1.test(altText) && !pattern.test(altText) && !default_title.includes(altText)) {
        evaluation.verdict = 'warning';
        evaluation.description = `Text alternative needs manual verification`;
        evaluation.resultCode = 'RC2';
      } else{
        evaluation.verdict = 'failed';
        evaluation.description = 'Text alternative is not actually a text alternative for the non-text content';
        evaluation.resultCode = 'RC3';
      }
    }


    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T8;
