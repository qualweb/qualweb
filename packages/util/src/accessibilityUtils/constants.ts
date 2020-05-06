'use strict';
const typesWithLabel = ["text", "password", "search", "tel", "email", "url"];
const tabularElements = ["tr", "td", "th"];
const formElements = ["form","select", "option", "datalist", "optgroup","input"];
const sectionAndGrouping = ["span", "article", "section", "nav", "aside", "hgroup", "header", "footer", "address", "p", "hr"
, "blockquote", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "ul", "ol", "dd", "dt", "dl", "figcaption"];
const controlRoles = ["textbox", "button", "combobox", "listbox", "range", "progressbar", "scrollbar", "slider", "spinbutton"];
const widgetElements = ['a', 'button', 'input', 'meter', 'output', 'progress', 'select', 'td', 'textarea', 'li', 'option'];
const widgetRoles = ["button", "checkbox", "gridcell", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "progressbar", "radio", "scrollbar", "searchbox", "separator", "slider", "spinbutton", "switch", "tab", "tabpanel", "textbox", "treeitem"];
const nameFromContentElements = ["button", "h1", "h2", "h3", "h4", "h5", "h6", "a", "link", "option", "output", "summary", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "dfn", "em", "i", "kbd"
    , "mark", "q", "rp", "rt", "ruby", "s", "samp", "small", "strong", "sub", "and", "sup", "time", "u", "var", "wbr"];
const nameFromContentRoles = ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowgroup", "rowheader", "switch", "tab", "tooltip", "tree", "treeitem"];
let noAccessibleObjectOrChild = ["clipPath", "cursor", "defs", "desc", "metadata", "pattern"];
let noAccessibleObject = ["animate", "animateMotion", "animateTransform", "discard", "filter", "hatch", "hatchPath", "linearGradient", "marker", "mask", "meshPatch", "meshRow", "mpath", "radialGradient", "script", "set", "solidColor", "stop", "style", "switch", "view", "title"];
let elementsLikeHtml = ["canvas", "iframe", "source", "track", "video"];
let childPresentationalRole = ["button","checkbox","img","math","menuitemcheckbox","menuitemradio","option","progressbar","radio","scrollbar","separator","slider","switch","tab"];
let textContainer = ["a", "defs", "g", "marker", "mask", "missing-glyph", "pattern", "svg","switch","symbol"];
export{textContainer,childPresentationalRole,elementsLikeHtml,noAccessibleObjectOrChild,noAccessibleObject,typesWithLabel,tabularElements,formElements,sectionAndGrouping,controlRoles,widgetElements,widgetRoles,nameFromContentElements,nameFromContentRoles}
