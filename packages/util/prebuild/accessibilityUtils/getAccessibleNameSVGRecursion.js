"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const isElementReferencedByAriaLabel_1 = __importDefault(require("./isElementReferencedByAriaLabel"));
const getAccessibleName_1 = __importDefault(require("./getAccessibleName"));
const getTrimmedText_1 = __importDefault(require("../domUtils/getTrimmedText"));
const isElementHidden_1 = __importDefault(require("../domUtils/isElementHidden"));
function getAccessibleNameSVGRecursion(element, page, recursion) {
    let AName, ariaLabelBy, tag;
    tag = element.getElementTagName();
    if (!tag)
        tag = '';
    const regex = new RegExp('^fe[a-zA-Z]+');
    ariaLabelBy = element.getElementAttribute('aria-labelledby');
    if (ariaLabelBy !== null && page.getElementByID(ariaLabelBy) === null) {
        ariaLabelBy = '';
    }
    const ariaLabel = element.getElementAttribute('aria-label');
    const referencedByAriaLabel = isElementReferencedByAriaLabel_1.default(element, page);
    const title = element.getElementChildTextContent('title');
    const titleAtt = element.getElementAttribute('xlink:title');
    const href = element.getElementAttribute('href');
    const roleLink = tag === 'a' && href !== undefined;
    if ((isElementHidden_1.default(element, page) ||
        hasParentOfName(element, constants_1.noAccessibleObjectOrChild) ||
        constants_1.noAccessibleObject.indexOf(tag) >= 0 ||
        constants_1.noAccessibleObjectOrChild.indexOf(tag) >= 0 ||
        regex.test(tag)) &&
        !recursion) {
    }
    else if (ariaLabelBy && ariaLabelBy !== '' && !(referencedByAriaLabel && recursion)) {
        AName = getAccessibleNameFromAriaLabelledBy(page, element, ariaLabelBy);
    }
    else if (constants_1.elementsLikeHtml.indexOf(tag) >= 0) {
        AName = getAccessibleName_1.default(element, page);
    }
    else if (ariaLabel && ariaLabel.trim() !== '') {
        AName = ariaLabel;
    }
    else if (title && title.trim() !== '') {
        AName = title;
    }
    else if (titleAtt && titleAtt.trim() !== '' && roleLink) {
        AName = titleAtt;
    }
    else if (roleLink) {
        AName = getTextFromCss(element, page);
    }
    else if (tag && tag === 'text') {
        AName = getTrimmedText_1.default(element);
    }
    return AName;
}
function hasParentOfName(element, name) {
    const parent = element.getElementParent();
    if (parent) {
        const parentName = parent.getElementTagName();
        return (parentName && name.indexOf(parentName) >= 0) || hasParentOfName(parent, name);
    }
    else {
        return false;
    }
}
function getAccessibleNameFromAriaLabelledBy(page, element, ariaLabelId) {
    const ListIdRefs = ariaLabelId.split(' ');
    let result;
    let accessNameFromId;
    let elem;
    const elementID = element.getElementAttribute('id');
    for (const id of ListIdRefs) {
        if (id !== '' && elementID !== id)
            elem = page.getElementByID(id);
        if (elem)
            accessNameFromId = getAccessibleNameSVGRecursion(elem, page, true);
        if (accessNameFromId) {
            if (result) {
                result += accessNameFromId;
            }
            else {
                result = accessNameFromId;
            }
        }
    }
    return result;
}
function getAccessibleNameFromChildren(element, page) {
    let aName;
    const children = element.getElementChildren();
    const elementAnames = [];
    if (children) {
        for (const child of children) {
            const name = child.getElementTagName();
            if (constants_1.textContainer.indexOf(name) >= 0) {
                aName = getAccessibleNameSVGRecursion(child, page, true);
                if (aName) {
                    elementAnames.push(aName);
                }
                else {
                    elementAnames.push('');
                }
            }
        }
    }
    return elementAnames;
}
function getTextFromCss(element, page) {
    let before = element.getElementStyleProperty('content', ':before');
    let after = element.getElementStyleProperty('content', ':after');
    const aNameList = getAccessibleNameFromChildren(element, page);
    const textValue = getConcatentedText(element, aNameList);
    if (after === 'none')
        after = '';
    if (before === 'none')
        before = '';
    return before.replace(/["']/g, '') + textValue + after.replace(/["']/g, '');
}
function getConcatentedText(elementQW, aNames) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    let result = '';
    for (const aName of aNames) {
        result += aName;
    }
    return result;
}
exports.default = getAccessibleNameSVGRecursion;
