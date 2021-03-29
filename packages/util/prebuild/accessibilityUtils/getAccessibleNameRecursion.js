"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const allowsNameFromContent_1 = __importDefault(require("./allowsNameFromContent"));
const getElementRoleAName_1 = __importDefault(require("./getElementRoleAName"));
const isElementReferencedByAriaLabel_1 = __importDefault(require("./isElementReferencedByAriaLabel"));
const isElementControl_1 = __importDefault(require("./isElementControl"));
const getValueFromEmbeddedControl_1 = __importDefault(require("./getValueFromEmbeddedControl"));
const isElementWidget_1 = __importDefault(require("./isElementWidget"));
const getElementRole_1 = __importDefault(require("./getElementRole"));
const getDefaultName_1 = __importDefault(require("./getDefaultName"));
const getAccessibleNameSVGRecursion_1 = __importDefault(require("./getAccessibleNameSVGRecursion"));
const isElementHidden_1 = __importDefault(require("../domUtils/isElementHidden"));
function getAccessibleNameRecursion(element, recursion, isWidget) {
    let AName, alt, value, placeholder;
    const name = element.getElementTagName();
    const allowNameFromContent = allowsNameFromContent_1.default(element);
    let ariaLabelBy = element.getElementAttribute('aria-labelledby');
    const id = element.getElementAttribute('id');
    if (ariaLabelBy !== null && !verifyAriaLabel(ariaLabelBy, id)) {
        ariaLabelBy = '';
    }
    const ariaLabel = element.getElementAttribute('aria-label');
    const attrType = element.getElementAttribute('type');
    const title = element.getElementAttribute('title');
    const role = getElementRoleAName_1.default(element, '');
    const referencedByAriaLabel = isElementReferencedByAriaLabel_1.default(element);
    if (name === 'svg') {
        AName = getAccessibleNameSVGRecursion_1.default(element, recursion);
    }
    else if (ariaLabelBy && ariaLabelBy !== '' && !(referencedByAriaLabel && recursion)) {
        try {
            AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy);
        }
        catch (e) {
            AName = '';
        }
    }
    else if (ariaLabel && ariaLabel.trim() !== '') {
        AName = ariaLabel;
    }
    else if (isWidget && isElementControl_1.default(element)) {
        AName = getFirstNotUndefined(getValueFromEmbeddedControl_1.default(element), title);
    }
    else if (name === 'area' || (name === 'input' && attrType === 'image')) {
        alt = element.getElementAttribute('alt');
        AName = getFirstNotUndefined(alt, title);
    }
    else if (name === 'img') {
        alt = element.getElementAttribute('alt');
        AName = getFirstNotUndefined(alt, title);
    }
    else if (name === 'input' && (attrType === 'button' || attrType === 'submit' || attrType === 'reset')) {
        value = element.getElementAttribute('value');
        AName = getFirstNotUndefined(value, getDefaultName_1.default(element), title);
    }
    else if (name === 'input' && (!attrType || constants_1.typesWithLabel.indexOf(attrType) >= 0)) {
        placeholder = element.getElementAttribute('placeholder');
        if (!recursion) {
            AName = getFirstNotUndefined(getValueFromLabel(element, id), title, placeholder);
        }
        else {
            AName = getFirstNotUndefined(title, placeholder);
        }
    }
    else if (name && constants_1.formElements.indexOf(name) >= 0) {
        if (!recursion) {
            AName = getFirstNotUndefined(getValueFromLabel(element, id), title);
        }
        else {
            AName = getFirstNotUndefined(title);
        }
    }
    else if (name === 'textarea') {
        placeholder = element.getElementAttribute('placeholder');
        if (!recursion) {
            AName = getFirstNotUndefined(getValueFromLabel(element, id), title, placeholder);
        }
        else {
            AName = getFirstNotUndefined(getTextFromCss(element, isWidget), title, placeholder);
        }
    }
    else if (name === 'figure') {
        AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'figcaption'), title);
    }
    else if (name === 'table') {
        AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'caption'), title);
    }
    else if (name === 'fieldset') {
        AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'legend'), title);
    }
    else if (allowNameFromContent || (((role && allowNameFromContent) || !role) && recursion) || name === 'label') {
        AName = getFirstNotUndefined(getTextFromCss(element, isWidget), title);
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
function getValueFromSpecialLabel(element, label) {
    const labelElement = element.getElement(label);
    let accessNameFromLabel;
    if (labelElement)
        accessNameFromLabel = getAccessibleNameRecursion(labelElement, true, false);
    return accessNameFromLabel;
}
function getValueFromLabel(element, id) {
    const referencedByLabelList = new Array();
    const referencedByLabel = window.qwPage.getElements(`label[for="${id}"]`, element);
    if (referencedByLabel) {
        referencedByLabelList.push(...referencedByLabel);
    }
    const parent = element.getElementParent();
    let result, accessNameFromLabel;
    const isWidget = isElementWidget_1.default(element);
    if (parent && parent.getElementTagName() === 'label' && !isElementPresent(parent, referencedByLabelList)) {
        referencedByLabelList.push(parent);
    }
    for (const label of referencedByLabelList) {
        accessNameFromLabel = getAccessibleNameRecursion(label, true, isWidget);
        if (accessNameFromLabel) {
            if (result) {
                result += accessNameFromLabel;
            }
            else {
                result = accessNameFromLabel;
            }
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
function getAccessibleNameFromAriaLabelledBy(element, ariaLabelId) {
    const ListIdRefs = ariaLabelId.split(' ');
    let result;
    let accessNameFromId;
    const isWidget = isElementWidget_1.default(element);
    const elementID = element.getElementAttribute('id');
    let elem;
    for (const id of ListIdRefs) {
        if (id !== '')
            elem = window.qwPage.getElementByID(id);
        if (elem)
            accessNameFromId = getAccessibleNameRecursion(elem, true, isWidget && elementID !== id);
        if (accessNameFromId) {
            if (result) {
                result += accessNameFromId.trim() + ' ';
            }
            else {
                result = accessNameFromId.trim() + ' ';
            }
            elem = null;
            accessNameFromId = undefined;
        }
    }
    return result ? result.trim() : result;
}
function getTextFromCss(element, isWidget) {
    let before = cleanSVGAndNoneCode(element.getElementStyleProperty('content', ':before'));
    let after = cleanSVGAndNoneCode(element.getElementStyleProperty('content', ':after'));
    const aNameList = getAccessibleNameFromChildren(element, isWidget);
    const textValue = getConcatenatedText(element, aNameList);
    return before.replace(/["']/g, '') + textValue + after.replace(/["']/g, '');
}
function getConcatenatedText(element, aNames) {
    return element.concatANames(aNames);
}
function cleanSVGAndNoneCode(text) {
    if (!text || text === 'none' || text.includes('url(')) {
        text = '';
    }
    return text;
}
function getAccessibleNameFromChildren(element, isWidget) {
    if (!isWidget) {
        isWidget = isElementWidget_1.default(element);
    }
    let aName;
    const children = element.getElementChildren();
    const elementAnames = new Array();
    if (children) {
        for (const child of children) {
            const role = getElementRole_1.default(child);
            if (!isElementHidden_1.default(child) && role !== 'presentation' && role !== 'none') {
                aName = getAccessibleNameRecursion(child, true, isWidget);
                if (aName) {
                    elementAnames.push(aName);
                }
                else {
                    elementAnames.push('');
                }
            }
            else {
                elementAnames.push('');
            }
        }
    }
    return elementAnames;
}
function verifyAriaLabel(ariaLabelBy, elementID) {
    const elementIds = ariaLabelBy.split(' ');
    let result = false;
    for (const id of elementIds) {
        if (!result && id !== '' && elementID !== id) {
            result = window.qwPage.getElementByID(id) !== null;
        }
    }
    return result;
}
exports.default = getAccessibleNameRecursion;
