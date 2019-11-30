'use strict';

import { ElementHandle } from 'puppeteer';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';

import getElementAttribute from './getElementAttribute';
import getElementParent = require("./getElementParent");

async function isElementHidden(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  const ariaHidden = await getElementAttribute(element,'aria-hidden')==='true';
  const hidden = await getElementAttribute(element,'aria-hidden') !== null;
  const cssHidden = await isElementHiddenByCSSAux(element);
  const parent = await getElementParent(element);
  let parentHidden = false;
  console.log(ariaHidden+"aria");
  console.log(hidden+"hidden")
  console.log(cssHidden+"css");
  if (parent) {
    parentHidden = await isElementHidden(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden;
}

export = isElementHidden;
