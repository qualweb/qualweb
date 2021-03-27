"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementFocusable_1 = __importDefault(require("./isElementFocusable"));
const elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(require("./elementHasGlobalARIAPropertyOrAttribute"));
const isElementChildPresentationalAux_1 = __importDefault(require("./isElementChildPresentationalAux"));
function isElementChildPresentational(elementQW, pageQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    const focusable = isElementFocusable_1.default(elementQW, pageQW);
    const hasGlobalARIA = elementHasGlobalARIAPropertyOrAttribute_1.default(elementQW);
    const parent = elementQW.getElementParent();
    let childPresentational = false;
    if (parent && !focusable && !hasGlobalARIA) {
        childPresentational = isElementChildPresentationalAux_1.default(parent, pageQW);
    }
    return !focusable && !hasGlobalARIA && childPresentational;
}
exports.default = isElementChildPresentational;
