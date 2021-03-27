'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function allowsNameFromContent(element) {
    const name = element.getElementTagName();
    const role = element.getElementAttribute('role');
    return (!!role && constants_1.nameFromContentRoles.indexOf(role) >= 0) || (!!name && constants_1.nameFromContentElements.indexOf(name) >= 0);
}
exports.default = allowsNameFromContent;
