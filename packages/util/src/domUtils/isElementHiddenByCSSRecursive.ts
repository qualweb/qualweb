'use strict';

import { DomElement } from 'htmlparser2';
import isElementHiddenByCSS = require("./isElementHiddenByCSS");

function isElementHiddenByCSSRecursive(element: DomElement): boolean {
  const parent = element.parent;
  let parentHidden = false;
  if (parent) {
    parentHidden = isElementHiddenByCSSRecursive(parent);
  }
  return isElementHiddenByCSS(element) || parentHidden;
}

export = isElementHiddenByCSSRecursive;
