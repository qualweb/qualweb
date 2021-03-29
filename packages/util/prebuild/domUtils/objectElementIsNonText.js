"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_json_1 = __importDefault(require("./image.json"));
const video_json_1 = __importDefault(require("./video.json"));
const audio_json_1 = __importDefault(require("./audio.json"));
function objectElementIsNonText(element) {
    const data = element.getElementAttribute('data');
    let result = false;
    if (data) {
        const splitted = data.split('.');
        if (splitted.length > 1) {
            const extension = splitted[splitted.length - 1];
            result = image_json_1.default.includes(extension) || video_json_1.default.includes(extension) || audio_json_1.default.includes(extension);
        }
    }
    return result;
}
exports.default = objectElementIsNonText;
