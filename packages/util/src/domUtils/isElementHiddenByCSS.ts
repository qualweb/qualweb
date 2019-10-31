'use strict';

import {DomElement} from 'htmlparser2';
import isElementHiddenByCSSAux = require("./isElementHiddenByCSSAux");

function isElementHiddenByCSS(element: DomElement): boolean {
  const parent = element.parent;
  let parentHidden = false;
  if (parent) {
    parentHidden = isElementHiddenByCSS(parent);
  }
  return isElementHiddenByCSSAux(element) || parentHidden;
}

export = isElementHiddenByCSS;
