"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAriaOwner_1 = __importDefault(require("./getAriaOwner"));
const isElementInAT_1 = __importDefault(require("./isElementInAT"));
function getOwnedElements(element) {
    const children = element.getElementChildren();
    const result = new Array();
    const ariaOwnedElements = getAriaOwnedElements(element);
    result.push(...ariaOwnedElements);
    for (const child of children !== null && children !== void 0 ? children : []) {
        result.push(...getOwnedElementsAux(child, element.getElementSelector()));
    }
    return result;
}
function getOwnedElementsAux(element, ownerSelector) {
    let ariaOwner = getAriaOwner_1.default(element);
    if (isElementInAT_1.default(element) && (!ariaOwner || (!!ariaOwner && ariaOwner.getElementSelector() === ownerSelector))) {
        return [element];
    }
    else {
        let children = element.getElementChildren();
        let result = new Array();
        for (const child of children !== null && children !== void 0 ? children : []) {
            result.push(...getOwnedElementsAux(child, ownerSelector));
        }
        return result;
    }
}
function getAriaOwnedElements(element) {
    const ariaOwns = element.getElementAttribute('aria-owns');
    const elements = new Array();
    if (ariaOwns) {
        const splitted = ariaOwns.split(',');
        for (const id of splitted !== null && splitted !== void 0 ? splitted : []) {
            const elem = window.qwPage.getElementByID(id);
            if (!!elem) {
                elements.push(elem);
            }
        }
    }
    return elements;
}
exports.default = getOwnedElements;
