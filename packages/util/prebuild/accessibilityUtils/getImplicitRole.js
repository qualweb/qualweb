"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elementImplicitRoles_json_1 = __importDefault(require("./elementImplicitRoles.json"));
const isElementADescendantOfExplicitRole_1 = __importDefault(require("../domUtils/isElementADescendantOfExplicitRole"));
const isElementFocusable_1 = __importDefault(require("./isElementFocusable"));
const elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(require("./elementHasGlobalARIAPropertyOrAttribute"));
function getImplicitRole(element, accessibleName) {
    const name = element.getElementTagName();
    let attributes, role;
    if (name) {
        const roleValues = elementImplicitRoles_json_1.default[name.toLocaleLowerCase()];
        if (roleValues !== undefined) {
            for (const roleValue of roleValues) {
                const special = roleValue['special'];
                attributes = roleValue['attributes'];
                if (attributes.length === 0 || isInList(attributes, element)) {
                    if (!special) {
                        role = roleValue['role'];
                    }
                    else {
                        const heading = new RegExp('h[1-6]');
                        if (name === 'footer' || name === 'header') {
                            role = getRoleHeaderFooter(element, roleValue);
                        }
                        else if (name === 'form' || name === 'section') {
                            if (accessibleName !== undefined) {
                                role = roleValue['role'];
                            }
                        }
                        else if (heading.test(name)) {
                            role = getRoleHeading(element, roleValue);
                        }
                        else if (name === 'img') {
                            role = getRoleImg(element, roleValue);
                        }
                        else if (name === 'input') {
                            role = getRoleInput(element, roleValue);
                        }
                        else if (name === 'li') {
                            role = getRoleLi(element, roleValue);
                        }
                        else if (name === 'option') {
                            role = getRoleOption(element, roleValue);
                        }
                        else if (name === 'select') {
                            role = getRoleSelect(element, roleValue);
                        }
                        else if (name === 'td') {
                            if (isElementADescendantOfExplicitRole_1.default(element, ['table'], [])) {
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
function getRoleHeading(element, roleValue) {
    const ariaLevel = element.getElementAttribute('aria-level');
    let role;
    if (ariaLevel === null || parseInt(ariaLevel) > 0) {
        role = roleValue['role'];
    }
    return role;
}
function getRoleSelect(element, roleValue) {
    const size = element.getElementAttribute('size');
    const multiple = element.getElementAttribute('multiple');
    let role;
    if (multiple !== null && size !== null && parseInt(size, 10) > 1) {
        role = 'listbox';
    }
    else {
        role = roleValue['role'];
    }
    return role;
}
function getRoleHeaderFooter(element, roleValue) {
    let role;
    if (isElementADescendantOfExplicitRole_1.default(element, ['article', 'aside', 'main', 'nav', 'section'], ['article', 'complementary', 'main', 'navigation', 'region'])) {
        role = roleValue['role'];
    }
    return role;
}
function getRoleInput(element, roleValue) {
    const list = element.getElementAttribute('list');
    const type = element.getElementAttribute('type');
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
function getRoleOption(element, roleValue) {
    const parent = element.getElementParent();
    let parentName;
    let role;
    if (parent !== null)
        parentName = parent.getElementTagName();
    if (parentName === 'datalist') {
        role = roleValue['role'];
    }
    return role;
}
function getRoleImg(element, roleValue) {
    const alt = element.getElementAttribute('alt');
    let role;
    if (alt !== '') {
        role = roleValue['role'];
    }
    else if (element.elementHasAttribute('alt') &&
        !(isElementFocusable_1.default(element) || elementHasGlobalARIAPropertyOrAttribute_1.default(element))) {
        role = 'presentation';
    }
    return role;
}
function getRoleLi(element, roleValue) {
    const parent = element.getElementParent();
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
