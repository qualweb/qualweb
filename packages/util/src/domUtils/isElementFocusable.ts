'use strict';

import { DomElement } from 'htmlparser2';
import isElementFocusableByDefault from './isElementFocusableByDefault';
import isElementHidden from './isElementHidden';

function isFocusable(element: DomElement): boolean {
  if (element.attribs && (element.attribs['disabled'] !== undefined || isElementHidden(element))) {
    return false;
  } else if (isElementFocusableByDefault(element)) {
    return true;
  }
  let tabIndex = element.attribs ? element.attribs['tabindex'] : undefined;
  return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}

export = isFocusable;