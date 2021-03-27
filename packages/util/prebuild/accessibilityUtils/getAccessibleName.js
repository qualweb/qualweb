"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAccessibleNameRecursion_1 = __importDefault(require("./getAccessibleNameRecursion"));
function getAccessibleName(elementQW, pageQW) {
    return getAccessibleNameRecursion_1.default(elementQW, pageQW, false, false);
}
exports.default = getAccessibleName;
