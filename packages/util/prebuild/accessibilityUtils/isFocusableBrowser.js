'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isFocusableBrowser(page, element) {
    element.focusElement();
    const focused = page.getFocusedElement();
    return element.getElementSelector() === focused.getElementSelector();
}
exports.default = isFocusableBrowser;
