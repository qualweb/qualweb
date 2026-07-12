import type { QWElement } from '@qualweb/qw-element';

// Two links have the "same programmatically determined link context" when the
// context elements convey the same text - not when they are the same DOM node.
// So the context is keyed by the normalized text of each context element rather
// than by its (necessarily unique) CSS selector.
//incomplete
//ignores being a header cell assigned to the closest ancestor of the link in the flat tree that has a semantic role of cell or gridcell;
function getLinkContext(element: QWElement): Array<string> {
  const context = new Array<string>();
  const parent = element.getElementParent();
  const ariaDescribedByATT = element.getElementAttribute('aria-describedby');
  let ariaDescribedBy = new Array<string>();
  if (ariaDescribedByATT) ariaDescribedBy = ariaDescribedByATT.split(' ');
  if (parent) {
    addContext(parent, ariaDescribedBy, context);
    getLinkContextAux(parent, ariaDescribedBy, context);
  }
  return context;
}

function getLinkContextAux(element: QWElement, ariaDescribedBy: Array<string>, context: Array<string>): void {
  const parent = element.getElementParent();
  if (parent) {
    addContext(parent, ariaDescribedBy, context);
    getLinkContextAux(parent, ariaDescribedBy, context);
  }
}

function addContext(parent: QWElement, ariaDescribedBy: Array<string>, context: Array<string>): void {
  const role = window.AccessibilityUtils.getElementRole(parent);
  const inAT = window.AccessibilityUtils.isElementInAT(parent);
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
    context.push((parent.getElementText() ?? '').replace(/\s+/g, ' ').trim());
  }
}

export default getLinkContext;
