"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAccessibleName_1 = __importDefault(require("./getAccessibleName"));
function isDataTable(element, pageQW) {
    if (!element) {
        throw Error('Element is not defined');
    }
    const accessibleName = getAccessibleName_1.default(element, pageQW);
    const thElem = element.getElements('th');
    const tdHeaders = element.getElements('td[scope]');
    const tdWithHeaders = element.getElements('td[headers]');
    const presentation = element.getElementAttribute('role') === 'presentation';
    const describedBy = Boolean(element.getElementAttribute('aria-describedby'));
    return presentation
        ? false
        : !!accessibleName || thElem.length > 0 || tdHeaders.length > 0 || tdWithHeaders.length > 0 || describedBy;
}
exports.default = isDataTable;
