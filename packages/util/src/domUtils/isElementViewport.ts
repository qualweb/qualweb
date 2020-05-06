 
'use strict';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';
import { QWElement } from '@qualweb/qw-element';

function isElementHidden(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }

  const ariaHidden = elementQW.getElementAttribute('aria-hidden')==='true';
  const hidden = elementQW.getElementAttribute('hidden') !== null;
  const cssHidden = isElementHiddenByCSSAux(elementQW);
  const parent = elementQW.getElementParent();
  let parentHidden = false;
  if (parent) {
    parentHidden = isElementHidden(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden;
}

export default isElementHidden;
