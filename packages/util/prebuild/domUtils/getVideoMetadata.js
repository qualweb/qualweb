"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectElementIsNonText_1 = __importDefault(require("./objectElementIsNonText"));
function getVideoMetadata(element) {
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = objectElementIsNonText_1.default(element);
    const result = {
        puppeteer: {
            video: { duration: {} },
            audio: { hasSoundTrack: {} },
            error: {}
        }
    };
    result.puppeteer.video.duration = duration;
    result.puppeteer.audio.hasSoundTrack = hasSoundTrack;
    result.puppeteer.error = !(duration >= 0 && hasSoundTrack);
    return result;
}
exports.default = getVideoMetadata;
