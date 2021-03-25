import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import rolesJSON from '../lib/roles.json';
import Rule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

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
class QW_ACT_R33 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {
    const roles = <Roles>rolesJSON;

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const explicitRole = element.getElementAttribute('role');
    const implicitRole = AccessibilityUtils.getImplicitRole(element, page, '');
    const isInAT = AccessibilityUtils.isElementInAT(element, page);
    const isValidRole = AccessibilityUtils.elementHasValidRole(element, page);

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

      const ariaOwns = page.getElement('[aria-owns' + `~="${id}"]`, element);

      if (ariaOwns !== null) {
        const ariaOwnsRole = AccessibilityUtils.getElementRole(ariaOwns, page);
        if (ariaOwnsRole && requiredContextRole.includes(ariaOwnsRole)) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target parent has the required context \`role\`.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target parent doesn't have the required context \`role\``;
          evaluation.resultCode = 'RC2';
        }
      } else if (this.isElementADescendantOf(element, page, <string[]>requiredContextRole)) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target parent has the required context \`role\`.`;
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target parent doesn't have the required context \`role\``;
        evaluation.resultCode = 'RC4';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not in the accessibility tree or doesn't have an explicit \`role\` with the required context \`role\``;
      evaluation.resultCode = 'RC5';
    }

    super.addEvaluationResult(evaluation, element);
  }

  private isElementADescendantOf(element: QWElement, page: QWPage, roles: string[]): boolean {
    let parent = element.getElementParent();
    if (!parent) {
      const documentSelector = element.getElementAttribute('_documentSelector');
      if (!!documentSelector && !documentSelector.includes('iframe')) {
        parent = page.getElement(documentSelector);
      }
    }
    let result = false;
    let sameRole = false;

    if (parent !== null) {
      const parentRole = AccessibilityUtils.getElementRole(parent, page);
      if (parentRole !== null) {
        sameRole = roles.includes(parentRole);
      }
      result = sameRole;
      if (parentRole === null || parentRole === 'presentation' || parentRole === 'none') {
        return this.isElementADescendantOf(parent, page, roles);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

export = QW_ACT_R33;
