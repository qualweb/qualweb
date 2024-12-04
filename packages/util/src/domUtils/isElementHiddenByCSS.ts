import type { QWElement } from '@qualweb/qw-element';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';

function isElementHiddenByCSS(element: QWElement): boolean {
  const parent = element.getParentAllContexts();
  let parentHidden = false;
  if (parent) {
    parentHidden = window.DomUtils.isElementHiddenByCSS(parent);
  }
  return isElementHiddenByCSSAux(element) || parentHidden;
}

export default isElementHiddenByCSS;
