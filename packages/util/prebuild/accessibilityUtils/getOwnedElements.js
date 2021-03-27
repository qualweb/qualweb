"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAriaOwner_1 = __importDefault(require("./getAriaOwner"));
const isElementInAT_1 = __importDefault(require("./isElementInAT"));
function getOwnedElements(elementQW, pageQW) {
    let children = elementQW.getElementChildren();
    let result = [];
    let ariaOwnedElements = getAriaOwnedElements(elementQW, pageQW);
    result.push(...ariaOwnedElements);
    for (let child of children) {
        result.push(...getOwnedElementsAux(child, pageQW, elementQW.getElementSelector()));
    }
    return result;
}
function getOwnedElementsAux(elementQW, pageQW, ownerSelector) {
    let ariaOwner = getAriaOwner_1.default(elementQW, pageQW);
    if (isElementInAT_1.default(elementQW, pageQW) &&
        (!ariaOwner || (!!ariaOwner && ariaOwner.getElementSelector() === ownerSelector))) {
        return [elementQW];
    }
    else {
        let children = elementQW.getElementChildren();
        let result = [];
        for (let child of children) {
            result.push(...getOwnedElementsAux(child, pageQW, ownerSelector));
        }
        return result;
    }
}
function getAriaOwnedElements(elementQW, pageQW) {
    let ariaOwns = elementQW.getElementAttribute('aria-owns');
    let elements = [];
    if (ariaOwns) {
        let splitted = ariaOwns.split(',');
        for (let id of splitted) {
            let elem = pageQW.getElementByID(id);
            if (!!elem) {
                elements.push(elem);
            }
        }
    }
    return elements;
}
exports.default = getOwnedElements;
