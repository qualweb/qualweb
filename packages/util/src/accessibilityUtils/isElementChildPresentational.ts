import isElementChildPresentationalAux from './isElementChildPresentationalAux';

function isElementChildPresentational(element: typeof window.qwElement): boolean {
  const focusable = window.AccessibilityUtils.isElementFocusable(element);
  const hasGlobalARIA = window.AccessibilityUtils.elementHasGlobalARIAPropertyOrAttribute(element);
  const parent = element.getElementParent();
  let childPresentational = false;

  if (parent && !focusable && !hasGlobalARIA) {
    childPresentational = isElementChildPresentationalAux(parent);
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
