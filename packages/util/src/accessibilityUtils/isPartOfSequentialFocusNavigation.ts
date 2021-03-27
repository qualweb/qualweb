import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import isElementFocusable from './isElementFocusable';

function isPartOfSequentialFocusNavigation(elementQW: QWElement, pageQW: QWPage): boolean {
  let tabIndexLessThanZero = false;
  const tabindex = elementQW.getElementAttribute('tabindex');
  const tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));

  if (tabindex && tabIndexExistsAndIsNumber) {
    tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
  }
  const focusable = isElementFocusable(elementQW, pageQW);
  return (focusable && tabIndexExistsAndIsNumber && !tabIndexLessThanZero) || (focusable && !tabIndexExistsAndIsNumber);
}

export default isPartOfSequentialFocusNavigation;
