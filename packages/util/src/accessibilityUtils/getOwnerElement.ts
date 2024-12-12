import type { QWElement } from '@qualweb/qw-element';

function getOwnerElement(element: QWElement): QWElement | null {
  const ariaOwner = window.AccessibilityUtils.getAriaOwner(element);
  let ownerElement;

  if (ariaOwner) {
    ownerElement = ariaOwner;
  } else {
    let parent = element.getElementParent();
    while (!!parent && !ownerElement) {
      if (window.AccessibilityUtils.isElementInAT(parent)) ownerElement = parent;
      parent = parent.getElementParent();
    }
  }
  return ownerElement || null;
}

export default getOwnerElement;
