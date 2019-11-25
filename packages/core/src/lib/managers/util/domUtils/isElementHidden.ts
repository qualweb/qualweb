'use strict';

import { ElementHandle } from 'puppeteer';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';
import { getElementParent } from './domUtils';
import getElementAttribute from './getElementAttribute';

async function isElementHidden(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  const ariaHidden = await getElementAttribute(element,'aria-hidden')==='true';
  const hidden = await getElementAttribute(element,'aria-hidden') !== undefined;
  const cssHidden = await isElementHiddenByCSSAux(element);
  const parent = await getElementParent(element);
  let parentHidden = false;

  if (parent) {
    parentHidden = await isElementHidden(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden;
}

export = isElementHidden;
