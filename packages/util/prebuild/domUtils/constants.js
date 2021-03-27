'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.alwaysNotVisible = exports.needsControls = exports.needsOpen = exports.alwaysVisible = void 0;
const alwaysVisible = [
    'button',
    'canvas',
    'embed',
    'fieldset',
    'iframe',
    'img',
    'input',
    'meter',
    'object',
    'output',
    'select',
    'svg',
    'textarea'
];
exports.alwaysVisible = alwaysVisible;
const needsOpen = ['dialog'];
exports.needsOpen = needsOpen;
const needsControls = ['audio', 'video'];
exports.needsControls = needsControls;
const alwaysNotVisible = [
    'area',
    'base',
    'br',
    'col',
    'colgroup',
    'data',
    'datalist',
    'figure',
    'head',
    'hgroup',
    'hr',
    'link',
    'map',
    'noscript',
    'script',
    'optgroup',
    'param',
    'source',
    'style',
    'template',
    'title',
    'track',
    'wbr'
];
exports.alwaysNotVisible = alwaysNotVisible;
