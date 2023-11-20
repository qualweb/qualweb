//elementQW isInAT
function getOwnedElements(element: typeof window.qwElement): Array<typeof window.qwElement> {
  const children = element.getElementChildren();
  const result = new Array<typeof window.qwElement>();
  const ariaOwnedElements = getAriaOwnedElements(element);
  result.push(...ariaOwnedElements);
  for (const child of children ?? []) {
    result.push(...getOwnedElementsAux(child, element.getElementSelector()));
  }
  return result;
}

function getOwnedElementsAux(element: typeof window.qwElement, ownerSelector: string): Array<typeof window.qwElement> {
  let ariaOwner = window.AccessibilityUtils.getAriaOwner(element);
  if (
    window.AccessibilityUtils.isElementInAT(element) &&
    (!ariaOwner || (!!ariaOwner && ariaOwner.getElementSelector() === ownerSelector))
  ) {
    return [element];
  } else {
    let children = element.getElementChildren();
    let result = new Array<typeof window.qwElement>();
    for (const child of children ?? []) {
      result.push(...getOwnedElementsAux(child, ownerSelector));
    }
    return result;
  }
}

function getAriaOwnedElements(element: typeof window.qwElement): Array<typeof window.qwElement> {
  const ariaOwns = element.getElementAttribute('aria-owns');
  const elements = new Array<typeof window.qwElement>();
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
