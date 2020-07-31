'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R21 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const roleList = ['img', 'graphics-document', 'graphics-symbol'];

    const elementsToEvaluate = element.getElements('svg *');
    elementsToEvaluate.push(element);

    for (const elem of elementsToEvaluate || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      const role = elem.getElementAttribute('role');
      const isHidden = DomUtils.isElementHidden(elem,page);
      const accessibleName = AccessibilityUtils.getAccessibleNameSVG(elem, page);

      if (!role || (role && roleList.indexOf(role) < 0) || isHidden) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `No test target with this specific roles is included in the accessibility tree.`;
        evaluation.resultCode = 'RC1';
      } else if (accessibleName && accessibleName.trim()) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target has an accessible name.`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target doesn't have an accessible name.`;
        evaluation.resultCode = 'RC3';
      }

      
      super.addEvaluationResult(evaluation, elem,true,false,true,page);
    }
  }
}

export = QW_ACT_R21;
