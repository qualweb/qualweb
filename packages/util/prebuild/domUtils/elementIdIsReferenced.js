"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function elementIdIsReferenced(element, id, attribute) {
    let result;
    try {
        result = window.qwPage.getElement('[' + attribute + `="${id}"]`, element) !== null;
    }
    catch (_a) {
        result = false;
    }
    return result;
}
exports.default = elementIdIsReferenced;
