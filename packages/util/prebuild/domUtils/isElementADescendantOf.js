"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementRole_1 = __importDefault(require("../accessibilityUtils/getElementRole"));
function isElementADescendantOf(elementQW, pageQW, names, roles) {
    if (!elementQW || !pageQW) {
        throw Error('Element is not defined');
    }
    const parent = elementQW.getElementParent();
    let result = false;
    let sameRole, sameName;
    if (parent !== null) {
        const parentName = parent.getElementTagName();
        const parentRole = getElementRole_1.default(parent, pageQW);
        if (parentName !== null) {
            sameName = names.includes(parentName);
        }
        if (parentRole !== null) {
            sameRole = roles.includes(parentRole);
        }
        result = sameName || sameRole;
        if (!result) {
            return isElementADescendantOf(parent, pageQW, names, roles);
        }
        else {
            return result;
        }
    }
    else {
        return result;
    }
}
exports.default = isElementADescendantOf;
