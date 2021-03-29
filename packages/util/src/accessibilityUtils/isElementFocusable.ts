import isElementFocusableByDefault from './isElementFocusableByDefault';
import isElementHiddenByCSS from '../domUtils/isElementHiddenByCSS';

function isElementFocusable(element: typeof window.qwElement): boolean {
  const disabled = element.getElementAttribute('disabled') !== null;

  if (disabled || isElementHiddenByCSS(element)) {
    return false;
  } else if (isElementFocusableByDefault(element)) {
    return true;
  } else {
    let tabIndexLessThanZero = false;
    const tabindex = element.getElementAttribute('tabindex');
    const tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));

    if (tabindex && tabIndexExistsAndIsNumber) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
    return tabIndexExistsAndIsNumber && !tabIndexLessThanZero;
  }
}

export default isElementFocusable;
