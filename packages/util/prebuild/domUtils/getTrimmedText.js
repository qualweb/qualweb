"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTrimmedText(elementQW) {
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
