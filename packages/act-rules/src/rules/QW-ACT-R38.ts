import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsInAccessibilityTree } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R38 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }
  /**
   * 
   *mudar requiredOwnedElements para ser so um array
   em caso de group permitir group e required owned do pai
   */

  @ElementExists
  @ElementIsInAccessibilityTree
  execute(element: typeof window.qwElement): void {
    const rolesJSON = window.AccessibilityUtils.roles;
    const test = new Test();

    const explicitRole = element.getElementAttribute('role');
    const implicitRole = window.AccessibilityUtils.getImplicitRole(element, ''); //fixme
    const ariaBusy = this.isElementADescendantOfAriaBusy(element) || element.getElementAttribute('aria-busy');

    if (explicitRole !== null && explicitRole !== implicitRole && explicitRole !== 'combobox' && !ariaBusy) {
      const result = this.checkOwnedElementsRole(
        //@ts-ignore
        rolesJSON[explicitRole]['requiredOwnedElements'],
        window.AccessibilityUtils.getOwnedElements(element)
      );

      if (result) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }
      console.log(test);

      test.addElement(element);
      super.addTestResult(test);
    }
  }

  private checkOwnedElementsRole(ownedRoles: string[], elements: typeof window.qwElement[]): boolean {
    if (ownedRoles.length === 0) return true;
    console.log(ownedRoles);
    const rolesJSON = window.AccessibilityUtils.roles;
    let onlyOwnedRoles = true;
    let hasOneOwnedRole = false;
    let i = 0;
    let hasOwnedRole, currentElement;
    while (i < elements.length) {
      hasOwnedRole = false;
      currentElement = elements[i];
      const role = window.AccessibilityUtils.getElementRole(currentElement);
      if (!role || role === 'none') {
        break;
      }
      console.log({ ownedRoles, role });
      if (role.includes('group')) {
        const roles = rolesJSON[role]['requiredOwnedElements'];
        roles.push(...ownedRoles);
        hasOwnedRole =
          ownedRoles.includes(role) &&
          this.checkOwnedElementsRole(roles, window.AccessibilityUtils.getOwnedElements(currentElement));
      } else {
        hasOwnedRole =
          ownedRoles.includes(role) &&
          this.checkOwnedElementsRole(
            rolesJSON[role]['requiredOwnedElements'],
            window.AccessibilityUtils.getOwnedElements(currentElement)
          );
      }

      console.log({ role, hasOwnedRole });
      onlyOwnedRoles = onlyOwnedRoles && !!hasOwnedRole;
      if (!hasOneOwnedRole) hasOneOwnedRole = !!hasOwnedRole;
      i++;
    }

    return hasOneOwnedRole && onlyOwnedRoles;
  }

  private isElementADescendantOfAriaBusy(element: typeof window.qwElement): boolean {
    const parent = element.getElementParent();
    let result = false;

    if (parent !== null) {
      const inAt = window.AccessibilityUtils.isElementInAT(parent);
      if (inAt) {
        result = !!parent.getElementAttribute('aria-busy');
      }
      if (!result) {
        return this.isElementADescendantOfAriaBusy(parent);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

export = QW_ACT_R38;
