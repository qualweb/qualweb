
'use strict';

import { ElementHandle } from 'puppeteer';
import getElementTagName from './getElementTagName';
import elementHasAttribute from './elementHasAttribute';
import getElementAttribute from './getElementAttribute';
import getElementParent from './getElementParent';
import getElementChildren from './getElementChildren';

async function isElementFocusableByDefault(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  const elementName = await getElementTagName(element);
  const hasHref = await elementHasAttribute(element, 'href');
  const elementAttributeType = await getElementAttribute(element, 'type');

  const parent = await getElementParent(element);
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
      return !!!(elementAttributeType && elementAttributeType !== 'hidden');
    case 'summary':
      return !!(parent && parentName === 'details' && parentChildren && parentChildren[0] === element);
    case 'textarea':
    case 'select':
    case 'button':
      return true;
  }
  return false;
}

export = isElementFocusableByDefault;
