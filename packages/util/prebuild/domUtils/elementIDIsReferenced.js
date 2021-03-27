'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function elementIDIsReferenced(elementQW, pageQW, id, attribute) {
    if (!elementQW || !pageQW) {
        throw Error('Element is not defined');
    }
    let result;
    try {
        result = pageQW.getElement('[' + attribute + `="${id}"]`, elementQW) !== null;
    }
    catch (_a) {
        result = false;
    }
    return result;
}
exports.default = elementIDIsReferenced;
