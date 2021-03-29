"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTextFromCss(element, textContent) {
    const before = element.getElementStyleProperty('computed-style-before', 'content');
    const after = element.getElementStyleProperty('computed-style-after', 'content');
    return before + textContent + after;
}
exports.default = getTextFromCss;
