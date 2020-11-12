'use strict';

import { QWElement } from '@qualweb/qw-element';
import elementHasOnePixel from './elementHasOnePixel';
import { QWPage } from '@qualweb/qw-page';
import { DomUtils } from '@qualweb/util';

function isElementVisible(elementQW: QWElement, pageQW: QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const offScreen = elementQW.isOffScreen();
  const cssHidden = DomUtils.isElementHiddenByCSS(elementQW, pageQW);
  const hasContent = DomUtils.elementHasContent(elementQW, pageQW, true);
  const hasOnePixelHeight = elementHasOnePixel(elementQW);
  const opacityProperty = elementQW.getElementStyleProperty('opacity', '');
  let opacity;
  if (opacityProperty) {
    opacity = parseInt(opacityProperty);
  }

  return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || (opacity && opacity === 0));
}

export default isElementVisible;
