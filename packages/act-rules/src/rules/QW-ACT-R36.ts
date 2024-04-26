import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R36 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const parentTableElem = getFirstAncestorElementByNameOrRoles(element, ['table'], []);
    if (parentTableElem !== null) {
      const role = window.AccessibilityUtils.getElementRole(parentTableElem);
      const applicableRoles = ['table', 'grid', 'treegrid'];
      if (role !== null && !applicableRoles.includes(role)) {
        test.verdict = 'inapplicable';
        test.resultCode = 'I1';
      } else {
        const isInAT = window.AccessibilityUtils.isElementInAT(parentTableElem);
        if (isInAT) {
          const isVisible = window.DomUtils.isElementVisible(parentTableElem);
          if (isVisible) {
            const headerAttributes: string[] = [];
            const elementHeaders = element.getElementAttribute('headers');
            const headers = (elementHeaders ? elementHeaders : '').split(' ');
            for (const header of headers) {
              if (headerAttributes.indexOf(header) < 0) {
                headerAttributes.push(header);
              }
            }

            let i = 0;
            let idElem, idElemRole;
            while (test.verdict !== 'failed' && i < headerAttributes.length) {
              idElem = getElementByIdInElement(parentTableElem, headerAttributes[i]);
              if (idElem === null) {
                test.verdict = 'failed';
                test.description = this.translate('F1', { attr: headerAttributes[i] });
                test.resultCode = 'F1';
              } else {
                idElemRole = window.AccessibilityUtils.getElementRole(idElem);
                if (idElemRole !== 'rowheader' && idElemRole !== 'columnheader') {
                  test.verdict = 'failed';
                  test.description = this.translate('F2', { attr: headerAttributes[i] });
                  test.resultCode = 'F2';
                }
              }
              i++;
            }

            if (test.verdict !== 'failed') {
              test.verdict = 'passed';
              test.resultCode = 'P1';
            }

            test.addElement(element, true, true);
            this.addTestResult(test);
          }
        }
      }
    }
  }
}

function getFirstAncestorElementByNameOrRoles(
  element: QWElement,
  names: string[],
  roles: string[]
): QWElement | null {
  const parent = element.getElementParent();
  let result = false;
  let sameRole = false,
    sameName = false;

  if (parent !== null) {
    const parentName = parent.getElementTagName();
    const parentRole = window.AccessibilityUtils.getElementRole(parent);

    if (parentName !== null) {
      sameName = names.includes(parentName);
    }
    if (parentRole !== null) {
      sameRole = roles.includes(parentRole);
    }
    result = sameName || sameRole;
    if (!result) {
      return getFirstAncestorElementByNameOrRoles(parent, names, roles);
    } else {
      return parent;
    }
  } else {
    return null;
  }
}

function getElementByIdInElement(element: QWElement, id: string): QWElement | null {
  if (!id) {
    throw new Error('Invalid id');
  }
  return element.getElement(`[id="${id}"]`);
}

export { QW_ACT_R36 };
