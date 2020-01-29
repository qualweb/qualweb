
'use strict';

import { ElementHandle } from 'puppeteer';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';
import getElementAttribute from './getElementAttribute';
import getElementParent from "./getElementParent";
import getElementTagName from './getElementTagName';

async function isElementHidden(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }
  const name = await getElementTagName(element);
  const type = await getElementAttribute(element,"type")
  let typeHidden = name === "input"&& type === "hidden";
  const ariaHidden = await getElementAttribute(element,'aria-hidden')==='true';
  const hidden = await getElementAttribute(element,'hidden') !== null;
  const cssHidden = await isElementHiddenByCSSAux(element);
  const parent = await getElementParent(element);
  let parentHidden = false;
  if (parent) {
    parentHidden = await isElementHidden(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden|| typeHidden;
}

export = isElementHidden;
