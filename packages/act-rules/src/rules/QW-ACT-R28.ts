import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import rolesJSON from '../lib/roles.json';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R28 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    // get all elements
    const allElements = element.getElements('[role]');
    for (const elem of allElements || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      const elemRole = elem.getElementAttribute('role');
      const elemAttribs = elem.getElementAttributesName();
      const implicitRole = AccessibilityUtils.getImplicitRole(elem, page,"");//FIXME
      const isInAT = AccessibilityUtils.isElementInAT(elem, page);

      if (!isInAT) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The test target is not in accessibility tree.';
        evaluation.resultCode = 'RC1';
      } else if (implicitRole === elemRole) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The test target explicit role equals the implicit role.';
        evaluation.resultCode = 'RC2';
      } else if (elemRole !== null && Object.keys(rolesJSON).includes(elemRole)) {
        //@ts-ignore
        if (rolesJSON[elemRole]['requiredAria']) {
          const implicitRoles = new Array<string>();
          //@ts-ignore
          const implicitValueRoles = rolesJSON[elemRole]['implicitValueRoles'];
          for (const role of implicitValueRoles || []) {
            if (role[0] !== '') {
              implicitRoles.push(role[0]);
            }
          }
          let i = 0;
          //@ts-ignore
          const requiredAriaList = rolesJSON[elemRole]['requiredAria'];
          let result = true;// passed until it fails a requirement
          let requiredAria;

          while (i < requiredAriaList.length && result) {
            requiredAria = requiredAriaList[i];
            if (elemAttribs && elemAttribs.includes(requiredAria) && !implicitRoles.includes(requiredAria)) {
              const attrValue = elem.getElementAttribute(requiredAria);
              result = (attrValue ? attrValue.trim() : '') !== '';
            } else {
              result = implicitRoles.includes(requiredAria);
            }
            i++;
          }
          if (result) {
            evaluation.verdict = 'passed';
            evaluation.description = 'The test target required attributes are listed.';
            evaluation.resultCode = 'RC3';
          } else {
            evaluation.verdict = 'failed';
            evaluation.description = `The test target doesn't list required ${requiredAria}.`;
            evaluation.resultCode = 'RC4';
          }
        } else {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target \`role\` doesn't have required state or property`;
          evaluation.resultCode = 'RC5';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The test target `role` is not valid.';
        evaluation.resultCode = 'RC6';
      }

      super.addEvaluationResult(evaluation, elem);
    }
  }
}

export = QW_ACT_R28;
