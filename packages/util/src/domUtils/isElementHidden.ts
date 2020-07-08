
'use strict';
import { QWElement } from '@qualweb/qw-element';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';
import { QWPage } from '@qualweb/qw-page';

function isElementHidden(elementQW: QWElement, pageQW: QWPage): boolean {
  let method = "DomUtils.isElementHidden";
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let selector = elementQW.getElementSelector();
  let result;

  if (pageQW.isValueCached(selector, method)) {
    result = pageQW.getCachedValue(selector, method);
  } else {
    const name = elementQW.getElementTagName();
    const type = elementQW.getElementAttribute("type");
    let typeHidden = name === "input" && type === "hidden";
    const ariaHidden = elementQW.getElementAttribute('aria-hidden') === 'true';
    const hidden = elementQW.getElementAttribute('hidden') !== null;
    const cssHidden = isElementHiddenByCSSAux(elementQW);
    const parent = elementQW.getElementParent();
    let parentHidden = false;
    if (parent) {
      parentHidden = isElementHidden(parent, pageQW);
    }

    result = cssHidden || hidden || ariaHidden || parentHidden || typeHidden;
    pageQW.cacheValue(selector, method, result);
  }
  return result;

}

export default isElementHidden;
