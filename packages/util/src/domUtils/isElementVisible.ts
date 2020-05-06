'use strict';

import isElementHiddenByCSS from './isElementHiddenByCSS';
import { QWElement } from '@qualweb/qw-element';

function isElementVisible(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const offScreen =  elementQW.isOffScreen();
  const cssHidden = isElementHiddenByCSS(elementQW);
  
  return !(offScreen || cssHidden);
}

export default isElementVisible;
