"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementInAT_1 = __importDefault(require("./isElementInAT"));
function getAriaOwner(elementQW, pageQW) {
    const id = elementQW.getElementAttribute('id');
    const ariaOwns = pageQW.getElements('[aria-owns]', elementQW);
    let index = 0;
    let ariaOwner;
    while (id && index < ariaOwns.length && !!ariaOwns) {
        const ariaElement = ariaOwns[index];
        const ariaOwnsAttribute = ariaElement.getElementAttribute('aria-owns');
        if (ariaOwnsAttribute) {
            const idArray = ariaOwnsAttribute.split(' ');
            if (idArray.includes(id) && isElementInAT_1.default(ariaElement, pageQW)) {
                ariaOwner = ariaElement;
            }
        }
        index++;
    }
    return ariaOwner || null;
}
exports.default = getAriaOwner;
