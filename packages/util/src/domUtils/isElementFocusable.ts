'use strict';

import isElementFocusableByDefault from './isElementFocusableByDefault';
import isElementHiddenByCSS from './isElementHiddenByCSS';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';


function isElementFocusable(elementQW: QWElement,pageQW:QWPage): boolean  {
  let selector = elementQW.getElementSelector();
  let method = "DomUtils.isElementFocusable";
  let result;
  if(pageQW.isValueCached(selector,method)){
     result = pageQW.getCachedValue(selector,method);
  }else{
    result = isElementFocusableAux(elementQW, pageQW);
    pageQW.cacheValue(selector,method,result);
  }
  return result;
}


function isElementFocusableAux(elementQW: QWElement,pageQW:QWPage): boolean {

  let disabled = (elementQW.getElementAttribute('disabled')) !== null;

  if (disabled || isElementHiddenByCSS(elementQW,pageQW)) {
    return false;
  } else {
    let tabIndexLessThanZero = false;
    const tabindex = elementQW.getElementAttribute('tabindex');
    let tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));

    if (tabindex && tabIndexExistsAndIsNumber) {
      tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
    if (isElementFocusableByDefault(elementQW)) {
      return true;
    }
    else {
      return tabIndexExistsAndIsNumber && !tabIndexLessThanZero;
    }
  }
}

export default isElementFocusable;
