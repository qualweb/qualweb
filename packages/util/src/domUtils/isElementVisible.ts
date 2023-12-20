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
    let opaqueParent: boolean = false;
    if (element.getElementParent()) {
        opaqueParent = isParentOpaque(element.getElementParent()!);
    }

    return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || (opacity && opacity === 0) || !opaqueParent);
}

function isParentOpaque(element: typeof window.qwElement): boolean {
    const opacityProperty = element.getElementStyleProperty('opacity', '');
    let opacity: number | undefined;
    if (opacityProperty) {
        opacity = parseInt(opacityProperty);
    }
    if (opacity && opacity === 0) {
        return true;
    }
    if (element.getElementParent()) {
        return isParentOpaque(element.getElementParent()!);
    }
    return false;
}

export default isElementVisible;
