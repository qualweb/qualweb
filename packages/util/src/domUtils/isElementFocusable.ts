'use strict';

import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { DomUtils } from '@qualweb/util';

function isElementFocusable(elementQW: QWElement,pageQW:QWPage): boolean {

  let disabled = (elementQW.getElementAttribute('disabled')) !== null;

  if (disabled || DomUtils.isElementHiddenByCSS(elementQW,pageQW)) {
    return false;
  } else {
    let tabIndexLessThanZero = false;
    const tabindex = elementQW.getElementAttribute('tabindex');
    let tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));

    if (tabindex && tabIndexExistsAndIsNumber) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
    if (DomUtils.isElementFocusableByDefault(elementQW,pageQW)) {
      return true;
    }
    else {
      return tabIndexExistsAndIsNumber && !tabIndexLessThanZero;
    }
  }
}

export default isElementFocusable;
