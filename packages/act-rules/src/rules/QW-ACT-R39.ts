import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R39 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const role = window.AccessibilityUtils.getElementRole(element);

    if (role !== 'columnheader' && role !== 'rowheader') {
      return;
    }
    const cellRoles = ['cell', 'gridcell', 'rowheader', 'columnheader'];

    const test = new Test();

    const isInAT = window.AccessibilityUtils.isElementInAT(element);
    if (isInAT) {
      const isVisible = window.DomUtils.isElementVisible(element);
      if (isVisible) {
        const ancestorTableOrGrid = getFirstAncestorElementByNameOrRoles(element, [], ['grid', 'table']);
        if (ancestorTableOrGrid !== null) {
          const isAncestorTableOrGridInAT = window.AccessibilityUtils.isElementInAT(ancestorTableOrGrid);
          if (isAncestorTableOrGridInAT) {
            const rowElements = ancestorTableOrGrid.getElements('tr, [role="row"]');
            const elementParent = element.getElementParent();
            const colspan = element.getElementAttribute('colspan');
            const headerElementIndex = getElementIndexOfParentChildren(element);
            const headerElementId = element.getElementAttribute('id');

            let found = false;
            let index = 0;
            while (!found && index < rowElements.length) {
              // all children of row
              const rowChildrenElements = rowElements[index].getElementChildren();
              if (elementParent && rowElements[index].getElementSelector() !== elementParent.getElementSelector()) {
                // row element with same index as header

                // if there is an element in the same index as header...
                if (rowChildrenElements.length > headerElementIndex) {
                  const cellIndexElements = [rowChildrenElements[headerElementIndex]];
                  if (colspan) {
                    let i = headerElementIndex + 1;
                    for (i; i < headerElementIndex + parseInt(colspan) && i < rowChildrenElements.length; i++) {
                      cellIndexElements.push(rowChildrenElements[i]);
                    }
                  }
                  for (const cellIndexElement of cellIndexElements) {
                    const cellIndexElementRole = cellIndexElement
                      ? window.AccessibilityUtils.getElementRole(cellIndexElement)
                      : null;
                    const cellHeadersAttribute = cellIndexElement
                      ? cellIndexElement.getElementAttribute('headers')
                      : null;
                    // if it does not have a headers attribute, it's found but if it has a headers attribute, we need to verify if it includes headerElement's id
                    found =
                      !!cellIndexElementRole &&
                      cellRoles.includes(cellIndexElementRole) &&
                      (cellHeadersAttribute
                        ? headerElementId
                          ? cellHeadersAttribute.includes(headerElementId)
                          : false
                        : true);
                  }
                } else {
                  // if there is not an element in the same index as header, we need to check all row children...
                  for (const cellElement of rowChildrenElements) {
                    if (!found) {
                      const cellElementRole = window.AccessibilityUtils.getElementRole(cellElement);
                      // verifying if it has a colspan attribute and it matches headerElement's index
                      const cellColspanAttribute = cellElement.getElementAttribute('colspan');
                      const cellElementIndex = getElementIndexOfParentChildren(cellElement);

                      // and verifying if it has a headers attribute that includes headerElement's id
                      const headers = cellElement.getElementAttribute('headers');
                      found =
                        !!cellElementRole &&
                        cellRoles.includes(cellElementRole) &&
                        ((!!headerElementId && !!headers && headers.includes(headerElementId)) ||
                          (cellColspanAttribute
                            ? cellElementIndex + +cellColspanAttribute - 1 <= headerElementIndex
                            : false));
                    }
                  }
                }
              } else {
                const elements = rowElements[index].getElements("td,[role='cell'],[role='gridcell']");
                for (const cellElement of elements) {
                  if (!found) {
                    const cellElementRole = window.AccessibilityUtils.getElementRole(cellElement);
                    // and verifying if it has a headers attribute that includes headerElement's id
                    const headers = cellElement.getElementAttribute('headers');
                    found =
                      !!cellElementRole &&
                      cellRoles.includes(cellElementRole) &&
                      (!headers || (!!headerElementId && !!headers && headers.includes(headerElementId)));
                  }
                }
              }
              index++;
            }

            if (found) {
              test.verdict = 'passed';
              test.description = `The column header element has at least one assigned cell`;
              test.resultCode = 'RC1';
            } else {
              //if (elementParent) // FIX: the hell is this if for?

              test.verdict = 'failed';
              test.description = `The column header element does not have at least one assigned cell`;
              test.resultCode = 'RC2';
            }

            test.addElement(element);
            super.addTestResult(test);
          }
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

function getElementIndexOfParentChildren(element: typeof window.qwElement): number {
  let elementIndex = 0;
  let foundIndex = false;
  const elementParent = element.getElementParent();
  const elementParentChildren = elementParent ? elementParent.getElementChildren() : null;
  while (elementParentChildren && !foundIndex && elementIndex < elementParentChildren.length) {
    if (elementParentChildren[elementIndex].getElementSelector() !== element.getElementSelector()) {
      elementIndex++;
    } else {
      foundIndex = true;
    }
  }
  return elementIndex++;
}

export = QW_ACT_R39;
