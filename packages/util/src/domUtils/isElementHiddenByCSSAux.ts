function isElementHiddenByCSSAux(element: typeof window.qwElement): boolean {
  const display = element.getElementStyleProperty('display', '');
  const displayNone = display ? display.trim() === 'none' : false;
  const visibilityATT = element.getElementStyleProperty('visibility', '');
  const visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;
  return visibility || displayNone;
}

export default isElementHiddenByCSSAux;
