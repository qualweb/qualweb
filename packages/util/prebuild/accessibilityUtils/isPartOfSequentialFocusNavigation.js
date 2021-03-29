"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementFocusable_1 = __importDefault(require("./isElementFocusable"));
function isPartOfSequentialFocusNavigation(element) {
    let tabIndexLessThanZero = false;
    const tabindex = element.getElementAttribute('tabindex');
    const tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));
    if (tabindex && tabIndexExistsAndIsNumber) {
        tabIndexLessThanZero = parseInt(tabindex, 10) < 0;
    }
    const focusable = isElementFocusable_1.default(element);
    return (focusable && tabIndexExistsAndIsNumber && !tabIndexLessThanZero) || (focusable && !tabIndexExistsAndIsNumber);
}
exports.default = isPartOfSequentialFocusNavigation;
