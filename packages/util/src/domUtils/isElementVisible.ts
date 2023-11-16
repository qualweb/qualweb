import elementHasOnePixel from './elementHasOnePixel';
import elementHasContent from './elementHasContent';

function isElementVisible(element: typeof window.qwElement): boolean {
  const offScreen = element.isOffScreen();
  const cssHidden = window.DomUtils.isElementHiddenByCSS(element);
  const hasContent = elementHasContent(element, true);
  const hasOnePixelHeight = elementHasOnePixel(element);
  const opacityProperty = element.getElementStyleProperty('opacity', '');
  let opacity: number | undefined;
  if (opacityProperty) {
    opacity = parseInt(opacityProperty);
  }

  return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || (opacity && opacity === 0));
}

export default isElementVisible;
