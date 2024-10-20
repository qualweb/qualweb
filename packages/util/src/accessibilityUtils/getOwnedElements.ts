import type { QWElement } from '@qualweb/qw-element';

//elementQW isInAT
function getOwnedElements(element: QWElement): Array<QWElement> {
  const children = element.getElementChildren();
  const result = new Array<QWElement>();
  const ariaOwnedElements = getAriaOwnedElements(element);
  result.push(...ariaOwnedElements);
  for (const child of children ?? []) {
    result.push(...getOwnedElementsAux(child, element.getElementSelector()));
  }
  return result;
}

function getOwnedElementsAux(element: QWElement, ownerSelector: string): Array<QWElement> {
  let ariaOwner = window.AccessibilityUtils.getAriaOwner(element);
  if (
    window.AccessibilityUtils.isElementInAT(element) &&
    (!ariaOwner || (!!ariaOwner && ariaOwner.getElementSelector() === ownerSelector))
  ) {
    return [element];
  } else {
    let children = element.getElementChildren();
    let result = new Array<QWElement>();
    for (const child of children ?? []) {
      result.push(...getOwnedElementsAux(child, ownerSelector));
    }
    return result;
  }
}

function getAriaOwnedElements(element: QWElement): Array<QWElement> {
  const ariaOwns = element.getElementAttribute('aria-owns');
  const elements = new Array<QWElement>();
  if (ariaOwns) {
    const splitted = ariaOwns.split(',');
    for (const id of splitted ?? []) {
      const elem = window.qwPage.getElementByID(id);
      if (!!elem) {
        elements.push(elem);
      }
    }
  }
  return elements;
}

export default getOwnedElements;
