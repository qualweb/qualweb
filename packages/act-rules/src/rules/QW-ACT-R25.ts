import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R25 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const ariaAttributesRoles = window.AccessibilityUtils.ariaAttributesRoles;
    const roles = window.AccessibilityUtils.roles;
    // get all aria attributes from json to combine it in a css selector
    let ariaSelector = '';
    for (const ariaAttrib of Object.keys(ariaAttributesRoles) || []) {
      ariaSelector = ariaSelector.concat('[', ariaAttrib, '], ');
    }
    ariaSelector = ariaSelector.substring(0, ariaSelector.length - 2);

    // get all elements that are using aria attributes
    const elementsWithAriaAttribs = element.getElements(ariaSelector);

    for (const elem of elementsWithAriaAttribs ?? []) {
      const elemRole = window.AccessibilityUtils.getElementRole(elem);
      const isInAT = window.AccessibilityUtils.isElementInAT(elem);
      const elemAttribs = elem.getElementAttributesName();

      for (const attrib of elemAttribs ?? []) {
        const keys = Object.keys(ariaAttributesRoles);
        if (!!keys && !!attrib && keys.includes(attrib)) {
          const test = new Test();

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
              test.verdict = 'passed';
              test.description = `The \`${attrib}\` property is supported or inherited by the \`role\` ${elemRole}.`;
              test.resultCode = 'RC1';
            } else {
              test.verdict = 'failed';
              test.description = `The \`${attrib}\` property is neither inherited nor supported by the \`role\` ${elemRole}.`;
              test.resultCode = 'RC2';
            }

            test.addElement(elem);
            super.addTestResult(test);
          }
        }
      }
    }
  }
}

export = QW_ACT_R25;
