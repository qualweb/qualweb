import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R25 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
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

    const keys = Object.keys(ariaAttributesRoles);
    for (const elem of elementsWithAriaAttribs ?? []) {
      const isInAT = window.AccessibilityUtils.isElementInAT(elem);

      //if is in the accessibility tree
      if (isInAT) {
        const attrs = elem.getElementAttributesName();

        for (const attr of attrs ?? []) {
          if (attr && keys.includes(attr)) {
            const test = new Test();

            const role = window.AccessibilityUtils.getElementRole(elem);

            // if valid aria attribute
            if (
              ariaAttributesRoles[attr]['global'] === 'yes' ||
              (role !== null &&
                !!roles[role] &&
                ((!!roles[role]['requiredAria'] && roles[role]?.requiredAria?.includes(attr)) ||
                  (roles[role]['supportedAria'] && roles[role]?.supportedAria?.includes(attr))))
            ) {
              test.verdict = 'passed';
              test.resultCode = 'P1';
            } else {
              test.verdict = 'failed';
              test.resultCode = 'F1';
            }

            test.description = super.getTranslation(test.resultCode, { attr, role: role ?? '' });

            test.addElement(elem);
            super.addTestResult(test);
          }
        }
      }
    }
  }
}

export = QW_ACT_R25;
