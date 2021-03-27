'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectElementisNonText_1 = __importDefault(require("./objectElementisNonText"));
function getVideoMetadata(elementQW) {
    const duration = parseInt(elementQW.getElementProperty('duration'));
    const hasSoundTrack = objectElementisNonText_1.default(elementQW);
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
