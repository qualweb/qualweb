"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementRole_1 = __importDefault(require("../accessibilityUtils/getElementRole"));
function isElementADescendantOf(elementQW, names, roles) {
    const parent = elementQW.getElementParent();
    let result = false;
    if (parent !== null) {
        let sameRole = false;
        let sameName = false;
        const parentName = parent.getElementTagName();
        const parentRole = getElementRole_1.default(parent);
        if (parentName !== null) {
            sameName = names.includes(parentName);
        }
        if (parentRole !== null) {
            sameRole = roles.includes(parentRole);
        }
        result = sameName || sameRole;
        if (!result) {
            return isElementADescendantOf(parent, names, roles);
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
