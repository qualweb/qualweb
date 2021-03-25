import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import ariaJSON from '../lib/ariaAttributesRoles.json';
import rolesJSON from '../lib/roles.json';
import Rule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

interface AriaAttributesRoles {
  [attribute: string]: {
    global: string;
    typeValue: string;
    values: string | string[];
    defaultValue: string;
  };
}

interface Roles {
  [role: string]: {
    baseConcept: string | string[];
    attribute: string | string[];
    requiredContextRole: string | string[];
    requiredAria?: string | string[];
    requiredRoles?: string | string[];
    supportedAria?: string | Array<string>;
    supportedRoles?: string | Array<string>;
    implicitValueRoles: Array<Array<string>>;
    requiredOwnedElements: any;
  };
}

@ACTRuleDecorator
class QW_ACT_R25 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {
    const ariaAttributesRoles = <AriaAttributesRoles>ariaJSON;
    const roles = <Roles>rolesJSON;
    // get all aria attributes from json to combine it in a css selector
    let ariaSelector = '';
    for (const ariaAttrib of Object.keys(ariaAttributesRoles) || []) {
      ariaSelector = ariaSelector.concat('[', ariaAttrib, '], ');
    }
    ariaSelector = ariaSelector.substring(0, ariaSelector.length - 2);

    // get all elements that are using aria attributes
    const elementsWithAriaAttribs = element.getElements(ariaSelector);

    for (const elem of elementsWithAriaAttribs || []) {
      const elemRole = AccessibilityUtils.getElementRole(elem, page);
      const isInAT = AccessibilityUtils.isElementInAT(elem, page);
      const elemAttribs = elem.getElementAttributesName();

      for (const attrib of elemAttribs || []) {
        const keys = Object.keys(ariaAttributesRoles);
        if (!!keys && !!attrib && keys.includes(attrib)) {
          const evaluation: ACTRuleResult = {
            verdict: '',
            description: '',
            resultCode: ''
          };

          //if is in the accessibility tree
          if (isInAT) {
            // if valid aria attribute
            //@ts-ignore
            if (
              ariaAttributesRoles[attrib]['global'] === 'yes' ||
              (elemRole !== null &&
                !!roles[elemRole] &&
                ((!!roles[elemRole]['requiredAria'] && roles[elemRole]?.requiredAria?.includes(attrib)) ||
                  (roles[elemRole]['supportedAria'] && roles[elemRole]?.supportedAria?.includes(attrib))))
            ) {
              evaluation.verdict = 'passed';
              evaluation.description = `The \`${attrib}\` property is supported or inherited by the \`role\` ${elemRole}.`;
              evaluation.resultCode = 'RC1';
            } else {
              evaluation.verdict = 'failed';
              evaluation.description = `The \`${attrib}\` property is neither inherited nor supported by the \`role\` ${elemRole}.`;
              evaluation.resultCode = 'RC2';
            }
          } else {
            //if they are not in the accessibility tree
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'The test target is not included in the accessibility tree.';
            evaluation.resultCode = 'RC3';
          }

          super.addEvaluationResult(evaluation, elem);
        }
      }
    }
  }
}

export = QW_ACT_R25;
