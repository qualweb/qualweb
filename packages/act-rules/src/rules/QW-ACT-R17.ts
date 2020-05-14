'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";

@ACTRule
class QW_ACT_R17 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const name = element.getElementTagName();

    if(name === 'img' || name === 'div'){
      const attribs = element.getElementAttributes();

      if(!attribs){
        evaluation.verdict = 'failed';
        evaluation.description = `The test target doesn't have attributes.`;
        evaluation.resultCode = 'RC1';
      } else {
        if(name === 'img' && attribs['aria-hidden'] == 'true') {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target has a semantic role of img, but is not included in the accessibility tree.`;
          evaluation.resultCode = 'RC2';
        } else if(name === 'div') {
          if(attribs['aria-hidden'] == 'true') {
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The test target is not included in the accessibility tree.`;
            evaluation.resultCode = 'RC3';
          } else if (attribs.role && attribs.role !== 'img'){
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The test target doesn't have the semantic role of img.`;
            evaluation.resultCode = 'RC4';
          }
        }
      }

      if(evaluation.verdict === '') {
        const isDecorative = this.isDecorative(name, attribs);
        if(isDecorative){
          evaluation.verdict = 'passed';
          evaluation.description = `The test target is decorative.`;
          if (attribs.alt !== '') {
            evaluation.resultCode = 'RC5';
          } else {
            evaluation.resultCode = 'RC6';
          }
        } else {
          const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
          if(accessibleName === null || accessibleName === undefined) {
            evaluation.verdict = 'failed';
            evaluation.description = `The test target doesn't have an accessible name.`;
            evaluation.resultCode = 'RC7';
          } else if(!accessibleName.replace(/\s/g, '').length) {//check if string has more than whitespaces
            evaluation.verdict = 'failed';
            evaluation.description = `The test target accessible name is empty ("").`;
            evaluation.resultCode = 'RC8';
          } else {
            evaluation.verdict = 'passed';
            evaluation.description = `The test target has an accessible name.`;
            evaluation.resultCode = 'RC9';
          }
        }
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target doesn't have the semantic role of img.`;
      evaluation.resultCode = 'RC10';
    }
    console.log(evaluation.resultCode);
    super.addEvaluationResult(evaluation, element);
  }

  private isDecorative(name: string, attribs: any): boolean {
    if(name === 'img') {
      if(attribs && attribs.role && (attribs.role === 'presentation' || attribs.role === 'none')) {
        return true;
      }

      if(attribs && attribs.alt === '') {
        return true;
      }
    }
    return false;
  }
}

export = QW_ACT_R17;
