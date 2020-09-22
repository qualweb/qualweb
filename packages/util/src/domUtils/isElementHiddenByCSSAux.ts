'use strict';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

function isElementHiddenByCSSAux(elementQW: QWElement,pageQW:QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }

  let visibility;
  let displayNone;
  const display = elementQW.getElementStyleProperty('display', '');
  displayNone = display ? display.trim() === 'none' : false;
  const visibilityATT = elementQW.getElementStyleProperty('visibility', '');
  visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;

  return visibility || displayNone;
}

export default isElementHiddenByCSSAux;
