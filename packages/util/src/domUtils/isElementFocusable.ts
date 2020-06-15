'use strict';

import isElementFocusableByDefault from './isElementFocusableByDefault';
import isElementHiddenByCSS from './isElementHiddenByCSS';
import { QWElement } from '@qualweb/qw-element';

function isElementFocusable(elementQW: QWElement): boolean {

  let disabled = (elementQW.getElementAttribute('disabled')) !== null;

  if (disabled || isElementHiddenByCSS(elementQW)) {
    return false;
  } else if (isElementFocusableByDefault(elementQW)) {
    return true;
  }
  else {
    let tabIndexLessThanZero = false;
    const tabindex = elementQW.getElementAttribute('tabindex');
    let tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));

    if (tabindex && tabIndexExistsAndIsNumber) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
    return tabIndexExistsAndIsNumber && !tabIndexLessThanZero;
  }
}

export default isElementFocusable;
