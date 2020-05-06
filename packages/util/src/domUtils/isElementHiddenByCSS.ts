'use strict';

import isElementHiddenByCSSAux from "./isElementHiddenByCSSAux";
import { QWElement } from '@qualweb/qw-element';

function isElementHiddenByCSS(elementQW: QWElement): boolean {
  const parent = elementQW.getElementParent();
  let parentHidden = false;
  if (parent) {
    parentHidden = isElementHiddenByCSS(parent);
  }
  return isElementHiddenByCSSAux(elementQW) || parentHidden;
}

export default isElementHiddenByCSS;
