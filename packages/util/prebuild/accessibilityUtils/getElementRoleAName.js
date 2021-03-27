"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const isElementFocusable_1 = __importDefault(require("./isElementFocusable"));
const elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(require("./elementHasGlobalARIAPropertyOrAttribute"));
const getImplicitRole_1 = __importDefault(require("./getImplicitRole"));
function getElementRoleAName(elementQW, pageQW, aName) {
    const explicitRole = elementQW.getElementAttribute('role');
    let role = explicitRole;
    if (explicitRole === null ||
        ((explicitRole === 'none' || explicitRole === 'presentation') &&
            (isElementFocusable_1.default(elementQW, pageQW) || elementHasGlobalARIAPropertyOrAttribute_1.default(elementQW)))) {
        role = getImplicitRole_1.default(elementQW, pageQW, aName);
    }
    return role;
}
module.exports = getElementRoleAName;
