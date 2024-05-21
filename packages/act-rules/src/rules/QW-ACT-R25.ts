import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R25 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
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
              (ariaAttributesRoles[attr]['global'] === 'yes' &&
                !(
                  role !== null &&
                  !!roles[role] &&
                  !!roles[role]['prohibitedAria'] &&
                  roles[role]?.prohibitedAria?.includes(attr)
                )) ||
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

            test.description = this.translate(test.resultCode, { attr, role: role ?? '' });

            test.addElement(elem);
            this.addTestResult(test);
          }
        }
      }
    }
  }
}

export { QW_ACT_R25 };
