'use strict';

import {
  HTMLTechnique,
  HTMLTechniqueResult
} from '@qualweb/html-techniques';
import {
  DomElement
} from 'htmlparser2';

import {
  DomUtils
} from '@qualweb/util';

import Technique from './Technique.object';


const technique: HTMLTechnique = {
  name: 'Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables',
  code: 'QW-HTML-T15',
  mapping: 'F46',
  description: 'The objective of this technique is to describe a failure that occurs when a table used only for layout includes either th elements, a summary attribute, or a caption element. This is a failure because it uses structural (or semantic) markup only for presentation. The intent of the HTML and XHTML table elements is to present data.',
  metadata: {
    target: {
      element: 'table'
    },
    'success-criteria': [{
      name: '1.3.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
    }],
    related: ['H39', 'H51', 'H73'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F46',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};

class QW_HTML_T15 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: DomElement | undefined): Promise < void > {

    if (!element) {
      return;
    }

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    
    const checks = {};
    checks['hasCaption'] = false;
    checks['hasTh'] = false;

    if (element.children) {
      this.checkChildren(element.children, checks);
    }

    if (DomUtils.elementHasAttribute(element, 'summary') && DomUtils.getElementAttribute(element, 'summary').trim() !== '') {
      evaluation.verdict = 'failed';
      evaluation.description = `The table has a non-empty summary - Amend it if it's a layout table`;
      evaluation.resultCode = 'RC1';
    } else if (checks['hasTh']) {
      evaluation.verdict = 'failed';
      evaluation.description = `The table has a th element - Amend it if it's a layout table`;
      evaluation.resultCode = 'RC2';
    } else if (checks['hasCaption']) {
      evaluation.verdict = 'failed';
      evaluation.description = `The table has a caption element - Amend it if it's a layout table`;
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = `No incorrect elements used in layout table`;
      evaluation.resultCode = 'RC4';
    }

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }

  checkChildren(children: DomElement[], checks: any): void {
    for (const child of children) {
      if (child['name'] === 'th')
        checks['hasTh'] = true;
      if (child['name'] === 'caption')
        checks['hasCaption'] = true;
      if (child['children'] !== undefined) {
        this.checkChildren(child['children'], checks);
      }
    }
  }
}

export = QW_HTML_T15;