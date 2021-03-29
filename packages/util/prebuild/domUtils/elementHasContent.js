"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const textHasTheSameColorOfBackground_1 = __importDefault(require("./textHasTheSameColorOfBackground"));
function elementHasContent(element, checkChildren) {
    let result = false;
    const name = element.getElementTagName();
    if (constants_1.alwaysNotVisible.includes(name)) {
    }
    else if (constants_1.needsControls.includes(name)) {
        const controls = element.getElementProperty('controls');
        result = !!controls;
    }
    else if (constants_1.needsOpen.includes(name)) {
        const open = element.getElementProperty('open');
        result = !!open;
    }
    else if (constants_1.alwaysVisible.includes(name)) {
        result = true;
    }
    else {
        const textHasTheSameColor = textHasTheSameColorOfBackground_1.default(element);
        let text = element.getElementText();
        if (text) {
            text = text.trim();
            result = text !== '' && !textHasTheSameColor;
        }
    }
    const childrenVisible = false;
    if (checkChildren) {
        const children = element.getElementChildren();
        for (const child of children) {
            checkChildren = childrenVisible || elementHasContent(child, checkChildren);
        }
    }
    return result || checkChildren;
}
exports.default = elementHasContent;
