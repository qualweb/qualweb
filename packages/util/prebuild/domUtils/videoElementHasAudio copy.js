'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function videoElementHasAudio(elementQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    return Number.parseInt(elementQW.getElementProperty('webkitAudioDecodedByteCount')) > 0;
}
exports.default = videoElementHasAudio;
