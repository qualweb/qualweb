import { QWElement } from '@qualweb/qw-element';

function isElementHiddenByCSSAux(elementQW: QWElement): boolean {
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
