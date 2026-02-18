import type { QWElement } from '@qualweb/qw-element';
import elementHasOnePixel from './elementHasOnePixel';
import elementHasContent from './elementHasContent';

function isElementVisible(element: QWElement): boolean {
  const offScreen = element.isOffScreen();
  const cssHidden = window.DomUtils.isElementHiddenByCSS(element);
  const hasContent = elementHasContent(element, true);
  const hasOnePixelHeight = elementHasOnePixel(element);
  const opacityProperty = element.getElementStyleProperty('opacity', '');
  let opacity: number | undefined;
  if (opacityProperty) {
    opacity = parseFloat(opacityProperty);
  }
  let opaqueParent: boolean = false;
  if (element.getElementParent()) {
    opaqueParent = isParentOpaque(element.getElementParent()!);
  }

  return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || (opacity != undefined && opacity === 0) || opaqueParent);
}

function isParentOpaque(element: QWElement): boolean {
  const opacityProperty = element.getElementStyleProperty('opacity', '');
  let opacity: number | undefined;
  if (opacityProperty) {
    opacity = parseFloat(opacityProperty);
  }
  if (opacity != undefined && opacity === 0) {
    return true;
  }
  if (element.getElementParent()) {
    return isParentOpaque(element.getElementParent()!);
  }
  return false;
}

export default isElementVisible;
