"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function elementHasOnePixel(element) {
    const height = element.getElementStyleProperty('height', '');
    const background = element.getElementStyleProperty('background-color', '');
    const parent = element.getElementParent();
    let parentBackGround;
    if (parent) {
        parentBackGround = element.getElementStyleProperty('background-color', '');
    }
    return (!!height && height.replace(' ', '') === '1px' && (parentBackGround === background || background === 'transparent'));
}
exports.default = elementHasOnePixel;
