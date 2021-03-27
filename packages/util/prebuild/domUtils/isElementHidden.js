"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementHiddenByCSSAux_1 = __importDefault(require("./isElementHiddenByCSSAux"));
function isElementHidden(elementQW, pageQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    let result;
    const name = elementQW.getElementTagName();
    const type = elementQW.getElementAttribute('type');
    const typeHidden = name === 'input' && type === 'hidden';
    const ariaHidden = elementQW.getElementAttribute('aria-hidden') === 'true';
    const hidden = elementQW.getElementAttribute('hidden') !== null;
    const cssHidden = isElementHiddenByCSSAux_1.default(elementQW);
    const parent = elementQW.getElementParent();
    let parentHidden = false;
    if (parent) {
        parentHidden = isElementHidden(parent, pageQW);
    }
    result = cssHidden || hidden || ariaHidden || parentHidden || typeHidden;
    return result;
}
exports.default = isElementHidden;
