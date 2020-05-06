'use strict';

import isElementFocusableByDefault from './isElementFocusableByDefault';
import isElementHiddenByCSS from './isElementHiddenByCSS';
import { QWElement } from '@qualweb/qw-element';

function isElementFocusable(elementQW: QWElement): boolean {
  let disabled = false;
  let hidden = false;
  let focusableByDefault = false;
  let tabIndexLessThanZero = false;
  let tabIndexExistsAndIsNumber = false;

  const hasAttributes =  elementQW.elementHasAttributes();
  const tabindex = elementQW.getElementAttribute( 'tabindex');

  if (hasAttributes) {
    tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));
    disabled = (elementQW.getElementAttribute( 'disabled')) !== null;
    hidden = isElementHiddenByCSS(elementQW);
    focusableByDefault = isElementFocusableByDefault(elementQW);

    if (tabindex && tabIndexExistsAndIsNumber) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
  }
  if (focusableByDefault) {
    return !(disabled && hidden && tabIndexLessThanZero);
  } else {
    return tabIndexExistsAndIsNumber ? !tabIndexLessThanZero : false;
  }
}

export default isElementFocusable;
