"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementADescendantOfExplicitRole(elementQW, names, roles) {
    const parent = elementQW.getElementParent();
    let result = false;
    if (parent !== null) {
        let sameRole = false;
        let sameName = false;
        const parentName = parent.getElementTagName();
        const parentRole = parent.getElementAttribute('role');
        if (parentName !== null) {
            sameName = names.includes(parentName);
        }
        if (parentRole !== null) {
            sameRole = roles.includes(parentRole);
        }
        result = sameName || sameRole;
        if (!result) {
            return isElementADescendantOfExplicitRole(parent, names, roles);
        }
        else {
            return result;
        }
    }
    else {
        return result;
    }
}
exports.default = isElementADescendantOfExplicitRole;
