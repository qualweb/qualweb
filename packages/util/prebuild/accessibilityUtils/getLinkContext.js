"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementRole_1 = __importDefault(require("./getElementRole"));
const isElementInAT_1 = __importDefault(require("./isElementInAT"));
function getLinkContext(element, page) {
    const context = [];
    const parent = element.getElementParent();
    const ariaDescribedByATT = element.getElementAttribute('aria-describedby');
    let ariaDescribedBy = [];
    if (ariaDescribedByATT)
        ariaDescribedBy = ariaDescribedByATT.split(' ');
    if (parent) {
        const role = getElementRole_1.default(parent, page);
        const inAT = isElementInAT_1.default(parent, page);
        const tagName = parent.getElementTagName();
        const id = parent.getElementAttribute('id');
        if (inAT &&
            (tagName === 'p' ||
                role === 'cell' ||
                role === 'gridcell' ||
                role === 'listitem' ||
                (id && ariaDescribedBy.includes(id)))) {
            context.push(parent.getElementSelector());
        }
        getLinkContextAux(parent, page, ariaDescribedBy, context);
    }
    return context;
}
function getLinkContextAux(element, page, ariaDescribedBy, context) {
    const parent = element.getElementParent();
    if (parent) {
        const role = getElementRole_1.default(parent, page);
        const inAT = isElementInAT_1.default(parent, page);
        const tagName = parent.getElementTagName();
        const id = parent.getElementAttribute('id');
        if (inAT &&
            (tagName === 'p' ||
                role === 'cell' ||
                role === 'gridcell' ||
                role === 'listitem' ||
                (id && ariaDescribedBy.includes(id)))) {
            context.push(parent.getElementSelector());
        }
        getLinkContextAux(parent, page, ariaDescribedBy, context);
    }
}
exports.default = getLinkContext;
