"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowsNameFromContent_1 = __importDefault(require("./allowsNameFromContent"));
const getValueFromEmbeddedControl_1 = __importDefault(require("./getValueFromEmbeddedControl"));
const constants_1 = require("./constants");
const getElementRoleAName_1 = __importDefault(require("./getElementRoleAName"));
const isElementReferencedByAriaLabel_1 = __importDefault(require("./isElementReferencedByAriaLabel"));
const isElementControl_1 = __importDefault(require("./isElementControl"));
const isElementWidget_1 = __importDefault(require("./isElementWidget"));
const getDefaultName_1 = __importDefault(require("./getDefaultName"));
function getAccessibleNameSelector(element, pageQW) {
    return getAccessibleNameRecursion(element, pageQW, false, false);
}
function getAccessibleNameRecursion(element, page, recursion, isWidget) {
    let AName, ariaLabelBy;
    const elementSelector = element.getElementSelector();
    const name = element.getElementTagName();
    const allowNameFromContent = allowsNameFromContent_1.default(element);
    ariaLabelBy = element.getElementAttribute('aria-labelledby');
    if (ariaLabelBy !== null && !verifyAriaLabel(ariaLabelBy, page)) {
        ariaLabelBy = '';
    }
    const ariaLabel = element.getElementAttribute('aria-label') ? [elementSelector] : null;
    const attrType = element.getElementAttribute('type');
    const title = element.getElementAttribute('title') ? [elementSelector] : null;
    const alt = element.getElementAttribute('alt') ? [elementSelector] : null;
    const value = element.getElementAttribute('value') ? [elementSelector] : null;
    const placeholder = element.getElementAttribute('placeholder') ? [elementSelector] : null;
    const role = getElementRoleAName_1.default(element, page, '');
    const id = element.getElementAttribute('id');
    const defaultName = getDefaultName_1.default(element) ? ['default'] : null;
    const referencedByAriaLabel = isElementReferencedByAriaLabel_1.default(element, page);
    if (ariaLabelBy && ariaLabelBy !== '' && !(referencedByAriaLabel && recursion)) {
        AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy, page);
    }
    else if (ariaLabel) {
        AName = ariaLabel;
    }
    else if (isWidget && isElementControl_1.default(element, page)) {
        const valueFromEmbeddedControl = getValueFromEmbeddedControl_1.default(element, page) ? elementSelector : null;
        AName = getFirstNotUndefined(valueFromEmbeddedControl, title);
    }
    else if (name === 'area' || (name === 'input' && attrType === 'image')) {
        AName = getFirstNotUndefined(alt, title);
    }
    else if (name === 'img') {
        AName = getFirstNotUndefined(alt, title);
    }
    else if (name === 'input' && (attrType === 'button' || attrType === 'submit' || attrType === 'reset')) {
        AName = getFirstNotUndefined(value, defaultName, title);
    }
    else if (name === 'input' && (!attrType || constants_1.typesWithLabel.indexOf(attrType) >= 0)) {
        if (!recursion) {
            AName = getFirstNotUndefined(getValueFromLabel(element, id, page), title, placeholder);
        }
        else {
            AName = getFirstNotUndefined(title, placeholder);
        }
    }
    else if (name && constants_1.formElements.indexOf(name) >= 0) {
        if (!recursion) {
            AName = getFirstNotUndefined(getValueFromLabel(element, id, page), title);
        }
        else {
            AName = getFirstNotUndefined(title);
        }
    }
    else if (name === 'textarea') {
        if (!recursion) {
            AName = getFirstNotUndefined(getValueFromLabel(element, id, page), title, placeholder);
        }
        else {
            AName = getFirstNotUndefined(getTextFromCss(element, page, isWidget), title, placeholder);
        }
    }
    else if (name === 'figure') {
        AName = getFirstNotUndefined(...(getValueFromSpecialLabel(element, 'figcaption', page) || []), title);
    }
    else if (name === 'table') {
        AName = getFirstNotUndefined(...(getValueFromSpecialLabel(element, 'caption', page) || []), title);
    }
    else if (name === 'fieldset') {
        AName = getFirstNotUndefined(...(getValueFromSpecialLabel(element, 'legend', page) || []), title);
    }
    else if (allowNameFromContent || (((role && allowNameFromContent) || !role) && recursion)) {
        AName = getFirstNotUndefined(...getTextFromCss(element, page, isWidget), title);
    }
    else {
        AName = getFirstNotUndefined(title);
    }
    return AName;
}
function getFirstNotUndefined(...args) {
    let result;
    let i = 0;
    let arg;
    let end = false;
    while (i < args.length && !end) {
        arg = args[i];
        if (arg !== undefined && arg !== null) {
            result = arg;
            if (String(arg).trim() !== '') {
                end = true;
            }
        }
        i++;
    }
    return result;
}
function getValueFromSpecialLabel(element, label, page) {
    const labelElement = element.getElement(label);
    let accessNameFromLabel, result;
    if (labelElement)
        accessNameFromLabel = getAccessibleNameRecursion(labelElement, page, true, false);
    if (accessNameFromLabel)
        result = [element.getElementSelector()];
    return result;
}
function getValueFromLabel(element, id, page) {
    const referencedByLabelList = new Array();
    const referencedByLabel = page.getElements(`label[for="${id}"]`, element);
    if (referencedByLabel) {
        referencedByLabelList.push(...referencedByLabel);
    }
    const parent = element.getElementParent();
    const isWidget = isElementWidget_1.default(element, page);
    if (parent && parent.getElementTagName() === 'label' && !isElementPresent(parent, referencedByLabelList)) {
        referencedByLabelList.push(parent);
    }
    const result = new Array();
    for (const label of referencedByLabelList) {
        const accessNameFromLabel = getAccessibleNameRecursion(label, page, true, isWidget);
        if (accessNameFromLabel) {
            result.push(label.getElementSelector());
        }
    }
    return result;
}
function isElementPresent(element, listElement) {
    let result = false;
    let i = 0;
    const elementSelector = element.getElementSelector();
    while (i < listElement.length && !result) {
        result = elementSelector === listElement[i].getElementSelector();
        i++;
    }
    return result;
}
function getAccessibleNameFromAriaLabelledBy(element, ariaLabelId, page) {
    const ListIdRefs = ariaLabelId.split(' ');
    const result = new Array();
    let accessNameFromId;
    const isWidget = isElementWidget_1.default(element, page);
    const elementID = element.getElementAttribute('id');
    for (const id of ListIdRefs || []) {
        if (id !== '' && elementID !== id) {
            const elem = page.getElementByID(id);
            if (elem) {
                accessNameFromId = getAccessibleNameRecursion(elem, page, true, isWidget);
                if (accessNameFromId) {
                    result.push(elem.getElementSelector());
                }
            }
        }
    }
    return result;
}
function getTextFromCss(element, page, isWidget) {
    const aNameList = getAccessibleNameFromChildren(element, page, isWidget);
    const textValue = getConcatenatedText(element, []) ? element.getElementSelector() : null;
    if (textValue)
        aNameList.push(textValue);
    return aNameList;
}
function getConcatenatedText(element, aNames) {
    if (!element) {
        throw Error('Element is not defined');
    }
    return element.concatANames(aNames);
}
function getAccessibleNameFromChildren(element, page, isWidget) {
    if (!isWidget) {
        isWidget = isElementWidget_1.default(element, page);
    }
    const children = element.getElementChildren();
    const result = new Array();
    let aName;
    if (children) {
        for (const child of children) {
            aName = getAccessibleNameRecursion(child, page, true, isWidget);
            if (aName) {
                result.push(child.getElementSelector());
            }
        }
    }
    return result;
}
function verifyAriaLabel(ariaLabelBy, page) {
    const elementIds = ariaLabelBy.split(' ');
    let result = false;
    for (const id of elementIds) {
        if (!result) {
            result = page.getElementByID(id) !== null;
        }
    }
    return result;
}
exports.default = getAccessibleNameSelector;
