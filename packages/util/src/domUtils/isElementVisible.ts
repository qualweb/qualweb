import type { QWElement } from '@qualweb/qw-element';
import elementHasOnePixel from './elementHasOnePixel';
import elementHasContent from './elementHasContent';

// parseFloat, not parseInt: computed opacity values are fractions
// (parseInt('0.5') === 0 would treat half-transparent elements as hidden).
function isFullyTransparent(element: QWElement): boolean {
  const opacityProperty = element.getElementStyleProperty('opacity', '');
  return opacityProperty ? parseFloat(opacityProperty) === 0 : false;
}

function isElementVisible(element: QWElement): boolean {
  const offScreen = element.isOffScreen();
  const cssHidden = window.DomUtils.isElementHiddenByCSS(element);
  const hasContent = elementHasContent(element, true);
  const hasOnePixelHeight = elementHasOnePixel(element);
  const transparent = isFullyTransparent(element);
  let opaqueParent: boolean = false;
  if (element.getElementParent()) {
    opaqueParent = isParentOpaque(element.getElementParent()!);
  }

  return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || transparent || opaqueParent);
}

function isParentOpaque(element: QWElement): boolean {
  if (isFullyTransparent(element)) {
    return true;
  }
  if (element.getElementParent()) {
    return isParentOpaque(element.getElementParent()!);
  }
  return false;
}

export default isElementVisible;
