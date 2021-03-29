import getAriaOwner from './getAriaOwner';
import isElementInAT from './isElementInAT';

function getOwnerElement(element: typeof window.qwElement): typeof window.qwElement | null {
  const ariaOwner = getAriaOwner(element);
  let ownerElement;

  if (ariaOwner) {
    ownerElement = ariaOwner;
  } else {
    let parent = element.getElementParent();
    while (!!parent && !ownerElement) {
      if (isElementInAT(parent)) ownerElement = parent;
      parent = parent.getElementParent();
    }
  }
  return ownerElement || null;
}

export default getOwnerElement;
