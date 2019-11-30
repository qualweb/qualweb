'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  Page,
  ElementHandle
} from 'puppeteer';

import {
  DomUtils
} from '../../../util/index';

import Technique from './Technique.object';

const technique: HTMLTechnique = {
  name: 'Organizing a page using headings',
  code: 'QW-HTML-T9',
  mapping: 'G141',
  description: 'The objective of this technique is to ensure that sections have headings that identify them and that the heading are used in the correct order',
  metadata: {
    target: {
      element: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    },
    'success-criteria': [{
      name: '1.3.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
    },
    {
      name: '2.4.10',
      level: 'AAA',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/section-headings'
    }
    ],
    related: ['G91', 'H30'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G141',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<HTMLTechniqueResult>()
};

class QW_HTML_T9 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    if (!element || (await page.$$('h1,h2,h3,h4,h5,h6')).length === 0) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let equal = true;
    let complete = true;
    let errorElem = element;
    let hasH1 = (await page.$$('h1')).length > 0;
    let counter = 0;
    let htmlList = await page.$$('body, body *');

    while(equal && complete && hasH1 && counter < htmlList.length) {
      const elem = htmlList[counter];

      const list = await elem.evaluate(ele => {
        const regexp = new RegExp('^h[1-6]$');
        const list = new Array<number>();

        for (const child of ele.children) {
          const name = child.tagName;
          if (name && regexp.test(name)) {
            const split = name.split('h');
            list.push(parseInt(split[1]));
          }
        }

        return list;
      });

      if (list.length !== 0) {
        const sortedArray = list.sort((n1, n2) => n1 - n2);

        for (let i = 0; i < list.length; i++) {
          if (list[i] !== sortedArray[i]) {
            equal = false;
            errorElem = elem;
          }
          if (i > 0 && i - 1 < list.length && sortedArray[i] - sortedArray[i - 1] > 1) {
            complete = false;
            errorElem = elem;
          }
        }
      }
      counter++;
    }

    if (!equal) { // fails if the headings aren't in the correct order
      evaluation.verdict = 'failed';
      evaluation.description = `Headings are not in the correct order`;
      evaluation.resultCode = 'RC1';
    } else if (!complete) { // fails if a header number is missing
      evaluation.verdict = 'failed';
      evaluation.description = `Heading number is missing`;
      evaluation.resultCode = 'RC2';
    } else if (!hasH1) {
      evaluation.verdict = 'failed';
      evaluation.description = `Headings don't start with h1`;
      evaluation.resultCode = 'RC3';
    } else { // the heading elements are correctly used
      evaluation.verdict = 'warning';
      evaluation.description = 'Please verify that headers are used to divide the page correctly';
      evaluation.resultCode = 'RC4';
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(errorElem);
    evaluation.pointer = await DomUtils.getElementSelector(errorElem);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T9;