'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';

import { Page } from 'puppeteer';

import Technique from './Technique.object';

import { BrowserUtils } from '../../../util/index';


const technique: HTMLTechnique = {
  name: 'Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded ',
  code: 'QW-HTML-T35',
  mapping: 'F52',
  description: 'The objective of this technique is to ensure that pages do not disorient users by opening up one or more new windows that automatically attain focus as soon as a page is loaded. ',
  metadata: {
    target: {
      element: '*'
    },
    'success-criteria': [{
      name: '3.2.5',
      level: 'AAA',
      principle: 'Understandable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/change-on-request'
    }],
    related: ['G107'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F52',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};


class QW_HTML_T35 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(): Promise < void > {
    throw new Error('Method not implemented.');
  }

  async validate(page: Page): Promise < void > {
    
    const url = await page.url();

    const browser = page.browser();

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const newTabWasOpen = await BrowserUtils.detectIfUnwantedTabWasOpened(browser, url);
    if (!newTabWasOpen) { 
      evaluation.verdict = 'passed';
      evaluation.description = `Browser didn't open new tab`;
      evaluation.resultCode = 'RC1';
    } else { 
      evaluation.verdict = 'failed';
      evaluation.description = `Browser opened a new tab`;
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T35;