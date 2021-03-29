import elementHasOnePixel from './elementHasOnePixel';
import isElementHiddenByCSS from './isElementHiddenByCSS';
import elementHasContent from './elementHasContent';
import { Cache } from '../cache';

function isElementVisible(element: typeof window.qwElement): boolean {
  const offScreen = element.isOffScreen();
  const cssHidden = isElementHiddenByCSS(element);
  const hasContent = elementHasContent(element, true);
  const hasOnePixelHeight = elementHasOnePixel(element);
  const opacityProperty = element.getElementStyleProperty('opacity', '');
  let opacity;
  if (opacityProperty) {
    opacity = parseInt(opacityProperty);
  }

  return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || (opacity && opacity === 0));
}

//export default isElementVisible;

class Utility {
  @Cache('DomUtils.isElementVisible')
  public static isElementVisible(element: typeof window.qwElement): boolean {
    return isElementVisible(element);
  }
}

export default Utility.isElementVisible;
