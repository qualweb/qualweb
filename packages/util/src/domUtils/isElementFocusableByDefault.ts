
'use strict';
import { QWElement } from '@qualweb/qw-element';

function isElementFocusableByDefault(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }

  const draggableAttribute =  elementQW.getElementAttribute( 'draggable');

  if (draggableAttribute && draggableAttribute === 'true') {
    return true;
  } else {
    const elementName = elementQW.getElementTagName();
    const hasHref = elementQW.elementHasAttribute('href');
    const elementAttributeType = elementQW.getElementAttribute('type');

    const parent = elementQW.getElementParent();
    let parentName;
    let parentChildren;

    if (parent) {
      parentName = parent.getElementTagName();
      parentChildren = parent.getElementChildren();
    }

    switch (elementName) {
      case 'a':
      case 'area':
      case 'link':
        if (hasHref) {
          return true;
        }
        break;
      case 'input':
        return !(elementAttributeType && elementAttributeType !== 'hidden');
      case 'summary':
        return !!(parent && parentName === 'details' && parentChildren && elementQW.getElementSelector() === parentChildren[0].getElementSelector());
      case 'textarea':
      case 'select':
      case 'button':
        return true;
    }
    return false;
  }
}

export default isElementFocusableByDefault;
