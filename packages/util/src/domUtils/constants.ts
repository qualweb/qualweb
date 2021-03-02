'use strict';
//needs text content to be visible
//const needsTextContent = ["a", "abbr", "address", "article", "aside", "bdi", "bdo", "blockquote", "caption", "cite", "code", "dd", "dt", "del", "details", "dfn", "dt", "figcaption", "footer", "h1", "h2", "h3", "h4", "h5", "h6", "header", "div", "i", "ins", "kbd", "label", "legend", "li", "main", "form", "mark", "nav"
//   , "ol", "option", "p", "picture", "q", "ruby", "rt", "rp", "s", "samp", "section", "small", "strong", "sub", "sup", "table", "tbody", "thead", "tfoot", "td", "th", "tr", "time", "u", "ul", "var"]
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
const needsOpen = ['dialog'];
const needsControls = ['audio', 'video'];
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
export { alwaysVisible, needsOpen, needsControls, alwaysNotVisible };
