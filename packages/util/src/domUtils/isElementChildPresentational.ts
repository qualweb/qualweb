'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { DomUtils } from '@qualweb/util';


function isElementChildPresentational(elementQW: QWElement, pageQW: QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const focusable = DomUtils.isElementFocusable(elementQW, pageQW);
  const hasGlobalARIA = DomUtils.elementHasGlobalARIAPropertyOrAttribute(elementQW,pageQW);
  const parent = elementQW.getElementParent();
  let childPresentational = false;

  if (parent && !focusable && !hasGlobalARIA) {
    childPresentational = DomUtils.isElementChildPresentationalAux(parent, pageQW);
  }

  return !focusable && !hasGlobalARIA && childPresentational;
}
/*
function isElementParentPresentation(element: QWElement, pageQW: QWPage): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }
  let selector = element.getElementSelector();
  let method = "DomUtils.isElementParentPresentation";
  let result;
  if (pageQW.isValueCached(selector, method)) {
    result = pageQW.getCachedValue(selector, method);
  } else {
    const role = element.getElementAttribute('role')
    let presentationOrNone = role === 'presentation' || role === 'none';
    const focusable = isElementFocusable(element, pageQW);
    const hasGlobalARIA = elementHasGlobalARIAPropertyOrAttribute(element);
    const parent = element.getElementParent();
    let parentPresentation = false;
    let presentation = presentationOrNone && !focusable && !hasGlobalARIA;

    if (parent && !presentation) {
      parentPresentation = isElementParentPresentation(parent, pageQW);
    }
    result = presentation || parentPresentation
    pageQW.cacheValue(selector, method, result);
  }

  return result;
}*/
export default isElementChildPresentational;
