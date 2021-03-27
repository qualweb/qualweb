'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function trimImportant(value) {
    return value.replace('!important', '').trim();
}
exports.default = trimImportant;
