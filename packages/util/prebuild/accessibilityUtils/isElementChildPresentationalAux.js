"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../accessibilityUtils/constants");
const getElementRole_1 = __importDefault(require("./getElementRole"));
function isElementChildPresentationalAux(element, page) {
    if (!element) {
        throw Error('Element is not defined');
    }
    let result;
    const role = getElementRole_1.default(element, page);
    let childPresentational;
    if (role !== null)
        childPresentational = constants_1.childPresentationalRole.includes(role);
    const parent = element.getElementParent();
    let isParentChildPresentationalVar = false;
    if (parent && !childPresentational) {
        isParentChildPresentationalVar = isElementChildPresentationalAux(parent, page);
    }
    result = childPresentational || isParentChildPresentationalVar;
    return result;
}
exports.default = isElementChildPresentationalAux;
