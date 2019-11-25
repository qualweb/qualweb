'use strict';
import {trim} from 'lodash';

import { ElementHandle } from 'puppeteer';
import getElementStyleProperty from './getElementStyleProperty';

async function isElementHiddenByCSSAux(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  let visibility = false;
  let displayNone = false;
  const display = await getElementStyleProperty(element, 'computed-style', 'display');
  displayNone = display ? trim(display) === 'none' : false;
  const visibilityATT = await getElementStyleProperty(element, 'computed-style', 'visibility');
  visibility = visibilityATT ? trim(visibilityATT) === 'collapse' || visibilityATT.trim() === 'hidden' : false;

return visibility || displayNone;
}

export = isElementHiddenByCSSAux;
