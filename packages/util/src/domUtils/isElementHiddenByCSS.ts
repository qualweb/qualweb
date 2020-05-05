'use strict';

import isElementHiddenByCSSAux from "./isElementHiddenByCSSAux";
import getElementParent from "./getElementParent";
import { QWElement } from "../qwElement";

async function isElementHiddenByCSS(elementQW: QWElement): Promise<boolean> {
  const parent = await getElementParent(elementQW);
  let parentHidden = false;
  if (parent) {
    parentHidden = await isElementHiddenByCSS(parent);
  }
  return isElementHiddenByCSSAux(elementQW) || parentHidden;
}

export default isElementHiddenByCSS;
