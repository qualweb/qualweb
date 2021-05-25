import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R33 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const roles = window.AccessibilityUtils.roles;

    const test = new Test();

    const explicitRole = window.AccessibilityUtils.getElementValidExplicitRole(element)
    const implicitRole = window.AccessibilityUtils.getImplicitRole(element, '');
    const isInAT = window.AccessibilityUtils.isElementInAT(element);
    const isValidRole = window.AccessibilityUtils.elementHasValidRole(element);
    
    //@ts-ignore
    if (
      explicitRole !== null &&
      isValidRole &&
      explicitRole !== implicitRole &&
      isInAT &&
      roles[explicitRole]['requiredContextRole'] !== ''
    ) {
      //@ts-ignore
      const requiredContextRole = roles[explicitRole]['requiredContextRole'];
      const id = element.getElementAttribute('id');

      const ariaOwns = window.qwPage.getElement('[aria-owns' + `~="${id}"]`, element);

      if (ariaOwns !== null) {
        const ariaOwnsRole = window.AccessibilityUtils.getElementRole(ariaOwns);
        if (ariaOwnsRole && requiredContextRole.includes(ariaOwnsRole)) {
          test.verdict = 'passed';
          test.description = `The test target parent has the required context \`role\`.`;
          test.resultCode = 'RC1';
        } else {
          test.verdict = 'failed';
          test.description = `The test target parent doesn't have the required context \`role\``;
          test.resultCode = 'RC2';
        }
      } else if (this.isElementADescendantOf(element, <string[]>requiredContextRole)) {
        test.verdict = 'passed';
        test.description = `The test target parent has the required context \`role\`.`;
        test.resultCode = 'RC3';
      } else {
        test.verdict = 'failed';
        test.description = `The test target parent doesn't have the required context \`role\``;
        test.resultCode = 'RC4';
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }

  private isElementADescendantOf(element: typeof window.qwElement, roles: string[]): boolean {
    let parent = element.getElementParent();
    if (!parent) {
      const documentSelector = element.getElementAttribute('_documentSelector');
      if (!!documentSelector && !documentSelector.includes('iframe')) {
        parent = window.qwPage.getElement(documentSelector);
      }
    }
    let result = false;
    let sameRole = false;

    if (parent !== null) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      if (parentRole !== null) {
        sameRole = roles.includes(parentRole);
      }
      result = sameRole;
      if (parentRole === null || parentRole === 'presentation' || parentRole === 'none') {
        return this.isElementADescendantOf(parent, roles);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

export = QW_ACT_R33;
