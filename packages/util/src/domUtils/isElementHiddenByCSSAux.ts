'use strict';

import { ElementHandle } from 'puppeteer';
import getElementStyleProperty from './getElementStyleProperty';

async function isElementHiddenByCSSAux(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  let visibility;
  let displayNone;
  const display = await getElementStyleProperty(element,  'display','');
  displayNone = display ? display.trim() === 'none' : false;
  const visibilityATT = await getElementStyleProperty(element, 'visibility','');
  visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;


return visibility || displayNone;
}

export default isElementHiddenByCSSAux;
