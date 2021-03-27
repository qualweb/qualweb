"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementADescendantOfExplicitRole(elementQW, pageQW, names, roles) {
    if (!elementQW || !pageQW) {
        throw Error('Element is not defined');
    }
    const parent = elementQW.getElementParent();
    let result = false;
    let sameRole, sameName;
    if (parent !== null) {
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
            return isElementADescendantOfExplicitRole(parent, pageQW, names, roles);
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
