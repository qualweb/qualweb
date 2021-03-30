function isElementHidden(element: typeof window.qwElement): boolean {
  const name = element.getElementTagName();
  const type = element.getElementAttribute('type');
  const typeHidden = name === 'input' && type === 'hidden';
  const ariaHidden = element.getElementAttribute('aria-hidden') === 'true';
  const hidden = element.getElementAttribute('hidden') !== null;
  const cssHidden = window.DomUtils.isElementHiddenByCSSAux(element);
  const parent = element.getElementParent();

  let parentHidden = false;
  if (parent) {
    parentHidden = window.DomUtils.isElementHidden(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden || typeHidden;
}

export default isElementHidden;
