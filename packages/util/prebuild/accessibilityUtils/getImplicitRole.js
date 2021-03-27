"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elementImplicitRoles_json_1 = __importDefault(require("./elementImplicitRoles.json"));
const isElementADescendantOfExplicitRole_1 = __importDefault(require("../domUtils/isElementADescendantOfExplicitRole"));
const isElementFocusable_1 = __importDefault(require("./isElementFocusable"));
const elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(require("./elementHasGlobalARIAPropertyOrAttribute"));
function getImplicitRole(elementQW, pageQW, accessibleName) {
    const name = elementQW.getElementTagName();
    let attributes, role;
    if (name) {
        const roleValues = elementImplicitRoles_json_1.default[name.toLocaleLowerCase()];
        if (roleValues !== undefined) {
            for (const roleValue of roleValues) {
                const special = roleValue['special'];
                attributes = roleValue['attributes'];
                if (attributes.length === 0 || isInList(attributes, elementQW)) {
                    if (!special) {
                        role = roleValue['role'];
                    }
                    else {
                        const heading = new RegExp('h[1-6]');
                        if (name === 'footer' || name === 'header') {
                            role = getRoleHeaderFooter(elementQW, pageQW, roleValue);
                        }
                        else if (name === 'form' || name === 'section') {
                            if (accessibleName !== undefined) {
                                role = roleValue['role'];
                            }
                        }
                        else if (heading.test(name)) {
                            role = getRoleHeading(elementQW, roleValue);
                        }
                        else if (name === 'img') {
                            role = getRoleImg(elementQW, pageQW, roleValue);
                        }
                        else if (name === 'input') {
                            role = getRoleInput(elementQW, roleValue);
                        }
                        else if (name === 'li') {
                            role = getRoleLi(elementQW, roleValue);
                        }
                        else if (name === 'option') {
                            role = getRoleOption(elementQW, roleValue);
                        }
                        else if (name === 'select') {
                            role = getRoleSelect(elementQW, roleValue);
                        }
                        else if (name === 'td') {
                            if (isElementADescendantOfExplicitRole_1.default(elementQW, pageQW, ['table'], [])) {
                                role = roleValue['role'];
                            }
                        }
                    }
                }
            }
        }
    }
    return role;
}
function getRoleHeading(elementQW, roleValue) {
    const ariaLevel = elementQW.getElementAttribute('aria-level');
    let role;
    if (ariaLevel === null || parseInt(ariaLevel) > 0) {
        role = roleValue['role'];
    }
    return role;
}
function getRoleSelect(elementQW, roleValue) {
    const size = elementQW.getElementAttribute('size');
    const multiple = elementQW.getElementAttribute('multiple');
    let role;
    if (multiple !== null && size !== null && parseInt(size, 10) > 1) {
        role = 'listbox';
    }
    else {
        role = roleValue['role'];
    }
    return role;
}
function getRoleHeaderFooter(elementQW, pageQW, roleValue) {
    let role;
    if (isElementADescendantOfExplicitRole_1.default(elementQW, pageQW, ['article', 'aside', 'main', 'nav', 'section'], ['article', 'complementary', 'main', 'navigation', 'region'])) {
        role = roleValue['role'];
    }
    return role;
}
function getRoleInput(elementQW, roleValue) {
    const list = elementQW.getElementAttribute('list');
    const type = elementQW.getElementAttribute('type');
    let role;
    if (list !== null) {
        role = roleValue['role'];
    }
    else if (type === 'search') {
        role = 'searchbox';
    }
    else {
        role = 'textbox';
    }
    return role;
}
function getRoleOption(elementQW, roleValue) {
    const parent = elementQW.getElementParent();
    let parentName;
    let role;
    if (parent !== null)
        parentName = parent.getElementTagName();
    if (parentName === 'datalist') {
        role = roleValue['role'];
    }
    return role;
}
function getRoleImg(elementQW, pageQW, roleValue) {
    const alt = elementQW.getElementAttribute('alt');
    let role;
    if (alt !== '') {
        role = roleValue['role'];
    }
    else if (elementQW.elementHasAttribute('alt') &&
        !(isElementFocusable_1.default(elementQW, pageQW) || elementHasGlobalARIAPropertyOrAttribute_1.default(elementQW))) {
        role = 'presentation';
    }
    return role;
}
function getRoleLi(elementQW, roleValue) {
    const parent = elementQW.getElementParent();
    let role;
    const parentNames = ['ol', 'ul', 'menu'];
    let parentName;
    if (parent !== null)
        parentName = parent.getElementTagName();
    if (parentName !== null && parentNames.includes(parentName)) {
        role = roleValue['role'];
    }
    return role;
}
function isInList(attributes, element) {
    let result;
    for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        const key = attribute[0];
        const value = attribute[1];
        const roleSpecificATT = element.getElementAttribute(key);
        if (roleSpecificATT === value || (value === '' && roleSpecificATT !== null))
            result = true;
    }
    return result;
}
exports.default = getImplicitRole;
