"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function textHasTheSameColorOfBackground(element) {
    const color = element.getElementStyleProperty('color', '');
    const background = element.getElementStyleProperty('background-color', '');
    let text = element.getElementText();
    if (text) {
        text = text.trim();
    }
    return color === background && !!text;
}
exports.default = textHasTheSameColorOfBackground;
