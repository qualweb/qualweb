'use strict';

import { DomElement } from 'htmlparser2';

function elementHasParent(element: DomElement, parent: string): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  return !!(element.parent && element.parent.name === parent);
}

export = elementHasParent;