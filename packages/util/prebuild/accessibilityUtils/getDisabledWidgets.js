"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isElementWidget_1 = __importDefault(require("./isElementWidget"));
function getDisabledWidgets(pageQW) {
    const elements = pageQW.getElements('*');
    const disabledElements = [];
    let isWidget, disable, ariaDisable, parent, parentTag;
    for (const element of elements) {
        isWidget = isElementWidget_1.default(element, pageQW);
        disable = element.getElementAttribute('disabled') !== null;
        ariaDisable = element.getElementAttribute('aria-disabled') !== null;
        parent = element.getElementParent();
        if (parent && !(disable || ariaDisable)) {
            parentTag = parent.getElementTagName();
            if (parentTag === 'label') {
                parent = parent.getElementParent();
                disable = parent.getElementAttribute('disabled') !== null;
                ariaDisable = parent.getElementAttribute('aria-disabled') !== null;
            }
        }
        if (isWidget && (disable || ariaDisable)) {
            disabledElements.push(element);
        }
    }
    return disabledElements;
}
exports.default = getDisabledWidgets;
