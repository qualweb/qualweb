'use strict';

import isElementHiddenByCSSAux = require("./isElementHiddenByCSSAux");
import { ElementHandle } from 'puppeteer';
import getElementParent = require("./getElementParent");

async function isElementHiddenByCSS(element: ElementHandle): Promise<boolean> {
  const parent = await getElementParent(element);
  let parentHidden = false;
  if (parent) {
    parentHidden = await isElementHiddenByCSS(parent);
  }
  return isElementHiddenByCSSAux(element) || parentHidden;
}

export = isElementHiddenByCSS;
