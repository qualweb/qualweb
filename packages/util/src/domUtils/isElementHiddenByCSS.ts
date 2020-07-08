'use strict';

import isElementHiddenByCSSAux from "./isElementHiddenByCSSAux";
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from "@qualweb/qw-page";

function isElementHiddenByCSS(elementQW: QWElement,pageQW:QWPage): boolean {
  const parent = elementQW.getElementParent();
  let parentHidden = false;
  let selector = elementQW.getElementSelector();
  let method = "DomUtils.isElementHiddenByCSS";
  let result;
  if(pageQW.isValueCached(selector,method)){
     result = pageQW.getCachedValue(selector,method);
  }else{
    if (parent) {
      parentHidden = isElementHiddenByCSS(parent,pageQW);
    }
    result= isElementHiddenByCSSAux(elementQW) || parentHidden;
    pageQW.cacheValue(selector,method,result);
  }
  return result;
}

export default isElementHiddenByCSS;
