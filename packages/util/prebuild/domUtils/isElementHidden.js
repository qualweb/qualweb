"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementHiddenByCSSAux_1 = __importDefault(require("./isElementHiddenByCSSAux"));
function isElementHidden(element) {
    const name = element.getElementTagName();
    const type = element.getElementAttribute('type');
    const typeHidden = name === 'input' && type === 'hidden';
    const ariaHidden = element.getElementAttribute('aria-hidden') === 'true';
    const hidden = element.getElementAttribute('hidden') !== null;
    const cssHidden = isElementHiddenByCSSAux_1.default(element);
    const parent = element.getElementParent();
    let parentHidden = false;
    if (parent) {
        parentHidden = isElementHidden(parent);
    }
    return cssHidden || hidden || ariaHidden || parentHidden || typeHidden;
}
exports.default = isElementHidden;
