"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trimImportant_1 = __importDefault(require("./trimImportant"));
var CssUtils;
(function (CssUtils) {
    CssUtils.trimImportant = trimImportant_1.default;
})(CssUtils || (CssUtils = {}));
exports.default = CssUtils;
