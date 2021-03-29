"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ariaAttributesRoles_json_1 = __importDefault(require("./ariaAttributesRoles.json"));
function elementHasGlobalARIAPropertyOrAttribute(element) {
    let elemAttribs = element.getElementAttributesName();
    elemAttribs = elemAttribs.filter((elem) => elem.startsWith('ar'));
    let result = false;
    let i = 0;
    while (!result && i < elemAttribs.length) {
        result = elemAttribs[i] in ariaAttributesRoles_json_1.default && ariaAttributesRoles_json_1.default[elemAttribs[i]].global;
        i++;
    }
    return result;
}
exports.default = elementHasGlobalARIAPropertyOrAttribute;
