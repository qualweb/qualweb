'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';

//incomplete
//ignores being a header cell assigned to the closest ancestor of the link in the flat tree that has a semantic role of cell or gridcell;
function getLinkContext(element: QWElement, page: QWPage): string[] {
  const context: string[] = [];
  const parent = element.getElementParent();
  const ariaDescribedByATT = element.getElementAttribute('aria-describedby');
  let ariaDescribedBy: string[] = [];
  if (ariaDescribedByATT) ariaDescribedBy = ariaDescribedByATT.split(' ');
  if (parent) {
    const role = AccessibilityUtils.getElementRole(parent, page);
    const inAT = AccessibilityUtils.isElementInAT(parent, page);
    const tagName = parent.getElementTagName();
    const id = parent.getElementAttribute('id');
    if (
      inAT &&
      (tagName === 'p' ||
        role === 'cell' ||
        role === 'gridcell' ||
        role === 'listitem' ||
        (id && ariaDescribedBy.includes(id)))
    ) {
      context.push(parent.getElementSelector());
    }
    getLinkContextAux(parent, page, ariaDescribedBy, context);
  }
  return context;
}

function getLinkContextAux(element: QWElement, page: QWPage, ariaDescribedBy: string[], context: string[]): void {
  const parent = element.getElementParent();
  if (parent) {
    const role = AccessibilityUtils.getElementRole(parent, page);
    const inAT = AccessibilityUtils.isElementInAT(parent, page); //isElementInAT(when added html list)
    const tagName = parent.getElementTagName();
    const id = parent.getElementAttribute('id');
    if (
      inAT &&
      (tagName === 'p' ||
        role === 'cell' ||
        role === 'gridcell' ||
        role === 'listitem' ||
        (id && ariaDescribedBy.includes(id)))
    ) {
      context.push(parent.getElementSelector());
    }
    getLinkContextAux(parent, page, ariaDescribedBy, context);
  }
}

export default getLinkContext;
