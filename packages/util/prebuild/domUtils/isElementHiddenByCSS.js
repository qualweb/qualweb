"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementHiddenByCSSAux_1 = __importDefault(require("./isElementHiddenByCSSAux"));
function isElementHiddenByCSS(element) {
    const parent = element.getParentAllContexts();
    let parentHidden = false;
    if (parent) {
        parentHidden = isElementHiddenByCSS(parent);
    }
    return isElementHiddenByCSSAux_1.default(element) || parentHidden;
}
exports.default = isElementHiddenByCSS;
