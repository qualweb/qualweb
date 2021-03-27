"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementHiddenByCSSAux_1 = __importDefault(require("./isElementHiddenByCSSAux"));
function isElementHiddenByCSS(elementQW, pageQW) {
    const parent = elementQW.getParentAllContexts();
    let parentHidden = false;
    let result;
    if (parent) {
        parentHidden = isElementHiddenByCSS(parent, pageQW);
    }
    result = isElementHiddenByCSSAux_1.default(elementQW) || parentHidden;
    return result;
}
exports.default = isElementHiddenByCSS;
