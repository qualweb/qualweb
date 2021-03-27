'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function elementHasOnePixel(elementQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    const height = elementQW.getElementStyleProperty('height', '');
    const background = elementQW.getElementStyleProperty('background-color', '');
    const parent = elementQW.getElementParent();
    let parentBackGround;
    if (parent) {
        parentBackGround = elementQW.getElementStyleProperty('background-color', '');
    }
    return (!!height && height.replace(' ', '') === '1px' && (parentBackGround === background || background === 'transparent'));
}
exports.default = elementHasOnePixel;
