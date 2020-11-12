'use strict';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

function isElementHiddenByCSSAux(elementQW: QWElement, pageQW: QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }

  const display = elementQW.getElementStyleProperty('display', '');
  const displayNone = display ? display.trim() === 'none' : false;
  const visibilityATT = elementQW.getElementStyleProperty('visibility', '');
  const visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;

  return visibility || displayNone;
}

export default isElementHiddenByCSSAux;
