import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import isElementFocusableByDefault from './isElementFocusableByDefault';
import isElementHiddenByCSS from '../domUtils/isElementHiddenByCSS';

function isElementFocusable(elementQW: QWElement, pageQW: QWPage): boolean {
  const disabled = elementQW.getElementAttribute('disabled') !== null;

  if (disabled || isElementHiddenByCSS(elementQW, pageQW)) {
    return false;
  } else if (isElementFocusableByDefault(elementQW)) {
    return true;
  } else {
    let tabIndexLessThanZero = false;
    const tabindex = elementQW.getElementAttribute('tabindex');
    const tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));

    if (tabindex && tabIndexExistsAndIsNumber) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
    return tabIndexExistsAndIsNumber && !tabIndexLessThanZero;
  }
}

export default isElementFocusable;
