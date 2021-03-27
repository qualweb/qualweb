"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementFocusableByDefault_1 = __importDefault(require("./isElementFocusableByDefault"));
const isElementHiddenByCSS_1 = __importDefault(require("../domUtils/isElementHiddenByCSS"));
function isElementFocusable(elementQW, pageQW) {
    const disabled = elementQW.getElementAttribute('disabled') !== null;
    if (disabled || isElementHiddenByCSS_1.default(elementQW, pageQW)) {
        return false;
    }
    else if (isElementFocusableByDefault_1.default(elementQW)) {
        return true;
    }
    else {
        let tabIndexLessThanZero = false;
        const tabindex = elementQW.getElementAttribute('tabindex');
        const tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));
        if (tabindex && tabIndexExistsAndIsNumber) {
            tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
        }
        return tabIndexExistsAndIsNumber && !tabIndexLessThanZero;
    }
}
exports.default = isElementFocusable;
