
'use strict';
import getElementTagName from './getElementTagName';
import elementHasAttribute from './elementHasAttribute';
import getElementAttribute from './getElementAttribute';
import getElementParent from './getElementParent';
import getElementChildren from './getElementChildren';
import { QWElement } from "../qwElement";

async function isElementFocusableByDefault(elementQW: QWElement): Promise<boolean> {
  if (!elementQW.elementHtml) {
    throw Error('Element is not defined');
  }
  let element = elementQW.elementHtml;

  const draggableAttribute = await getElementAttribute(elementQW, 'draggable');

  if (draggableAttribute && draggableAttribute === 'true') {
    return true;
  } else {
    const elementName = await getElementTagName(elementQW);
    const hasHref = await elementHasAttribute(elementQW, 'href');
    const elementAttributeType = await getElementAttribute(elementQW, 'type');

    const parent = await getElementParent(elementQW);
    let parentName;
    let parentChildren;

    if (parent) {
      parentName = await getElementTagName(parent);
      parentChildren = await getElementChildren(parent);
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
        return !!(parent && parentName === 'details' && parentChildren && element === parentChildren[0]);
      case 'textarea':
      case 'select':
      case 'button':
        return true;
    }
    return false;
  }
}

export default isElementFocusableByDefault;
