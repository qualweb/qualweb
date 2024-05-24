import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R28 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const rolesJSON = window.AccessibilityUtils.roles;
    // get all elements
    const allElements = element.getElements('[role]');
    for (const elem of allElements || []) {
      const test = new Test();

      const elemRole = elem.getElementAttribute('role');
      const elemAttribs = elem.getElementAttributesName();
      const implicitRole = window.AccessibilityUtils.getImplicitRole(elem, ''); //FIXME
      const isInAT = window.AccessibilityUtils.isElementInAT(elem);

      if (isInAT && implicitRole !== elemRole && elemRole !== null && Object.keys(rolesJSON).includes(elemRole)) {
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
          const requiredAriaList = <string[]>rolesJSON[elemRole]['requiredAria'];
          if (elemRole === 'separator') {
            // role separator has exceptions when element is focusable
            if (!window.AccessibilityUtils.isElementFocusable(elem)) {
              const index = requiredAriaList.indexOf('aria-valuenow');
              if (index > -1) {
                requiredAriaList.splice(index, 1);
              }
            }
          }
          let result = true; // passed until it fails a requirement
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
            test.verdict = Verdict.PASSED;
            test.resultCode = 'P1';
          } else {
            test.verdict = Verdict.FAILED;
            test.resultCode = 'F1';
          }
        } else {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P2';
        }

        test.addElement(elem);
        this.addTestResult(test);
      }
    }
  }
}

export { QW_ACT_R28 };
