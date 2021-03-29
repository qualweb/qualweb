"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementHiddenByCSSAux(element) {
    const display = element.getElementStyleProperty('display', '');
    const displayNone = display ? display.trim() === 'none' : false;
    const visibilityATT = element.getElementStyleProperty('visibility', '');
    const visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;
    return visibility || displayNone;
}
exports.default = isElementHiddenByCSSAux;
