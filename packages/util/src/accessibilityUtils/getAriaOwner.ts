function getAriaOwner(element: typeof window.qwElement): typeof window.qwElement | null {
  const id = element.getElementAttribute('id');
  const ariaOwns = window.qwPage.getElements('[aria-owns]', element);
  let index = 0;
  let ariaOwner: typeof window.qwElement | undefined;
  while (id && index < ariaOwns.length && !!ariaOwns) {
    const ariaElement = ariaOwns[index];
    const ariaOwnsAttribute = ariaElement.getElementAttribute('aria-owns');
    if (ariaOwnsAttribute) {
      const idArray = ariaOwnsAttribute.split(' ');
      if (idArray.includes(id) && window.AccessibilityUtils.isElementInAT(ariaElement)) {
        ariaOwner = ariaElement;
      }
    }
    index++;
  }
  return ariaOwner ?? null;
}

export default getAriaOwner;
