'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists, ElementIsVisible } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRule
class QW_ACT_R47 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: QWElement): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const style = <string> element.getElementAttribute('style');

    const isApplicable = style.includes('word-spacing') || style.includes('letter-spacing') || style.includes('line-height');

    if (isApplicable) {
      const properties = style.split(';') || [style];

      if (style.includes('word-spacing')) {
        const hasImportant = properties.filter(p => p.trim().startsWith('word-spacing'))[0].includes('!important');

        const fontSize = element.getElementStyleProperty('font-size', null);
        const wordSpacing = element.getElementStyleProperty('word-spacing', null);

        const isBiggerOrEqual = parseInt(wordSpacing) * 0.16 >= parseInt(fontSize);

        if ((isBiggerOrEqual && hasImportant) || !hasImportant) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target doesn't have the important flag or the computed word-spacing is at least 0.16 times the computed font-size.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target has the important flag and the computed word-spacing isn't at least 0.16 times the computed font-size.`;
          evaluation.resultCode = 'RC2';
        }
      }

      if (style.includes('letter-spacing') && evaluation.verdict !== 'failed') {
        const hasImportant = properties.filter(p => p.trim().startsWith('letter-spacing'))[0].includes('!important');

        const fontSize = element.getElementStyleProperty('font-size', null);
        const letterSpacing = element.getElementStyleProperty('letter-spacing', null);

        const isBiggerOrEqual = parseInt(letterSpacing) * 0.12 >= parseInt(fontSize);

        if (((isBiggerOrEqual && hasImportant) || !hasImportant) && evaluation.verdict === '') {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target doesn't have the important flag or the computed letter-spacing is at least 0.12 times the computed font-size.`;
          evaluation.resultCode = 'RC3';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target has the important flag and the computed letter-spacing isn't at least 0.12 times the computed font-size.`;
          evaluation.resultCode = 'RC4';
        }
      }

      if (style.includes('line-height') && evaluation.verdict !== 'failed') {
        const hasImportant = properties.filter(p => p.trim().startsWith('line-height'))[0].includes('!important');

        const fontSize = element.getElementStyleProperty('font-size', null);
        const lineHeight = element.getElementStyleProperty('line-height', null);

        const isBiggerOrEqual = parseInt(lineHeight) * 1.5 >= parseInt(fontSize);

        if (((isBiggerOrEqual && hasImportant) || !hasImportant) && evaluation.verdict === '') {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target doesn't have the important flag or the computed ine-height is at least 1.5 times the computed font-size.`;
          evaluation.resultCode = 'RC5';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target has the important flag and the computed line-height isn't at least 1.5 times the computed font-size.`;
          evaluation.resultCode = 'RC6';
        }
      }

      evaluation.htmlCode = element.getElementHtmlCode(true, true);
      evaluation.pointer = element.getElementSelector();

      super.addEvaluationResult(evaluation);
    }
  }
}

export = QW_ACT_R47;
