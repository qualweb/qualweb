'use strict';

import isElementHiddenByCSS from './isElementHiddenByCSS';
import { QWElement } from '@qualweb/qw-element';
import elementHasContent from './elementHasContent';
import elementHasOnePixel from './elementHasOnePixel';
import { QWPage } from '@qualweb/qw-page';


function isElementVisible(elementQW: QWElement, pageQW: QWPage): boolean {
  let selector = elementQW.getElementSelector();
  let method = "DomUtils.isElementVisible";
  let result;
  if (pageQW.isValueCached(selector, method)) {
    result = pageQW.getCachedValue(selector, method);
  } else {
    result = isElementVisibleAux(elementQW, pageQW);
    pageQW.cacheValue(selector, method, result);
  }
  return result;
}

function isElementVisibleAux(elementQW: QWElement, pageQW: QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const offScreen = elementQW.isOffScreen();
  const cssHidden = isElementHiddenByCSS(elementQW, pageQW);
  const hasContent = elementHasContent(elementQW, pageQW, true);
  const hasOnePixelHeight = elementHasOnePixel(elementQW);
  let opacityProperty = elementQW.getElementStyleProperty('opacity', '');
  let opacity;
  if (opacityProperty) {
    opacity = parseInt(opacityProperty)
  }

  return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || opacity && opacity === 0);
}

export default isElementVisible;
