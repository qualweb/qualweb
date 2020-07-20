'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWPage} from "@qualweb/qw-page";
import {QWElement} from "@qualweb/qw-element";

@ACTRuleDecorator
class QW_ACT_R18 extends Rule {

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

    const treeSelector = element.getTreeSelector();
    const id = element.getElementAttribute('id');
    if (id && id.trim()) {
      try {
        const elementsWithSameId = page.getElements(`[id="${id.trim()}"]` + treeSelector);
        const genId = RegExp('qw-generated-id-');
  
        if (elementsWithSameId.length > 1) {
          evaluation.verdict = 'failed';
          evaluation.description = `Several elements have the same \`id\` attribute (${id}).`;
          evaluation.resultCode = 'RC1';
        } else if (!genId.test(id)) {
          evaluation.verdict = 'passed';
          evaluation.description = 'The test target has a unique `id` attribute.';
          evaluation.resultCode = 'RC2';
        }
      } catch (err) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target \`id\` attribute has a invalid value.`;
        evaluation.resultCode = 'RC3';
      }
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R18;
