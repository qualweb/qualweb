'use strict';

import isElementHiddenByCSS from './isElementHiddenByCSS';
import { QWElement } from '@qualweb/qw-element';
import textHasTheSameColorOfBackground from './textHasTheSameColorOfBackground';
import elementHasContent from './elementHasContent';
import elementHasOnePixel from './elementHasOnePixel';
import { QWPage } from '@qualweb/qw-page';


function isElementVisible(elementQW: QWElement,pageQW:QWPage): boolean  {
  let selector = elementQW.getElementSelector();
  let method = "DomUtils.isElementVisible";
  let result;
  if(pageQW.isValueCached(selector,method)){
     result = pageQW.getCachedValue(selector,method);
  }else{
    result = isElementVisibleAux(elementQW, pageQW);
    pageQW.cacheValue(selector,method,result);
  }
  return result;
}

function isElementVisibleAux(elementQW: QWElement,pageQW:QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  if (elementQW.getElementAttribute('shadowTree') !== null) {
    let selector = elementQW.getElementSelector();
    let parent = elementQW.getElementParent();
    while (parent && parent.getElementAttribute('shadowTree') !== null) {
      parent = parent.getElementParent();
    }
    if (parent) {
      let parentSelector = parent.getElementSelector();
      let shadowSelector = selector.replace(parentSelector + " >", "");
      let shadowElement = parent.getShadowElement(shadowSelector.trim());
      if (shadowElement)
        elementQW = shadowElement
    }
  }
  const offScreen = elementQW.isOffScreen();
  const cssHidden = isElementHiddenByCSS(elementQW,pageQW);
  const textHasTheSameColor = textHasTheSameColorOfBackground(elementQW);
  const hasContent = elementHasContent(elementQW);
  const hasOnePixelHeight = elementHasOnePixel(elementQW);

  return !(offScreen || hasOnePixelHeight || cssHidden || textHasTheSameColor && !hasContent || !hasContent);
}

export default isElementVisible;
