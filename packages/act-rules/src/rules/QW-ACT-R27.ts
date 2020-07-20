'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import ariaJSON from '../lib/ariaAttributesRoles.json';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRuleDecorator
class QW_ACT_R27 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement): void {

    const allElements = element.getElements('*');
    for (const elem of allElements || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      let countAria = 0;
      let failedAria = '';
      const elemAttribs = elem.getElementAttributesName();
      for (const attrib of elemAttribs || []) {
        if(attrib.startsWith('aria-')) {
          countAria++;
          if (!Object.keys(ariaJSON).includes(attrib)) {
            failedAria = failedAria.concat(', ', attrib);
          }
        }
      }
       
      if(failedAria.length) {
        evaluation.verdict = 'failed';
        evaluation.description = 'The following aria-* attributes are not defined in ARIA 1.1: ' + failedAria;
        evaluation.resultCode = 'RC1';
      } else if (countAria) {
        evaluation.verdict = 'passed';
        evaluation.description = 'All aria-* attributes in this element are defined in ARIA 1.1';
        evaluation.resultCode = 'RC2';
      } else {
        continue;
      }

      super.addEvaluationResult(evaluation, elem);
    }
  }
}

export = QW_ACT_R27;
