'use strict';
import { AccessibilityTreeUtils} from '@qualweb/util';

import _ from 'lodash';
import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  DomElement
} from 'htmlparser2';

import {
  getElementSelector,
  transform_element_into_html
} from '../util';
import Technique from './Technique.object';

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

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise<void> {

    if (element === undefined||element.children === undefined) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let img;
    let aText;

    for (let child of element.children) { // fails if the element doesn't contain an alt attribute
        if (child["name"] === "img") {
            img = child;
        }
        if (child["type"] === "text" && child["data"] !== "") {
            aText = child["data"];
        }
    }


    if (aText !== undefined&&_.trim(aText)!=="") {

    } else if (AccessibilityTreeUtils.getAccessibleName(img,processedHTML)) {
        evaluation.verdict = 'passed';
        evaluation.description = `The image has an accessible name`;
        technique.metadata['passed']++;

    } else if (AccessibilityTreeUtils.getAccessibleName(element,processedHTML)) {
        evaluation['verdict'] = 'passed';
        evaluation['description'] = `The link has an accessible name`;
        technique['metadata']['passed']++;

    } else {
        evaluation['verdict'] = 'failed';
        evaluation['description'] = `The image doesnt have an accessible name`;
        technique['metadata']['failed']++;

    }


    evaluation.htmlCode = transform_element_into_html(element);
    evaluation.pointer = getElementSelector(element);
    

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T34;