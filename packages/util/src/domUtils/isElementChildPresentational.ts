'use strict';
import elementHasGlobalARIAPropertyOrAttribute from './elementHasGlobalARIAPropertyOrAttribute';
import { childPresentationalRole } from '../accessibilityUtils/constants';
import getElementRole from '../accessibilityUtils/getElementRole';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementFocusable from './isElementFocusable';

function isElementChildPresentational(elementQW: QWElement, pageQW: QWPage): boolean {
  let selector = elementQW.getElementSelector();
  let method = "DomUtils.isElementPresentationAux";
  let result;
  if (pageQW.isValueCached(selector, method)) {
    result = pageQW.getCachedValue(selector, method);
  } else {
    result = isElementChildPresentationalAux(elementQW, pageQW);
    pageQW.cacheValue(selector, method, result);
  }
  return result;
}
function isElementChildPresentationalAux(elementQW: QWElement, pageQW: QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const focusable = isElementFocusable(elementQW, pageQW);
  const hasGlobalARIA = elementHasGlobalARIAPropertyOrAttribute(elementQW);
  const parent = elementQW.getElementParent();
  let childPresentational = false;

  if (parent && !focusable && !hasGlobalARIA) {
    childPresentational = isParentChildPresentational(parent, pageQW);
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

function isParentChildPresentational(element: QWElement, page: QWPage): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }
  let selector = element.getElementSelector();
  let method = "DomUtils.isParentChildPresentational";
  let result;
  if (page.isValueCached(selector, method)) {
    result = page.getCachedValue(selector, method);
  } else {

    const role = getElementRole(element, page);
    let childPresentational;
    if (role !== null)
      childPresentational = childPresentationalRole.includes(role);
    const parent = element.getElementParent();
    let isParentChildPresentationalVar = false;

    if (parent && !childPresentational) {
      isParentChildPresentationalVar = isParentChildPresentational(parent, page);
    }
    result = childPresentational || isParentChildPresentationalVar;
    page.cacheValue(selector, method, result);
  }

  return result;
}
export default isElementChildPresentational;
