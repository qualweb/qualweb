
'use strict';
import { QWElement } from '@qualweb/qw-element';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';

function isElementHidden(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const name = elementQW.getElementTagName();
  const type = elementQW.getElementAttribute( "type");
  let typeHidden = name === "input" && type === "hidden";
  const ariaHidden = elementQW.getElementAttribute( 'aria-hidden') === 'true';
  const hidden = elementQW.getElementAttribute( 'hidden') !== null;
  const cssHidden = isElementHiddenByCSSAux(elementQW);
  const parent = elementQW.getElementParent();
  let parentHidden = false;
  if (parent) {
    parentHidden = isElementHidden(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden || typeHidden;
}

export default isElementHidden;
