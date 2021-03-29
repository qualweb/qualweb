"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const isElementFocusable_1 = __importDefault(require("./isElementFocusable"));
const elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(require("./elementHasGlobalARIAPropertyOrAttribute"));
const getImplicitRole_1 = __importDefault(require("./getImplicitRole"));
function getElementRoleAName(element, aName) {
    const explicitRole = element.getElementAttribute('role');
    let role = explicitRole;
    if (explicitRole === null ||
        ((explicitRole === 'none' || explicitRole === 'presentation') &&
            (isElementFocusable_1.default(element) || elementHasGlobalARIAPropertyOrAttribute_1.default(element)))) {
        role = getImplicitRole_1.default(element, aName);
    }
    return role;
}
module.exports = getElementRoleAName;
