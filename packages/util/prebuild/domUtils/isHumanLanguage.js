"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const languagedetect_1 = __importDefault(require("languagedetect"));
function isHumanLanguage(text) {
    const detector = new languagedetect_1.default();
    return detector.detect(text).length > 0;
}
exports.default = isHumanLanguage;
