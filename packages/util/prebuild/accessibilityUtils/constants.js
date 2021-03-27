'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameFromContentRoles = exports.nameFromContentElements = exports.widgetRoles = exports.widgetElements = exports.controlRoles = exports.sectionAndGrouping = exports.formElements = exports.tabularElements = exports.typesWithLabel = exports.noAccessibleObject = exports.noAccessibleObjectOrChild = exports.elementsLikeHtml = exports.childPresentationalRole = exports.needsToBeInsideDetails = exports.textContainer = exports.notExposedIfEmpy = exports.notDefaultAT = void 0;
const typesWithLabel = ['text', 'password', 'search', 'tel', 'email', 'url'];
exports.typesWithLabel = typesWithLabel;
const tabularElements = ['tr', 'td', 'th'];
exports.tabularElements = tabularElements;
const formElements = ['form', 'select', 'option', 'datalist', 'optgroup', 'input'];
exports.formElements = formElements;
const sectionAndGrouping = [
    'span',
    'article',
    'section',
    'nav',
    'aside',
    'hgroup',
    'header',
    'footer',
    'address',
    'p',
    'hr',
    'blockquote',
    'div',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'li',
    'ul',
    'ol',
    'dd',
    'dt',
    'dl',
    'figcaption'
];
exports.sectionAndGrouping = sectionAndGrouping;
const controlRoles = [
    'textbox',
    'button',
    'combobox',
    'listbox',
    'range',
    'progressbar',
    'scrollbar',
    'slider',
    'spinbutton'
];
exports.controlRoles = controlRoles;
const widgetElements = [
    'a',
    'button',
    'input',
    'meter',
    'output',
    'progress',
    'select',
    'td',
    'textarea',
    'li',
    'option'
];
exports.widgetElements = widgetElements;
const widgetRoles = [
    'button',
    'checkbox',
    'gridcell',
    'link',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'progressbar',
    'radio',
    'scrollbar',
    'searchbox',
    'separator',
    'slider',
    'spinbutton',
    'switch',
    'tab',
    'tabpanel',
    'textbox',
    'treeitem'
];
exports.widgetRoles = widgetRoles;
const nameFromContentElements = [
    'button',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'link',
    'option',
    'output',
    'summary',
    'abbr',
    'b',
    'bdi',
    'bdo',
    'br',
    'cite',
    'code',
    'dfn',
    'em',
    'i',
    'kbd',
    'mark',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'small',
    'strong',
    'sub',
    'and',
    'sup',
    'time',
    'u',
    'var',
    'wbr'
];
exports.nameFromContentElements = nameFromContentElements;
const nameFromContentRoles = [
    'button',
    'cell',
    'checkbox',
    'columnheader',
    'gridcell',
    'heading',
    'link',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'radio',
    'row',
    'rowgroup',
    'rowheader',
    'switch',
    'tab',
    'tooltip',
    'tree',
    'treeitem'
];
exports.nameFromContentRoles = nameFromContentRoles;
const noAccessibleObjectOrChild = ['clipPath', 'cursor', 'defs', 'desc', 'metadata', 'pattern'];
exports.noAccessibleObjectOrChild = noAccessibleObjectOrChild;
const noAccessibleObject = [
    'animate',
    'animateMotion',
    'animateTransform',
    'discard',
    'filter',
    'hatch',
    'hatchPath',
    'linearGradient',
    'marker',
    'mask',
    'meshPatch',
    'meshRow',
    'mpath',
    'radialGradient',
    'script',
    'set',
    'solidColor',
    'stop',
    'style',
    'switch',
    'view',
    'title'
];
exports.noAccessibleObject = noAccessibleObject;
const elementsLikeHtml = ['canvas', 'iframe', 'source', 'track', 'video'];
exports.elementsLikeHtml = elementsLikeHtml;
const childPresentationalRole = [
    'button',
    'checkbox',
    'img',
    'math',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'progressbar',
    'radio',
    'scrollbar',
    'separator',
    'slider',
    'switch',
    'tab'
];
exports.childPresentationalRole = childPresentationalRole;
const textContainer = ['textPath', 'text', 'tspan'];
exports.textContainer = textContainer;
const notDefaultAT = [
    'b',
    'bdi',
    'bdo',
    'br',
    'cite',
    'col',
    'colgroup',
    'data',
    'dfn',
    'em',
    'kbd',
    'link',
    'map',
    'meta',
    'span',
    'noscript',
    'script',
    'param',
    'picture',
    'q',
    's',
    'samp',
    'small',
    'source',
    'strong',
    'style',
    'sub',
    'sup',
    'tbody',
    'thead',
    'tfoot',
    'template',
    'title',
    'track',
    'u',
    'var',
    'wbr'
];
exports.notDefaultAT = notDefaultAT;
const notExposedIfEmpy = ['div', 'p', 'pre'];
exports.notExposedIfEmpy = notExposedIfEmpy;
const needsToBeInsideDetails = ['summary'];
exports.needsToBeInsideDetails = needsToBeInsideDetails;
