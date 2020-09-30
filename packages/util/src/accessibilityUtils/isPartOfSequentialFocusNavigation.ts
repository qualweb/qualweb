'use strict';

import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { AccessibilityUtils } from '@qualweb/util';

function isPartOfSequentialFocusNavigation(elementQW: QWElement, pageQW: QWPage): boolean {

  let tabIndexLessThanZero = false;
  const tabindex = elementQW.getElementAttribute('tabindex');
  let tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));

  if (tabindex && tabIndexExistsAndIsNumber) {
    tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
  }
  return AccessibilityUtils.isElementFocusable(elementQW, pageQW) && tabIndexExistsAndIsNumber && !tabIndexLessThanZero;
}

export default isPartOfSequentialFocusNavigation;
