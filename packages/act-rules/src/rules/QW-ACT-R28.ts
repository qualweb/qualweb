import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R28 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
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
            test.verdict = 'passed';
            test.resultCode = 'RC1';
          } else {
            test.verdict = 'failed';
            test.resultCode = 'RC3';
          }
        } else {
          test.verdict = 'passed';
          test.resultCode = 'RC2';
        }

        test.addElement(elem);
        super.addTestResult(test);
      }
    }
  }
}

export = QW_ACT_R28;
