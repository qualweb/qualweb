'use strict';

import isElementHiddenByCSS from './isElementHiddenByCSS';
import { QWElement } from '@qualweb/qw-element';
import textHasTheSameColorOfBackground from './textHasTheSameColorOfBackground';

function isElementVisible(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const offScreen =  elementQW.isOffScreen();
  const cssHidden = isElementHiddenByCSS(elementQW);
  const textHasTheSameColor = textHasTheSameColorOfBackground(elementQW);
  
  return !(offScreen || cssHidden||textHasTheSameColor);
}

export default isElementVisible;
