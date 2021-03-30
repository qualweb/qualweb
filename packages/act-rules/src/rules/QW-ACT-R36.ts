import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R36 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const parentTableElem = getFirstAncestorElementByNameOrRoles(element, ['table'], []);
    if (parentTableElem !== null) {
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
              test.description =
                "The headers attribute '" +
                headerAttributes[i] +
                "' refers to an ID that does not exist within the same table";
              test.resultCode = 'RC5';
            } else {
              idElemRole = window.AccessibilityUtils.getElementRole(idElem);
              if (idElemRole !== 'rowheader' && idElemRole !== 'columnheader') {
                test.verdict = 'failed';
                test.description =
                  "The headers attribute '" +
                  headerAttributes[i] +
                  "' refers to an element inside the same table which does not have a role of rowheader or columnheader";
                test.resultCode = 'RC6';
              }
            }
            i++;
          }

          if (test.verdict !== 'failed') {
            test.verdict = 'passed';
            test.description =
              'All headers attributes refer to a cell with a semantic role of columnheader of rowheader within the same table';
            test.resultCode = 'RC7';
          }

          test.addElement(element, true, true);
          super.addTestResult(test);
        }
      }
    }
  }
}

function getFirstAncestorElementByNameOrRoles(
  element: typeof window.qwElement,
  names: string[],
  roles: string[]
): typeof window.qwElement | null {
  if (!element) {
    throw Error('Element is not defined');
  }

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

function getElementByIdInElement(element: typeof window.qwElement, id: string): typeof window.qwElement | null {
  if (!id) {
    throw new Error('Invalid id');
  }
  return element.getElement(`#${id}`);
}

export = QW_ACT_R36;
