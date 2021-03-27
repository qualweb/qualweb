"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAriaOwner_1 = __importDefault(require("./getAriaOwner"));
const isElementInAT_1 = __importDefault(require("./isElementInAT"));
function getOwnerElement(elementQW, pageQW) {
    const ariaOwner = getAriaOwner_1.default(elementQW, pageQW);
    let ownerElement;
    if (ariaOwner) {
        ownerElement = ariaOwner;
    }
    else {
        let parent = elementQW.getElementParent();
        while (!!parent && !ownerElement) {
            if (isElementInAT_1.default(parent, pageQW))
                ownerElement = parent;
            parent = parent.getElementParent();
        }
    }
    return ownerElement || null;
}
exports.default = getOwnerElement;
