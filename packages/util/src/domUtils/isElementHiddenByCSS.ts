'use strict';

import { QWElement } from '@qualweb/qw-element';
import { QWPage } from "@qualweb/qw-page";
import { DomUtils } from '@qualweb/util';

function isElementHiddenByCSS(elementQW: QWElement, pageQW: QWPage): boolean {
  const parent = elementQW.getParentAllContexts();
  let parentHidden = false;
  let result;
  if (parent) {
    parentHidden = DomUtils.isElementHiddenByCSS(parent, pageQW);
  }
  result = DomUtils.isElementHiddenByCSSAux(elementQW,pageQW) || parentHidden;

  return result;
}

export default isElementHiddenByCSS;
