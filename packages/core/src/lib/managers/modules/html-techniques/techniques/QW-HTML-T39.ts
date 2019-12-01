'use strict';

import {trim} from "lodash";

import {
  ElementHandle, Page
} from 'puppeteer';

import {
  DomUtils,AccessibilityTreeUtils
} from '../../../util/index';

import Technique from './Technique.object';
import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';



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
  async execute(element: ElementHandle | undefined,page:Page): Promise < void > {

    if (element === undefined) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let AName, alt, role;
    let name = await DomUtils.getElementName(element);
    if (await DomUtils.getElementName(element) === "img") {
      alt = await DomUtils.getElementAttribute(element, 'alt');
      role = await DomUtils.getElementAttribute(element, 'role');
      AName = await AccessibilityTreeUtils.getAccessibleName(element, page);
    }
    else {
      AName =  await AccessibilityTreeUtils.getAccessibleNameSVG(element,page);
    }
    if (name === "img" && role === "none" || role === "presentation" || alt === "") {
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
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
      super.addEvaluationResult(evaluation);


    }


  }


}
export = QW_HTML_T39;
