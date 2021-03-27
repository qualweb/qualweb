'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function textHasTheSameColorOfBackground(elementQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    const color = elementQW.getElementStyleProperty('color', '');
    const background = elementQW.getElementStyleProperty('background-color', '');
    let text = elementQW.getElementText();
    if (text)
        text = text.trim();
    return color === background && !!text;
}
exports.default = textHasTheSameColorOfBackground;
