'use strict';

import { ElementHandle } from 'puppeteer';
import isElementHiddenByCSS from './isElementHiddenByCSS';
import isOffScreen from './isOffScreen';

async function isElemenVisible(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }
  const offScreen =  await isOffScreen(element);
  const cssHidden = await isElementHiddenByCSS(element);
 


  return offScreen || cssHidden;
}

export = isElemenVisible;
