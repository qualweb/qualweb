import { QWElement } from '@qualweb/qw-element';
import elementHasOnePixel from './elementHasOnePixel';
import isElementHiddenByCSS from './isElementHiddenByCSS';
import elementHasContent from './elementHasContent';
import { QWPage } from '@qualweb/qw-page';
import { CacheDecorator } from '../decorator';

function isElementVisible(elementQW: QWElement, pageQW: QWPage): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  const offScreen = elementQW.isOffScreen();
  const cssHidden = isElementHiddenByCSS(elementQW, pageQW);
  const hasContent = elementHasContent(elementQW, pageQW, true);
  const hasOnePixelHeight = elementHasOnePixel(elementQW);
  const opacityProperty = elementQW.getElementStyleProperty('opacity', '');
  let opacity;
  if (opacityProperty) {
    opacity = parseInt(opacityProperty);
  }

  return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || (opacity && opacity === 0));
}

//export default isElementVisible;

class Utility {
  @CacheDecorator('DomUtils.isElementVisible')
  public static isElementVisible(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementVisible(elementQW, pageQW);
  }
}

export default Utility.isElementVisible;
