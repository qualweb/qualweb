"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_pixel_width_1 = __importDefault(require("string-pixel-width"));
function getTextSize(font, fontSize, bold, italic, text) {
    if (font === 'serif') {
        font = 'times new roman';
    }
    else if (font === 'sans-serif') {
        font = 'arial';
    }
    try {
        return string_pixel_width_1.default(text, { font: font, size: fontSize, bold: bold, italic: italic });
    }
    catch (err) {
        return -1;
    }
}
exports.default = getTextSize;
