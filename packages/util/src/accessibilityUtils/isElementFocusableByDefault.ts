function isElementFocusableByDefault(element: typeof window.qwElement): boolean {
  const draggableAttribute = element.getElementAttribute('draggable');

  if (draggableAttribute && draggableAttribute === 'true') {
    return true;
  } else {
    const elementName = element.getElementTagName();
    const hasHref = element.elementHasAttribute('href');
    const elementAttributeType = element.getElementAttribute('type');

    const parent = element.getElementParent();
    let parentName;
    let parentChildren;

    if (parent) {
      parentName = parent.getElementTagName();
      parentChildren = parent.getElementChildren();
    }

    switch (elementName) {
      case 'a':
        if (hasHref) {
          return true;
        }
        break;
      case 'area':
      case 'link':
        if (hasHref) {
          return true;
        }
        break;
      case 'input':
        return !(elementAttributeType && elementAttributeType === 'hidden');
      case 'summary':
        return !!(
          parent &&
          parentName === 'details' &&
          parentChildren &&
          element.getElementSelector() === parentChildren[0].getElementSelector()
        );
      case 'textarea':
      case 'select':
      case 'button':
      case 'iframe':
        return true;
    }
    return false;
  }
}

export default isElementFocusableByDefault;
