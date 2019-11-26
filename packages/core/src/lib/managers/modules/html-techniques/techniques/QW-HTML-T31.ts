'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  DomElement
} from 'htmlparser2';
import {size} from 'lodash';
import {
  DomUtils
} from '@qualweb/util';
const stew = new(require('stew-select')).Stew();
import Technique from './Technique.object';


const technique: HTMLTechnique = {
  name: 'Using longdesc',
  code: 'QW-HTML-T31',
  mapping: 'H45',
  description: 'The objective of this technique is to provide information in a file designated by the longdesc attribute when a short text alternative does not adequately convey the function or information provided in the image',
  metadata: {
    target: {
      element: 'img'
    },
    "success-criteria": [{
      name: '1.1.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content'
    }],
    related: ['G73', 'G74', 'G92', 'G94'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H45',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T31 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined, processedHTML: DomElement[]): Promise < void > {

    if (element === undefined) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (!element['attribs'] || element['attribs']['longdesc'] === undefined) { // fails if the element doesn't contain a longdesc attribute
      evaluation['verdict'] = 'failed';
      evaluation['description'] = `The element doesn't contain a longdesc attribute`;
      evaluation.resultCode = 'RC1';
    } else if (element['attribs']['longdesc'] === '') { // fails if the element's longdesc attribute is empty
      evaluation['verdict'] = 'failed';
      evaluation['description'] = `The element's longdesc attribute is empty`;
      evaluation.resultCode = 'RC2';
    } else {
      const longdesc = element['attribs']['longdesc'];
      if (longdesc.includes('#')) {
        const i = longdesc.indexOf('#');
        let id;

        if (i > 0) {
          id = longdesc.split('#')[1];
        } else {
          id = longdesc;
        }
        let exists = stew.select(processedHTML, '[id="' + id + '"]');

        if (size(exists) > 0) { // the element has a longdesc attribute pointing to a resource in the current page
          evaluation['verdict'] = 'warning';
          evaluation['description'] = 'Please verify that the resource that longdesc is pointing at describes correctly the image';
          evaluation.resultCode = 'RC3';
        } else { // fails if the element that the longdesc is pointing at doesn't exist
          evaluation['verdict'] = 'failed';
          evaluation['description'] = `The resource that longdesc is pointing at doesn't exist`;
          evaluation.resultCode = 'RC4';
        }
      } else { // the element has a longdesc attribute pointing to a resource outside the current page
        //var res = request('GET', longdesc);
        evaluation['verdict'] = 'warning';
        evaluation['description'] = 'Please verify that the resource that longdesc is pointing at exists and describes correctly the image';
        evaluation.resultCode = 'RC5';
      }

    }

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T31;
