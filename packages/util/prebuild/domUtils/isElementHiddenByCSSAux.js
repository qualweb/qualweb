"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementHiddenByCSSAux(elementQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    const display = elementQW.getElementStyleProperty('display', '');
    const displayNone = display ? display.trim() === 'none' : false;
    const visibilityATT = elementQW.getElementStyleProperty('visibility', '');
    const visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;
    return visibility || displayNone;
}
exports.default = isElementHiddenByCSSAux;
