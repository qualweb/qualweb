'use strict';

import isElementHiddenByCSS from './isElementHiddenByCSS';
import isOffScreen from './isOffScreen';
import { QWElement } from "../qwElement";

async function isElementVisible(elementQW: QWElement): Promise<boolean> {
  if (!elementQW.elementHtml) {
    throw Error('Element is not defined');
  }
  const offScreen =  await isOffScreen(elementQW);
  const cssHidden = await isElementHiddenByCSS(elementQW);
  
  return !(offScreen || cssHidden);
}

export default isElementVisible;
