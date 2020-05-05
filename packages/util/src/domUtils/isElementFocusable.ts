'use strict';

import isElementFocusableByDefault from './isElementFocusableByDefault';
import elementHasAttributes from './elementHasAttributes';
import getElementAttribute from './getElementAttribute';
import isElementHiddenByCSS from './isElementHiddenByCSS';
import { QWElement } from "../qwElement";

 async function isElementFocusable(elementQW: QWElement): Promise<boolean> {
  let disabled = false;
  let hidden = false;
  let focusableByDefault = false;
  let tabIndexLessThanZero = false;
  let tabIndexExistsAndIsNumber = false;

  const hasAttributes =  await elementHasAttributes(elementQW);
  const tabindex = await getElementAttribute(elementQW, 'tabindex');

  if (hasAttributes) {
    tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));
    disabled = (getElementAttribute(elementQW, 'disabled')) !== null;
    hidden = await isElementHiddenByCSS(elementQW);
    focusableByDefault = await isElementFocusableByDefault(elementQW);

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
