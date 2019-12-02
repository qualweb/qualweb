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
  name: 'Failure of Success Criteria 2.4.4, 2.4.9 and 4.1.2 due to not providing an accessible name for an image which is the only content in a link ',
  code: 'QW-HTML-T34',
  mapping: 'F89',
  description: 'This technique checks the text alternative of images which are the only content of a link',
  metadata: {
    target: {
      parent: 'a',
      element: 'img'
    },
    'success-criteria': [
      {
        name: '2.4.4',
        level: 'A',
        principle: 'Operable',
        url: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html'
      },
      {
        name: '2.4.9',
        level: 'AAA',
        principle: 'Operable',
        url: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-link.html'
      },
      {
        name:'4.1.2',
        level:'A',
        principle:'Robust',
        url:'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
      }
    ],
    related: ['H2', 'H30','ARIA7','ARIA8'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F89',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<HTMLTechniqueResult> ()
};

class QW_HTML_T34 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: ElementHandle | undefined,page:Page): Promise < void > {
    if (element === undefined||!(await DomUtils.elementHasAttributes(element))) {
      return;
    }
    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let img = await element.$("img");
    let aText = await DomUtils.getElementText(element);

    if (aText !== undefined&&trim(aText)!==""||!img) {

    }else if ( await AccessibilityTreeUtils.getAccessibleName(element,page)) {
        evaluation['verdict'] = 'passed';
        evaluation['description'] = `The link has an accessible name`;
        technique['metadata']['passed']++;

    } else {
        evaluation['verdict'] = 'failed';
        evaluation['description'] = `The image doesnt have an accessible name`;
        technique['metadata']['failed']++;

    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T34;
