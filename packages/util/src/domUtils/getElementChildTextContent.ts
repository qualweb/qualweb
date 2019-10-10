'use strict';

import {
  DomElement,
  DomUtils
} from 'htmlparser2';

function getElementChildTextContent(element: DomElement, childName: string): string | null {
  if (!element) {
    throw Error('Element is not defined');
  }

  for (const child of element.children || []) {
    if (child && child.name === childName) {
      return DomUtils.getText(child);
    }
  }
  return null;
}

export = getElementChildTextContent;