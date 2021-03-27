'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function getTrimmedText(elementQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    let text = elementQW.getElementText();
    if (text) {
        text = text.trim();
    }
    else {
        text = '';
    }
    return text;
}
exports.default = getTrimmedText;
