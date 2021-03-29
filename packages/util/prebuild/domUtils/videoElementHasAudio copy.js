"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function videoElementHasAudio(element) {
    return Number.parseInt(element.getElementProperty('webkitAudioDecodedByteCount')) > 0;
}
exports.default = videoElementHasAudio;
