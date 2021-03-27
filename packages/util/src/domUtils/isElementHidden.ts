import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import isElementHiddenByCSSAux from './isElementHiddenByCSSAux';

function isElementHidden(elementQW: QWElement, pageQW: QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let result;

  const name = elementQW.getElementTagName();
  const type = elementQW.getElementAttribute('type');
  const typeHidden = name === 'input' && type === 'hidden';
  const ariaHidden = elementQW.getElementAttribute('aria-hidden') === 'true';
  const hidden = elementQW.getElementAttribute('hidden') !== null;
  const cssHidden = isElementHiddenByCSSAux(elementQW);
  const parent = elementQW.getElementParent();
  let parentHidden = false;
  if (parent) {
    parentHidden = isElementHidden(parent, pageQW);
  }

  result = cssHidden || hidden || ariaHidden || parentHidden || typeHidden;

  return result;
}

export default isElementHidden;
