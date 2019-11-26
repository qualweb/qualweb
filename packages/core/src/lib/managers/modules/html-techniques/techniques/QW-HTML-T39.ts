'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  DomElement
} from 'htmlparser2';

import {
  DomUtils, AccessibilityTreeUtils
} from '@qualweb/util';
import { trim } from 'lodash';

import Technique from './Technique.object';



const technique: HTMLTechnique = {
  name: 'Accessible name on img and svg elements',
  code: 'QW-HTML-T39',
  mapping: 'H37',
  description: 'When using the img or the svg element, specify a short text alternative with the correct atribute (alt,title) or element (title,desc).". ',
  metadata: {
    target: {
      element: 'svg,img'
    },
    'success-criteria': [{
      name: '1.1.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content'
    }],
    related: ['G82', 'H2', 'H24', 'H45', 'H30'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H37',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<HTMLTechniqueResult>()
};

class QW_HTML_T39 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[], url: string): Promise<void> {

    if (element === undefined) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let AName, alt, role;
    if (element.name === "img") {
      alt = DomUtils.getElementAttribute(element, 'alt');
      role = DomUtils.getElementAttribute(element, 'role');
      AName = AccessibilityTreeUtils.getAccessibleName(element, processedHTML);
    }
    else {
      AName =  await AccessibilityTreeUtils.getAccessibleNameSVG(url, DomUtils.getElementSelector(element));
    }
    if (element.name === "img" && role === "none" || role === "presentation" || alt === "") {
      //inaplicable(presentation)
    } else {
      if (!AName && trim(AName) === "") {
        evaluation.verdict = 'failed';
        evaluation.description = `The image doesnt have a valid accessible name`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = `Please verify that the element's accessible describes  the image correctly`;
        evaluation.resultCode = 'RC2';
      }
      evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
      evaluation.pointer = DomUtils.getElementSelector(element);
      super.addEvaluationResult(evaluation);


    }


  }


}
export = QW_HTML_T39;
