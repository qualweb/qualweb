"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFocusableBrowser(element) {
    element.focusElement();
    const focused = window.qwPage.getFocusedElement();
    return element.getElementSelector() === focused.getElementSelector();
}
exports.default = isFocusableBrowser;
