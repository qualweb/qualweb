import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';

function isElementHiddenByCSS(elementQW: QWElement, pageQW: QWPage): boolean {
  const parent = elementQW.getParentAllContexts();
  let parentHidden = false;
  let result;
  if (parent) {
    parentHidden = isElementHiddenByCSS(parent, pageQW);
  }
  result = isElementHiddenByCSSAux(elementQW) || parentHidden;

  return result;
}

export default isElementHiddenByCSS;
