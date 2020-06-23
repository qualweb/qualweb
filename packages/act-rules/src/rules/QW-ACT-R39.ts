'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRule
class QW_ACT_R39 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const role = AccessibilityUtils.getElementRole(element, page);

    if (role !== 'columnheader' && role !== 'rowheader') {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isInAT = AccessibilityUtils.isElementInAT(element, page);
    if (isInAT) {
      const isVisible = DomUtils.isElementVisible(element);
      if (isVisible) {
        const ancestorTableOrGrid = getFirstAncestorElementByNameOrRoles(element, page, [], ['grid', 'table']);
        if (ancestorTableOrGrid !== null) {
          const isAncestorTableOrGridInAT = AccessibilityUtils.isElementInAT(ancestorTableOrGrid, page);
          if (isAncestorTableOrGridInAT) {
            const rowElements = ancestorTableOrGrid.getElements('tr, [role="row"]');
            const elementParent = element.getElementParent();
            const colspan = element.getElementAttribute("colspan");
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
                    for (i; i < (headerElementIndex + parseInt(colspan)) && i < rowChildrenElements.length; i++) {
                      cellIndexElements.push(rowChildrenElements[i])
                    }
                  }
                  for (let cellIndexElement of cellIndexElements) {
                    const cellIndexElementRole = cellIndexElement ? AccessibilityUtils.getElementRole(cellIndexElement, page) : null;
                    const cellHeadersAttribute = cellIndexElement ? cellIndexElement.getElementAttribute('headers') : null;
                    // if it does not have a headers attribute, it's found but if it has a headers attribute, we need to verify if it includes headerElement's id
                    found = (cellIndexElementRole === 'cell' || cellIndexElementRole === 'gridcell') && (cellHeadersAttribute ? (headerElementId ? cellHeadersAttribute.includes(headerElementId) : false) : true);
                  }
                } else {
                  // if there is not an element in the same index as header, we need to check all row children...
                  for (let cellElement of rowChildrenElements) {
                    if (!found) {
                      const cellElementRole = AccessibilityUtils.getElementRole(cellElement, page);
                      // verifying if it has a colspan attribute and it matches headerElement's index
                      const cellColspanAttribute = cellElement.getElementAttribute('colspan');
                      const cellElementIndex = getElementIndexOfParentChildren(cellElement);

                      // and verifying if it has a headers attribute that includes headerElement's id
                      const headers = cellElement.getElementAttribute('headers');
                      found = (cellElementRole === 'cell' || cellElementRole === 'gridcell') && (!!headerElementId && !!headers && headers.includes(headerElementId) || (cellColspanAttribute ? cellElementIndex + +cellColspanAttribute - 1 <= headerElementIndex : false));
                    }
                  }
                }
              } else {
                let elements = rowElements[index].getElements("td,[role='cell'],[role='gridcell']");
                for (let cellElement of elements) {
                  if (!found) {
                    const cellElementRole = AccessibilityUtils.getElementRole(cellElement, page);
                    // and verifying if it has a headers attribute that includes headerElement's id
                    const headers = cellElement.getElementAttribute('headers');
                    found = (cellElementRole === 'cell' || cellElementRole === 'gridcell') && (!headers || (!!headerElementId && !!headers && headers.includes(headerElementId)));
                  }
                }


              }
              index++;
            }

            if (found) {
              evaluation.verdict = 'passed';
              evaluation.description = `The column header element has at least one assigned cell`;
              evaluation.resultCode = 'RC1';
            } else {
              //console.log( element.getElementHtmlCode( true, false)+"\n"+ DomUtils.getElementSelector(element));
              if (elementParent)
                /*  console.log( ancestorTableOrGrid.getElementHtmlCode( true, false)+"\n"+ DomUtils.getElementSelector(ancestorTableOrGrid));
                  console.log( page.accessibility.snapshot({root:element}));
                  console.log( DomUtils.isElementHidden(element));*/

                evaluation.verdict = 'failed';
              evaluation.description = `The column header element does not have at least one assigned cell`;
              evaluation.resultCode = 'RC2';
            }
          } else {
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The test target's closest ancestor is not included in the accessibility tree`;
            evaluation.resultCode = 'RC3';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target does not have a closest ancestor with a semantic role of either table or grid`;
          evaluation.resultCode = 'RC4';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not visible`;
        evaluation.resultCode = 'RC5';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target is not included in the accessibility tree.';
      evaluation.resultCode = 'RC6';
    }
    super.addEvaluationResult(evaluation, element);
  }
}

function getFirstAncestorElementByNameOrRoles(element: QWElement, page: QWPage, names: string[], roles: string[]): QWElement | null {
  if (!element) {
    throw Error('Element is not defined');
  }

  const parent = element.getElementParent();
  let result = false;
  let sameRole, sameName;

  if (parent !== null) {
    const parentName = parent.getElementTagName();
    const parentRole = AccessibilityUtils.getElementRole(parent, page);

    if (parentName !== null) {
      sameName = names.includes(parentName);
    }
    if (parentRole !== null) {
      sameRole = roles.includes(parentRole);
    }
    result = sameName || sameRole;
    if (!result) {
      return getFirstAncestorElementByNameOrRoles(parent, page, names, roles);
    } else {
      return parent;
    }
  } else {
    return null;
  }
}

function getElementIndexOfParentChildren(element: QWElement): number {
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
