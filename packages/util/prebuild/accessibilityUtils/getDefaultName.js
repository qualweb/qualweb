"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDefaultName(element) {
    let name = element.getElementTagName();
    if (!name)
        name = '';
    let type;
    let result = '';
    if (name === 'input') {
        type = element.getElementAttribute('type');
    }
    if (type === 'submit') {
        result = 'Reset';
    }
    else if (type === 'reset') {
        result = 'Reset';
    }
    return result;
}
exports.default = getDefaultName;
