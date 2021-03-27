'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAccessibleNameSVGRecursion_1 = __importDefault(require("./getAccessibleNameSVGRecursion"));
function getAccessibleNameSVG(element, page) {
    return getAccessibleNameSVGRecursion_1.default(element, page, false);
}
exports.default = getAccessibleNameSVG;
