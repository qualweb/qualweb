"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAccessibleNameRecursion_1 = __importDefault(require("./getAccessibleNameRecursion"));
function getAccessibleName(element) {
    return getAccessibleNameRecursion_1.default(element, false, false);
}
exports.default = getAccessibleName;
