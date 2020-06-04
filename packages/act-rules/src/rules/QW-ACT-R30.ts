'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";
import LanguageDetect from "languagedetect";

@ACTRule
class QW_ACT_R30 extends Rule {

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

    const isWidget = AccessibilityUtils.isElementWidget(element, page);
    if(!isWidget) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not a \`widget\`.`;
      evaluation.resultCode = 'RC1';
    } else {
      const supportsNameFromContent = AccessibilityUtils.allowsNameFromContent(element);
      if(!supportsNameFromContent){
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not a \`widget\` that supports name from content.`;
        evaluation.resultCode = 'RC2';
      } else {
        const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
        const elementText = AccessibilityUtils.getTrimmedText(element);

        if(accessibleName === undefined) {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target doesn't have an accessible name.`;
          evaluation.resultCode = 'RC6';
        } else if(elementText === undefined || elementText === '' || elementText && !this.isHumanLanguage(elementText)) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target has no visible text content or contains non-text content.`;
          evaluation.resultCode = 'RC3';
        } else if(elementText && accessibleName.toLowerCase().trim().includes(elementText.toLowerCase())) {
          evaluation.verdict = 'passed';
          evaluation.description = `The complete visible text content of the test target either matches or is contained within its accessible name.`;
          evaluation.resultCode = 'RC4';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The complete visible text content of the test target neither matches or is contained within its accessible name.`;
          evaluation.resultCode = 'RC5';
        }

        evaluation.accessibleName = accessibleName;
      }
    }

    console.log(evaluation.resultCode);

    super.addEvaluationResult(evaluation, element);
  }

  isHumanLanguage(string): boolean {
    const detector = new LanguageDetect();
    return detector.detect(string).length > 0;
  }
}


export = QW_ACT_R30;
