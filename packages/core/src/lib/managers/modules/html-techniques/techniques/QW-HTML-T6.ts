'use strict';

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
  name: 'Using both keyboard and other device-specific functions',
  code: 'QW-HTML-T6',
  mapping: 'SCR20',
  description: 'The objective of this technique is to verify the parity of keyboard-specific and mouse-specific events when code that has a scripting function associated with an event is used',
  metadata: {
    target: {
      element: '*',
      attributes: ['onmousedown', 'onmouseup', 'onclick', 'onmouseover', 'onmouseout']
    },
    'success-criteria': [{
      name: '2.1.1',
      level: 'A',
      principle: 'Operable',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard'
    }],
    related: ['G90'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR20',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < HTMLTechniqueResult > ()
};
class QW_HTML_T6 extends Technique {

  constructor() {
    super(technique);
  }

  async execute(element: ElementHandle | undefined): Promise < void > {

    if (!element || !(await DomUtils.elementHasAttributes(element))) {
      return;
    }

    let evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const hasOnmousedown = await DomUtils.elementHasAttribute(element, 'onmousedown');
    const onmousedown = await DomUtils.getElementAttribute(element, 'onmousedown');
    const onkeydown = await DomUtils.getElementAttribute(element, 'onkeydown');

    const hasOnmouseup = await DomUtils.elementHasAttribute(element, 'onmouseup');
    const onmouseup = await DomUtils.getElementAttribute(element, 'onmouseup');
    const onkeyup = await DomUtils.getElementAttribute(element, 'onkeyup');
    
    const hasOnclick = await DomUtils.elementHasAttribute(element, 'onclick');
    const onclick = await DomUtils.getElementAttribute(element, 'onclick');
    const onkeypress = await DomUtils.getElementAttribute(element, 'onkeypress');

    const hasOnmouseover = await DomUtils.elementHasAttribute(element, 'onmouseover');
    const onmouseover = await DomUtils.getElementAttribute(element, 'onmouseover');
    const onfocus = await DomUtils.getElementAttribute(element, 'onfocus');

    const hasOnmouseout = await DomUtils.elementHasAttribute(element, 'onmouseout');
    const onmouseout = await DomUtils.getElementAttribute(element, 'onmouseout');
    const onblur = await DomUtils.getElementAttribute(element,'onblur');

    if (hasOnmousedown && onmousedown !== onkeydown) {
      evaluation.verdict = 'failed';
      evaluation.description = `The mousedown attribute doesn't have a keyboard equivalent`;
      evaluation.resultCode = 'RC1';
    } else if (hasOnmouseup && onmouseup !== onkeyup) {
      evaluation.verdict = 'failed';
      evaluation.description = `The mouseup attribute doesn't have a keyboard equivalent`;
      evaluation.resultCode = 'RC2';
    } else if (hasOnclick && onclick !== onkeypress) {
      evaluation.verdict = 'failed';
      evaluation.description = `The click attribute doesn't have a keyboard equivalent`;
      evaluation.resultCode = 'RC3';
    } else if (hasOnmouseover && onmouseover !== onfocus) {
      evaluation.verdict = 'failed';
      evaluation.description = `The mouseover attribute doesn't have a keyboard equivalent`;
      evaluation.resultCode = 'RC4';
    } else if (hasOnmouseout && onmouseout !== onblur) {
      evaluation.verdict = 'failed';
      evaluation.description = `The mouseout attribute doesn't have a keyboard equivalent`;
      evaluation.resultCode = 'RC5';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = `All the mouse event handlers have a keyboard equivalent`;
      evaluation.resultCode = 'RC6';
    }
    
    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer =await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_HTML_T6;
