'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';

class QW_ACT_R17 extends Rule {

  constructor() {
    super({
      name: 'Image has accessible name',
      code: 'QW-ACT-R17',
      mapping: '23a2a8',
      description: 'This rule checks that each image that is not marked as decorative, has an accessible name.',
      metadata: {
        target: {
          element: 'img'
        },
        'success-criteria': [],
        related: [],
        url: 'https://act-rules.github.io/rules/23a2a8',
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:title'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const name = await DomUtils.getElementTagName(element);

    if(name === 'img' || name === 'div'){

      const attribs = await DomUtils.getElementAttributes(element);

      if(!attribs){
        evaluation.verdict = 'failed';
        evaluation.description = `The img element has no attributes`;
        evaluation.resultCode = 'RC1';
      }

      if(evaluation.verdict === ''){
        if(name === 'img' &&
          attribs &&
          attribs['aria-hidden'] == "true"){
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The element has a semantic role of img, but is not included in the accessibility tree.`;
          evaluation.resultCode = 'RC2';
        }else if(name === 'div'){
          if(attribs &&
            attribs['aria-hidden'] == 'true'){
              evaluation.verdict = 'inapplicable';
              evaluation.description = `HTML img element is not included in the accessibility tree.`;
              evaluation.resultCode = 'RC3';
          }else if (attribs && attribs.role && attribs.role !=='img'){
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The element is not an img element.`;
            evaluation.resultCode = 'RC4';
          }
        }
      }

      if(evaluation.verdict === ''){
        const isDecorative = await this.isDecorative(name, attribs);
        if(isDecorative){
          evaluation.verdict = 'passed';
          evaluation.description = `The <img> element is decorative`;
          if (attribs.alt !== '') {
            evaluation.resultCode = 'RC5';
          } else {
            evaluation.resultCode = 'RC6';
          }
        }else{
          const accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
          if(accessibleName === null || accessibleName === undefined ){
            evaluation.verdict = 'failed';
            evaluation.description = `The img element has no accessible name`;
            evaluation.resultCode = 'RC7';
          }else if(!accessibleName.replace(/\s/g, '').length){//check if string has more than whitespaces
            evaluation.verdict = 'failed';
            evaluation.description = `The img element has an empty accessible name`;
            evaluation.resultCode = 'RC8';
          }else{
            evaluation.verdict = 'passed';
            evaluation.description = `The <img> element has accessible name`;
            evaluation.resultCode = 'RC9';
          }
        }
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The element does not have the semantic role of img.`;
      evaluation.resultCode = 'RC10';
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }

  private async isDecorative(name: string, attribs: any): Promise<boolean> {
    if(name === 'img'){
      if(attribs && attribs.role)
        if(attribs.role === 'presentation' || attribs.role === 'none')
          return true;

      if(attribs && attribs.alt === '')
          return true;

    }
    return false;
  }
}

export = QW_ACT_R17;