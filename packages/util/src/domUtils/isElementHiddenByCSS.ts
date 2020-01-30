'use strict';

import isElementHiddenByCSSAux from "./isElementHiddenByCSSAux";
import { ElementHandle } from 'puppeteer';
import getElementParent from "./getElementParent";

async function isElementHiddenByCSS(element: ElementHandle): Promise<boolean> {
  const parent = await getElementParent(element);
  let parentHidden = false;
  if (parent) {
    parentHidden = await isElementHiddenByCSS(parent);
  }
  return isElementHiddenByCSSAux(element) || parentHidden;
}

export default isElementHiddenByCSS;
