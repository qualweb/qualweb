'use strict';
import {trim} from 'lodash';

import { ElementHandle } from 'puppeteer';
import getElementStyleProperty from './getElementStyleProperty';

async function isElementHiddenByCSSAux(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  let visibility;
  let displayNone;
  const display = await getElementStyleProperty(element,  'display','');
  displayNone = display ? trim(display) === 'none' : false;
  const visibilityATT = await getElementStyleProperty(element, 'visibility','');
  visibility = visibilityATT ? trim(visibilityATT) === 'collapse' || visibilityATT.trim() === 'hidden' : false;


return visibility || displayNone;
}

export default isElementHiddenByCSSAux;
