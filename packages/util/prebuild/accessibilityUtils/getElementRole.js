"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAccessibleName_1 = __importDefault(require("./getAccessibleName"));
const getElementRoleAName_1 = __importDefault(require("./getElementRoleAName"));
function getElementRole(elementQW, pageQW) {
    const aName = getAccessibleName_1.default(elementQW, pageQW);
    return getElementRoleAName_1.default(elementQW, pageQW, aName);
}
exports.default = getElementRole;
