'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function getTextFromCss(elementQW, textContent) {
    const before = elementQW.getElementStyleProperty('computed-style-before', 'content');
    const after = elementQW.getElementStyleProperty('computed-style-after', 'content');
    return before + textContent + after;
}
exports.default = getTextFromCss;
