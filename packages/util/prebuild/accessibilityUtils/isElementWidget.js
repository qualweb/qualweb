"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const getElementRoleAName_1 = __importDefault(require("./getElementRoleAName"));
function isElementWidget(element) {
    const role = getElementRoleAName_1.default(element, '');
    return role !== null && constants_1.widgetRoles.indexOf(role) >= 0;
}
exports.default = isElementWidget;
