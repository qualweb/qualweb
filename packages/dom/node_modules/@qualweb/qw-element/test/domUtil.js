var DomUtilsHTML =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../usr/lib/node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack://DomUtilsHTML/(webpack)/buildin/module.js?");

/***/ }),

/***/ "./dist/domUtils.js":
/*!**************************!*\
  !*** ./dist/domUtils.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass DomUtils {\n    constructor() { }\n}\nexports.DomUtils = DomUtils;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/domUtils.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/ariaAttributesRoles.json":
/*!****************************************************!*\
  !*** ./dist/htmlDomUtils/ariaAttributesRoles.json ***!
  \****************************************************/
/*! exports provided: aria-activedescendant, aria-atomic, aria-autocomplete, aria-busy, aria-checked, aria-colcount, aria-colindex, aria-colspan, aria-controls, aria-current, aria-describedby, aria-details, aria-disabled, aria-dropeffect, aria-errormessage, aria-expanded, aria-flowto, aria-grabbed, aria-haspopup, aria-hidden, aria-invalid, aria-keyshortcuts, aria-label, aria-labelledby, aria-level, aria-live, aria-modal, aria-multiline, aria-multiselectable, aria-orientation, aria-owns, aria-placeholder, aria-posinset, aria-pressed, aria-readonly, aria-relevant, aria-required, aria-roledescription, aria-rowcount, aria-rowindex, aria-rowspan, aria-selected, aria-setsize, aria-sort, aria-valuemax, aria-valuemin, aria-valuenow, aria-valuetext, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"aria-activedescendant\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"id\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-atomic\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-autocomplete\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"inline\\\",\\\"list\\\",\\\"both\\\",\\\"none\\\"],\\\"defaultValue\\\":\\\"none\\\"},\\\"aria-busy\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-checked\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"false\\\",\\\"mixed\\\",\\\"true\\\",\\\"undefined\\\"],\\\"defaultValue\\\":\\\"undefined\\\"},\\\"aria-colcount\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-colindex\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-colspan\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-controls\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"idList\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-current\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"page\\\",\\\"step\\\",\\\"location\\\",\\\"date\\\",\\\"time\\\",\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-describedby\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"idList\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-details\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"id\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-disabled\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-dropeffect\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"list\\\",\\\"values\\\":[\\\"copy\\\",\\\"execute\\\",\\\"link\\\",\\\"move\\\",\\\"none\\\",\\\"popup\\\"],\\\"defaultValue\\\":\\\"none\\\"},\\\"aria-errormessage\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"id\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-expanded\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\",\\\"undefined\\\"],\\\"defaultValue\\\":\\\"undefined\\\"},\\\"aria-flowto\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"idList\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-grabbed\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\",\\\"undefined\\\"],\\\"defaultValue\\\":\\\"undefined\\\"},\\\"aria-haspopup\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"false\\\",\\\"true\\\",\\\"menu\\\",\\\"listbox\\\",\\\"tree\\\",\\\"grid\\\",\\\"dialog\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-hidden\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\",\\\"undefined\\\"],\\\"defaultValue\\\":\\\"undefined\\\"},\\\"aria-invalid\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"grammar\\\",\\\"false\\\",\\\"spelling\\\",\\\"true\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-keyshortcuts\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"string\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-label\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"string\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-labelledby\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"idList\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-level\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-live\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"assertive\\\",\\\"off\\\",\\\"polite\\\"],\\\"defaultValue\\\":\\\"off\\\"},\\\"aria-modal\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-multiline\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-multiselectable\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-orientation\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"horizontal\\\",\\\"undefined\\\",\\\"vertical\\\"],\\\"defaultValue\\\":\\\"undefined\\\"},\\\"aria-owns\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"idList\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-placeholder\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"string\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-posinset\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-pressed\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"false\\\",\\\"mixed\\\",\\\"true\\\",\\\"undefined\\\"],\\\"defaultValue\\\":\\\"undefined\\\"},\\\"aria-readonly\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-relevant\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"list\\\",\\\"values\\\":[\\\"additions\\\",\\\"additions text\\\",\\\"all\\\",\\\"removals\\\",\\\"text\\\"],\\\"defaultValue\\\":\\\"\\\"},\\\"aria-required\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\"],\\\"defaultValue\\\":\\\"false\\\"},\\\"aria-roledescription\\\":{\\\"global\\\":\\\"yes\\\",\\\"typeValue\\\":\\\"string\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-rowcount\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-rowindex\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-rowspan\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-selected\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"true\\\",\\\"false\\\",\\\"undefined\\\"],\\\"defaultValue\\\":\\\"undefined\\\"},\\\"aria-setsize\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"integer\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-sort\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"value\\\",\\\"values\\\":[\\\"ascending\\\",\\\"descending\\\",\\\"none\\\",\\\"other\\\"],\\\"defaultValue\\\":\\\"none\\\"},\\\"aria-valuemax\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"number\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-valuemin\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"number\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-valuenow\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"number\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"},\\\"aria-valuetext\\\":{\\\"global\\\":\\\"no\\\",\\\"typeValue\\\":\\\"string\\\",\\\"values\\\":\\\"\\\",\\\"defaultValue\\\":\\\"\\\"}}\");\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/ariaAttributesRoles.json?");

/***/ }),

/***/ "./dist/htmlDomUtils/converElementToQWElement.js":
/*!*******************************************************!*\
  !*** ./dist/htmlDomUtils/converElementToQWElement.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction converElementToQWElement(element) {\n    let result;\n    if (element) {\n        result = { elementHtml: element };\n    }\n    return result;\n}\nexports.default = converElementToQWElement;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/converElementToQWElement.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/convertElementsToQWElement.js":
/*!*********************************************************!*\
  !*** ./dist/htmlDomUtils/convertElementsToQWElement.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction converElementsToQWElement(elements) {\n    let qwList = [];\n    for (let element of elements) {\n        qwList.push({ elementHtml: element });\n    }\n    return qwList;\n}\nexports.default = converElementsToQWElement;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/convertElementsToQWElement.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/domUtils.js":
/*!***************************************!*\
  !*** ./dist/htmlDomUtils/domUtils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getElementSelector_1 = __importDefault(__webpack_require__(/*! ./getElementSelector */ \"./dist/htmlDomUtils/getElementSelector.js\"));\nconst getSourceElementSelector_1 = __importDefault(__webpack_require__(/*! ./getSourceElementSelector */ \"./dist/htmlDomUtils/getSourceElementSelector.js\"));\nconst getElementHtmlCode_1 = __importDefault(__webpack_require__(/*! ./getElementHtmlCode */ \"./dist/htmlDomUtils/getElementHtmlCode.js\"));\nconst getSourceElementHtmlCode_1 = __importDefault(__webpack_require__(/*! ./getSourceElementHtmlCode */ \"./dist/htmlDomUtils/getSourceElementHtmlCode.js\"));\nconst elementHasAttribute_1 = __importDefault(__webpack_require__(/*! ./elementHasAttribute */ \"./dist/htmlDomUtils/elementHasAttribute.js\"));\nconst elementHasAttributes_1 = __importDefault(__webpack_require__(/*! ./elementHasAttributes */ \"./dist/htmlDomUtils/elementHasAttributes.js\"));\nconst getElementAttribute_1 = __importDefault(__webpack_require__(/*! ./getElementAttribute */ \"./dist/htmlDomUtils/getElementAttribute.js\"));\nconst getSourceElementAttribute_1 = __importDefault(__webpack_require__(/*! ./getSourceElementAttribute */ \"./dist/htmlDomUtils/getSourceElementAttribute.js\"));\nconst getElementStyleProperty_1 = __importDefault(__webpack_require__(/*! ./getElementStyleProperty */ \"./dist/htmlDomUtils/getElementStyleProperty.js\"));\nconst getElementReferencedByHREF_1 = __importDefault(__webpack_require__(/*! ./getElementReferencedByHREF */ \"./dist/htmlDomUtils/getElementReferencedByHREF.js\"));\nconst elementHasChild_1 = __importDefault(__webpack_require__(/*! ./elementHasChild */ \"./dist/htmlDomUtils/elementHasChild.js\"));\nconst getElementChildTextContent_1 = __importDefault(__webpack_require__(/*! ./getElementChildTextContent */ \"./dist/htmlDomUtils/getElementChildTextContent.js\"));\nconst elementHasParent_1 = __importDefault(__webpack_require__(/*! ./elementHasParent */ \"./dist/htmlDomUtils/elementHasParent.js\"));\nconst getElementById_1 = __importDefault(__webpack_require__(/*! ./getElementById */ \"./dist/htmlDomUtils/getElementById.js\"));\nconst getElementText_1 = __importDefault(__webpack_require__(/*! ./getElementText */ \"./dist/htmlDomUtils/getElementText.js\"));\nconst getElementParent_1 = __importDefault(__webpack_require__(/*! ./getElementParent */ \"./dist/htmlDomUtils/getElementParent.js\"));\nconst getElementTagName_1 = __importDefault(__webpack_require__(/*! ./getElementTagName */ \"./dist/htmlDomUtils/getElementTagName.js\"));\nconst getElementType_1 = __importDefault(__webpack_require__(/*! ./getElementType */ \"./dist/htmlDomUtils/getElementType.js\"));\nconst elementHasChildren_1 = __importDefault(__webpack_require__(/*! ./elementHasChildren */ \"./dist/htmlDomUtils/elementHasChildren.js\"));\nconst getElementChildren_1 = __importDefault(__webpack_require__(/*! ./getElementChildren */ \"./dist/htmlDomUtils/getElementChildren.js\"));\nconst getElementAttributesName_1 = __importDefault(__webpack_require__(/*! ./getElementAttributesName */ \"./dist/htmlDomUtils/getElementAttributesName.js\"));\nconst getElementNextSibling_1 = __importDefault(__webpack_require__(/*! ./getElementNextSibling */ \"./dist/htmlDomUtils/getElementNextSibling.js\"));\nconst getElementPreviousSibling_1 = __importDefault(__webpack_require__(/*! ./getElementPreviousSibling */ \"./dist/htmlDomUtils/getElementPreviousSibling.js\"));\nconst isElementHiddenByCSS_1 = __importDefault(__webpack_require__(/*! ./isElementHiddenByCSS */ \"./dist/htmlDomUtils/isElementHiddenByCSS.js\"));\nconst isElementFocusableByDefault_1 = __importDefault(__webpack_require__(/*! ./isElementFocusableByDefault */ \"./dist/htmlDomUtils/isElementFocusableByDefault.js\"));\nconst videoElementHasAudio_1 = __importDefault(__webpack_require__(/*! ./videoElementHasAudio */ \"./dist/htmlDomUtils/videoElementHasAudio.js\"));\nconst getElementByAttributeName_1 = __importDefault(__webpack_require__(/*! ./getElementByAttributeName */ \"./dist/htmlDomUtils/getElementByAttributeName.js\"));\nconst isElementHidden_1 = __importDefault(__webpack_require__(/*! ./isElementHidden */ \"./dist/htmlDomUtils/isElementHidden.js\"));\nconst isElementFocusable_1 = __importDefault(__webpack_require__(/*! ./isElementFocusable */ \"./dist/htmlDomUtils/isElementFocusable.js\"));\nconst getElementAttributes_1 = __importDefault(__webpack_require__(/*! ./getElementAttributes */ \"./dist/htmlDomUtils/getElementAttributes.js\"));\nconst isOffScreen_1 = __importDefault(__webpack_require__(/*! ./isOffScreen */ \"./dist/htmlDomUtils/isOffScreen.js\"));\nconst isElementVisible_1 = __importDefault(__webpack_require__(/*! ./isElementVisible */ \"./dist/htmlDomUtils/isElementVisible.js\"));\nconst elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(__webpack_require__(/*! ./elementHasGlobalARIAPropertyOrAttribute */ \"./dist/htmlDomUtils/elementHasGlobalARIAPropertyOrAttribute.js\"));\nconst elementIDIsReferenced_1 = __importDefault(__webpack_require__(/*! ./elementIDIsReferenced */ \"./dist/htmlDomUtils/elementIDIsReferenced.js\"));\nconst isElementADescendantOfExplicitRole_1 = __importDefault(__webpack_require__(/*! ./isElementADescendantOfExplicitRole */ \"./dist/htmlDomUtils/isElementADescendantOfExplicitRole.js\"));\nconst getPageRootElement_1 = __importDefault(__webpack_require__(/*! ./getPageRootElement */ \"./dist/htmlDomUtils/getPageRootElement.js\"));\nconst isElementPresentation_1 = __importDefault(__webpack_require__(/*! ./isElementPresentation */ \"./dist/htmlDomUtils/isElementPresentation.js\"));\nconst getElementAttribute_2 = __importDefault(__webpack_require__(/*! ./getElementAttribute */ \"./dist/htmlDomUtils/getElementAttribute.js\"));\nconst getElementsInsideElement_1 = __importDefault(__webpack_require__(/*! ./getElementsInsideElement */ \"./dist/htmlDomUtils/getElementsInsideElement.js\"));\nconst getElementInsideElement_1 = __importDefault(__webpack_require__(/*! ./getElementInsideElement */ \"./dist/htmlDomUtils/getElementInsideElement.js\"));\nconst getElementInsideDocument_1 = __importDefault(__webpack_require__(/*! ./getElementInsideDocument */ \"./dist/htmlDomUtils/getElementInsideDocument.js\"));\nconst getElementsInsideDocument_1 = __importDefault(__webpack_require__(/*! ./getElementsInsideDocument */ \"./dist/htmlDomUtils/getElementsInsideDocument.js\"));\nconst domUtils_1 = __webpack_require__(/*! ../domUtils */ \"./dist/domUtils.js\");\nclass DomUtilsHTML extends domUtils_1.DomUtils {\n    constructor() {\n        super();\n        this.getElementsInsideDocument = getElementsInsideDocument_1.default.bind(getElementsInsideDocument_1.default);\n        this.getElementInsideDocument = getElementInsideDocument_1.default.bind(getElementInsideDocument_1.default);\n        this.getElementInsideElement = getElementInsideElement_1.default.bind(getElementInsideElement_1.default);\n        this.getElementsInsideElement = getElementsInsideElement_1.default.bind(getElementsInsideElement_1.default);\n        this.getElementAttribute = getElementAttribute_1.default.bind(getElementAttribute_2.default);\n        this.elementHasAttribute = elementHasAttribute_1.default.bind(elementHasAttribute_1.default);\n        this.getElementSelector = getElementSelector_1.default.bind(getElementSelector_1.default);\n        this.getSourceElementSelector = getSourceElementSelector_1.default.bind(getSourceElementSelector_1.default);\n        this.getElementHtmlCode = getElementHtmlCode_1.default.bind(getElementHtmlCode_1.default);\n        this.elementHasAttributes = elementHasAttributes_1.default.bind(elementHasAttributes_1.default);\n        this.getSourceElementAttribute = getSourceElementAttribute_1.default.bind(getSourceElementAttribute_1.default);\n        this.getElementStyleProperty = getElementStyleProperty_1.default.bind(getElementStyleProperty_1.default);\n        this.getElementReferencedByHREF = getElementReferencedByHREF_1.default.bind(getElementReferencedByHREF_1.default);\n        this.elementHasChild = elementHasChild_1.default.bind(elementHasChild_1.default);\n        this.getElementChildTextContent = getElementChildTextContent_1.default.bind(getElementChildTextContent_1.default);\n        this.elementHasParent = elementHasParent_1.default.bind(elementHasParent_1.default);\n        this.getElementById = getElementById_1.default.bind(getElementById_1.default);\n        this.getElementText = getElementText_1.default.bind(getElementText_1.default);\n        this.getElementParent = getElementParent_1.default.bind(getElementParent_1.default);\n        this.getElementTagName = getElementTagName_1.default.bind(getElementTagName_1.default);\n        this.getElementType = getElementType_1.default.bind(getElementType_1.default);\n        this.elementHasChildren = elementHasChildren_1.default.bind(elementHasChildren_1.default);\n        this.getElementChildren = getElementChildren_1.default.bind(getElementChildren_1.default);\n        this.getElementAttributesName = getElementAttributesName_1.default.bind(getElementAttributesName_1.default);\n        this.getElementNextSibling = getElementNextSibling_1.default.bind(getElementNextSibling_1.default);\n        this.getElementPreviousSibling = getElementPreviousSibling_1.default.bind(getElementPreviousSibling_1.default);\n        this.isElementHiddenByCSS = isElementHiddenByCSS_1.default.bind(isElementHiddenByCSS_1.default);\n        this.isElementFocusableByDefault = isElementFocusableByDefault_1.default.bind(isElementFocusableByDefault_1.default);\n        this.videoElementHasAudio = videoElementHasAudio_1.default.bind(videoElementHasAudio_1.default);\n        this.getElementByAttributeName = getElementByAttributeName_1.default.bind(getElementByAttributeName_1.default);\n        this.isElementHidden = isElementHidden_1.default.bind(isElementHidden_1.default);\n        this.isElementFocusable = isElementFocusable_1.default.bind(isElementFocusable_1.default);\n        this.isElementVisible = isElementVisible_1.default.bind(isElementVisible_1.default);\n        this.elementHasGlobalARIAPropertyOrAttribute = elementHasGlobalARIAPropertyOrAttribute_1.default.bind(elementHasGlobalARIAPropertyOrAttribute_1.default);\n        this.elementIDIsReferenced = elementIDIsReferenced_1.default.bind(elementIDIsReferenced_1.default);\n        this.isElementADescendantOfExplicitRole = isElementADescendantOfExplicitRole_1.default.bind(isElementADescendantOfExplicitRole_1.default);\n        this.getPageRootElement = getPageRootElement_1.default.bind(getPageRootElement_1.default);\n        this.isElementPresentation = isElementPresentation_1.default.bind(isElementPresentation_1.default);\n        this.isOffScreen = isOffScreen_1.default.bind(isOffScreen_1.default);\n        this.getElementAttributes = getElementAttributes_1.default.bind(getElementAttributes_1.default);\n        this.getSourceElementHtmlCode = getSourceElementHtmlCode_1.default.bind(getSourceElementHtmlCode_1.default);\n        this.getElementAttributeFunction = getElementAttribute_1.default.bind(getElementAttribute_1.default);\n    }\n    ;\n}\nexports.default = DomUtilsHTML;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/domUtils.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/elementHasAttribute.js":
/*!**************************************************!*\
  !*** ./dist/htmlDomUtils/elementHasAttribute.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function elementHasAttribute(elementQW, attribute) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return element.getAttributeNames().includes(attribute);\n}\nexports.default = elementHasAttribute;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/elementHasAttribute.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/elementHasAttributes.js":
/*!***************************************************!*\
  !*** ./dist/htmlDomUtils/elementHasAttributes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function elementHasAttributes(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return element.getAttributeNames().length > 0;\n}\nexports.default = elementHasAttributes;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/elementHasAttributes.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/elementHasChild.js":
/*!**********************************************!*\
  !*** ./dist/htmlDomUtils/elementHasChild.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function elementHasChild(elementQW, childName) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    for (const child of element.children) {\n        if (child.tagName.toLowerCase() === childName.toLowerCase()) {\n            return true;\n        }\n    }\n    return false;\n}\nexports.default = elementHasChild;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/elementHasChild.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/elementHasChildren.js":
/*!*************************************************!*\
  !*** ./dist/htmlDomUtils/elementHasChildren.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function elementHasChidren(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return element.children.length > 0;\n}\nexports.default = elementHasChidren;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/elementHasChildren.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/elementHasGlobalARIAPropertyOrAttribute.js":
/*!**********************************************************************!*\
  !*** ./dist/htmlDomUtils/elementHasGlobalARIAPropertyOrAttribute.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ariaAttributesRoles_json_1 = __importDefault(__webpack_require__(/*! ./ariaAttributesRoles.json */ \"./dist/htmlDomUtils/ariaAttributesRoles.json\"));\nconst getElementAttributesName_1 = __importDefault(__webpack_require__(/*! ./getElementAttributesName */ \"./dist/htmlDomUtils/getElementAttributesName.js\"));\nasync function elementHasGlobalARIAPropertyOrAttribute(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let elemAttribs = await getElementAttributesName_1.default(elementQW);\n    let keyArray = Object.keys(ariaAttributesRoles_json_1.default);\n    let result = false;\n    let i = 0;\n    while (!result && i < elemAttribs.length) {\n        result = keyArray.includes(elemAttribs[i]) && ariaAttributesRoles_json_1.default[elemAttribs[i]].global;\n        i++;\n    }\n    return result;\n}\nexports.default = elementHasGlobalARIAPropertyOrAttribute;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/elementHasGlobalARIAPropertyOrAttribute.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/elementHasParent.js":
/*!***********************************************!*\
  !*** ./dist/htmlDomUtils/elementHasParent.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function elementHasParent(elementQW, parent) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    const parentElement = element['parentElement'];\n    return parentElement ? parentElement['tagName'].toLowerCase() === parent.toLowerCase() : false;\n}\nexports.default = elementHasParent;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/elementHasParent.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/elementIDIsReferenced.js":
/*!****************************************************!*\
  !*** ./dist/htmlDomUtils/elementIDIsReferenced.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function elementIDIsReferenced(pageQW, elementQW, id, atrribute) {\n    if (!elementQW.elementHtml || !pageQW.document) {\n        throw Error('Element is not defined');\n    }\n    let document = pageQW.document;\n    return (document.querySelector('[' + atrribute + `=\"${id}\"]`)) !== null;\n}\nexports.default = elementIDIsReferenced;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/elementIDIsReferenced.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementAttribute.js":
/*!**************************************************!*\
  !*** ./dist/htmlDomUtils/getElementAttribute.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementAttribute(elementQW, attribute) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return element.getAttribute(attribute);\n}\nexports.default = getElementAttribute;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementAttribute.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementAttributes.js":
/*!***************************************************!*\
  !*** ./dist/htmlDomUtils/getElementAttributes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementAttributes(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    const attributes = {};\n    for (const attr of element.getAttributeNames() || []) {\n        attributes[attr] = element.getAttribute(attr);\n    }\n    return attributes;\n}\nexports.default = getElementAttributes;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementAttributes.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementAttributesName.js":
/*!*******************************************************!*\
  !*** ./dist/htmlDomUtils/getElementAttributesName.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementAttributesName(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return element.getAttributeNames();\n}\nexports.default = getElementAttributesName;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementAttributesName.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementByAttributeName.js":
/*!********************************************************!*\
  !*** ./dist/htmlDomUtils/getElementByAttributeName.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converElementToQWElement_1 = __importDefault(__webpack_require__(/*! ./converElementToQWElement */ \"./dist/htmlDomUtils/converElementToQWElement.js\"));\nasync function getElementByAttributeName(pageQW, name) {\n    if (!pageQW.document) {\n        throw Error('Element is not defined');\n    }\n    let document = pageQW.document;\n    return converElementToQWElement_1.default(document.querySelector(`[name=\"${name}\"]`));\n}\nexports.default = getElementByAttributeName;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementByAttributeName.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementById.js":
/*!*********************************************!*\
  !*** ./dist/htmlDomUtils/getElementById.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converElementToQWElement_1 = __importDefault(__webpack_require__(/*! ./converElementToQWElement */ \"./dist/htmlDomUtils/converElementToQWElement.js\"));\nasync function getElementById(pageQW, elementQW, id) {\n    if (!pageQW.document) {\n        throw Error('Element is not defined');\n    }\n    let document = pageQW.document;\n    return converElementToQWElement_1.default(document.querySelector(`#${id}`));\n}\nexports.default = getElementById;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementById.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementChildTextContent.js":
/*!*********************************************************!*\
  !*** ./dist/htmlDomUtils/getElementChildTextContent.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementChildTextContent(elementQW, childName) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    for (const child of element.children || []) {\n        if (child.tagName.toLowerCase() === childName.toLowerCase()) {\n            return child['textContent'] || undefined;\n        }\n    }\n    return undefined;\n}\nexports.default = getElementChildTextContent;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementChildTextContent.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementChildren.js":
/*!*************************************************!*\
  !*** ./dist/htmlDomUtils/getElementChildren.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getElementSelector_1 = __importDefault(__webpack_require__(/*! ./getElementSelector */ \"./dist/htmlDomUtils/getElementSelector.js\"));\nasync function getElementChildren(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    const selector = await getElementSelector_1.default(elementQW);\n    let elements = element.querySelectorAll(selector + ' > *');\n    let qwList = [];\n    for (let element of elements) {\n        qwList.push({ elementHtml: element });\n    }\n    return qwList;\n}\nexports.default = getElementChildren;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementChildren.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementHtmlCode.js":
/*!*************************************************!*\
  !*** ./dist/htmlDomUtils/getElementHtmlCode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementHtmlCode(elementQW, withText = true, fullElement = false) {\n    if (!elementQW.elementHtml) {\n        return '';\n    }\n    let element = elementQW.elementHtml;\n    const clonedElem = element.cloneNode(true);\n    if (fullElement) {\n        return clonedElem.outerHTML;\n    }\n    else if (withText) {\n        const text = clonedElem['text'];\n        clonedElem.innerHTML = text !== undefined ? text : '';\n        return clonedElem.outerHTML;\n    }\n    else {\n        clonedElem.innerHTML = '';\n        return clonedElem.outerHTML;\n    }\n}\nexports.default = getElementHtmlCode;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementHtmlCode.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementInsideDocument.js":
/*!*******************************************************!*\
  !*** ./dist/htmlDomUtils/getElementInsideDocument.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converElementToQWElement_1 = __importDefault(__webpack_require__(/*! ./converElementToQWElement */ \"./dist/htmlDomUtils/converElementToQWElement.js\"));\nasync function getElementInsideDocument(pageQW, selector) {\n    if (!pageQW.document) {\n        throw Error('Element is not defined');\n    }\n    let document = pageQW.document;\n    return converElementToQWElement_1.default(document.querySelector(selector));\n}\nexports.default = getElementInsideDocument;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementInsideDocument.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementInsideElement.js":
/*!******************************************************!*\
  !*** ./dist/htmlDomUtils/getElementInsideElement.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converElementToQWElement_1 = __importDefault(__webpack_require__(/*! ./converElementToQWElement */ \"./dist/htmlDomUtils/converElementToQWElement.js\"));\nasync function getElementInsideElement(elementQW, selector) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return converElementToQWElement_1.default(element.querySelector(selector));\n}\nexports.default = getElementInsideElement;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementInsideElement.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementNextSibling.js":
/*!****************************************************!*\
  !*** ./dist/htmlDomUtils/getElementNextSibling.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converElementToQWElement_1 = __importDefault(__webpack_require__(/*! ./converElementToQWElement */ \"./dist/htmlDomUtils/converElementToQWElement.js\"));\nasync function getElementNextSibling(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return converElementToQWElement_1.default(element.nextElementSibling);\n}\nexports.default = getElementNextSibling;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementNextSibling.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementParent.js":
/*!***********************************************!*\
  !*** ./dist/htmlDomUtils/getElementParent.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converElementToQWElement_1 = __importDefault(__webpack_require__(/*! ./converElementToQWElement */ \"./dist/htmlDomUtils/converElementToQWElement.js\"));\nasync function getElementParent(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return converElementToQWElement_1.default(element.parentElement);\n}\nexports.default = getElementParent;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementParent.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementPreviousSibling.js":
/*!********************************************************!*\
  !*** ./dist/htmlDomUtils/getElementPreviousSibling.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converElementToQWElement_1 = __importDefault(__webpack_require__(/*! ./converElementToQWElement */ \"./dist/htmlDomUtils/converElementToQWElement.js\"));\nasync function getElementPreviousSibling(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return converElementToQWElement_1.default(element.previousElementSibling);\n}\nexports.default = getElementPreviousSibling;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementPreviousSibling.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementProperty.js":
/*!*************************************************!*\
  !*** ./dist/htmlDomUtils/getElementProperty.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementProperty(elementQW, property) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    let propertyValue = element[property];\n    return propertyValue === null ? \"\" : propertyValue;\n}\nexports.default = getElementProperty;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementProperty.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementReferencedByHREF.js":
/*!*********************************************************!*\
  !*** ./dist/htmlDomUtils/getElementReferencedByHREF.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst elementHasAttributes_1 = __importDefault(__webpack_require__(/*! ./elementHasAttributes */ \"./dist/htmlDomUtils/elementHasAttributes.js\"));\nconst getElementAttribute_1 = __importDefault(__webpack_require__(/*! ./getElementAttribute */ \"./dist/htmlDomUtils/getElementAttribute.js\"));\nconst getElementById_1 = __importDefault(__webpack_require__(/*! ./getElementById */ \"./dist/htmlDomUtils/getElementById.js\"));\nconst getElementByAttributeName_1 = __importDefault(__webpack_require__(/*! ./getElementByAttributeName */ \"./dist/htmlDomUtils/getElementByAttributeName.js\"));\nasync function getElementReferencedByHREF(pageQW, elementQW) {\n    if (!elementQW.elementHtml && pageQW.document) {\n        throw Error('Element is not defined');\n    }\n    if (!(await elementHasAttributes_1.default(elementQW))) {\n        return null;\n    }\n    let href = await getElementAttribute_1.default(elementQW, 'href');\n    if (!href) {\n        return null;\n    }\n    if (href.charAt(0) === '#' && href.length > 1) {\n        href = decodeURIComponent(href.substring(1));\n    }\n    else if (href.substr(0, 2) === '/#' && href.length > 2) {\n        href = decodeURIComponent(href.substring(2));\n    }\n    else {\n        return null;\n    }\n    let result = getElementById_1.default(pageQW, elementQW, href);\n    if (result) {\n        return result;\n    }\n    result = getElementByAttributeName_1.default(pageQW, href);\n    if (result) {\n        return result;\n    }\n    return null;\n}\nexports.default = getElementReferencedByHREF;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementReferencedByHREF.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementSelector.js":
/*!*************************************************!*\
  !*** ./dist/htmlDomUtils/getElementSelector.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementSelector(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    if (element.tagName.toLowerCase() === 'html') {\n        return 'html';\n    }\n    else if (element.tagName.toLowerCase() === 'head') {\n        return 'html > head';\n    }\n    else if (element.tagName.toLowerCase() === 'body') {\n        return 'html > body';\n    }\n    let selector = 'html > ';\n    let parents = new Array();\n    let parent = element['parentElement'];\n    while (parent && parent.tagName.toLowerCase() !== 'html') {\n        parents.unshift(getSelfLocationInParent(parent));\n        parent = parent['parentElement'];\n    }\n    selector += parents.join(' > ');\n    selector += ' > ' + getSelfLocationInParent(element);\n    return selector;\n}\nfunction getSelfLocationInParent(elementent) {\n    let selector = '';\n    if (elementent.tagName.toLowerCase() === 'body' || elementent.tagName.toLowerCase() === 'head') {\n        return elementent.tagName.toLowerCase();\n    }\n    let sameEleCount = 0;\n    let prev = elementent.previousElementSibling;\n    while (prev) {\n        if (prev.tagName.toLowerCase() === elementent.tagName.toLowerCase()) {\n            sameEleCount++;\n        }\n        prev = prev.previousElementSibling;\n    }\n    selector += `${elementent.tagName.toLowerCase()}:nth-of-type(${sameEleCount + 1})`;\n    return selector;\n}\nexports.default = getElementSelector;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementSelector.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementStyleProperty.js":
/*!******************************************************!*\
  !*** ./dist/htmlDomUtils/getElementStyleProperty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementStyleProperty(elementQW, property, pseudoStyle = null) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    const styles = getComputedStyle(element, pseudoStyle);\n    return styles.getPropertyValue(property);\n}\nexports.default = getElementStyleProperty;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementStyleProperty.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementTagName.js":
/*!************************************************!*\
  !*** ./dist/htmlDomUtils/getElementTagName.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementTagName(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return element['tagName'].toLowerCase();\n}\nexports.default = getElementTagName;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementTagName.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementText.js":
/*!*********************************************!*\
  !*** ./dist/htmlDomUtils/getElementText.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementText(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    let text = element.textContent;\n    if (text === null)\n        text = \"\";\n    return text;\n}\nexports.default = getElementText;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementText.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementType.js":
/*!*********************************************!*\
  !*** ./dist/htmlDomUtils/getElementType.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function getElementType(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return element['nodeType'] === 1 ? 'tag' : element['nodeType'] === 2 ? 'attribute' : element['nodeType'] === 3 ? 'text' : 'comment';\n}\nexports.default = getElementType;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementType.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementsInsideDocument.js":
/*!********************************************************!*\
  !*** ./dist/htmlDomUtils/getElementsInsideDocument.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst convertElementsToQWElement_1 = __importDefault(__webpack_require__(/*! ./convertElementsToQWElement */ \"./dist/htmlDomUtils/convertElementsToQWElement.js\"));\nasync function getElementsInsideDocument(pageQW, selector) {\n    if (!pageQW.document) {\n        throw Error('Element is not defined');\n    }\n    let document = pageQW.document;\n    return convertElementsToQWElement_1.default(document.querySelectorAll(selector));\n}\nexports.default = getElementsInsideDocument;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementsInsideDocument.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getElementsInsideElement.js":
/*!*******************************************************!*\
  !*** ./dist/htmlDomUtils/getElementsInsideElement.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst convertElementsToQWElement_1 = __importDefault(__webpack_require__(/*! ./convertElementsToQWElement */ \"./dist/htmlDomUtils/convertElementsToQWElement.js\"));\nasync function getElementsInsideElement(elementQW, selector) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    return convertElementsToQWElement_1.default(element.querySelectorAll(selector));\n}\nexports.default = getElementsInsideElement;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getElementsInsideElement.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getPageRootElement.js":
/*!*************************************************!*\
  !*** ./dist/htmlDomUtils/getPageRootElement.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converElementToQWElement_1 = __importDefault(__webpack_require__(/*! ./converElementToQWElement */ \"./dist/htmlDomUtils/converElementToQWElement.js\"));\nasync function getPageRootElement(pageQW) {\n    if (!pageQW.document) {\n        throw Error('Element is not defined');\n    }\n    let document = pageQW.document;\n    return converElementToQWElement_1.default(document.documentElement);\n}\nexports.default = getPageRootElement;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getPageRootElement.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getSourceElementAttribute.js":
/*!********************************************************!*\
  !*** ./dist/htmlDomUtils/getSourceElementAttribute.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction getSourceElementAttribute(element, attribute) {\n    if (!element) {\n        throw Error('Element is not defined');\n    }\n    return element['attribs'] ? element['attribs'][attribute] ? element['attribs'][attribute] : null : null;\n}\nexports.default = getSourceElementAttribute;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getSourceElementAttribute.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getSourceElementHtmlCode.js":
/*!*******************************************************!*\
  !*** ./dist/htmlDomUtils/getSourceElementHtmlCode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst lodash_clone_1 = __importDefault(__webpack_require__(/*! lodash.clone */ \"./node_modules/lodash.clone/index.js\"));\nconst htmlparser_to_html_1 = __importDefault(__webpack_require__(/*! htmlparser-to-html */ \"./node_modules/htmlparser-to-html/index.js\"));\nfunction getSourceElementHtmlCode(element, withText = true, fullElement = false) {\n    if (!element) {\n        throw new Error('Invalid element');\n    }\n    const codeElement = lodash_clone_1.default(element);\n    delete codeElement.attribs.css;\n    if (!fullElement) {\n        if (withText) {\n            const children = lodash_clone_1.default(codeElement.children);\n            codeElement.children = [];\n            for (const child of children || []) {\n                if (child.type === 'text') {\n                    codeElement.children.push(lodash_clone_1.default(child));\n                }\n            }\n        }\n        else {\n            codeElement.children = [];\n        }\n    }\n    return htmlparser_to_html_1.default(codeElement);\n}\nexports.default = getSourceElementHtmlCode;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getSourceElementHtmlCode.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/getSourceElementSelector.js":
/*!*******************************************************!*\
  !*** ./dist/htmlDomUtils/getSourceElementSelector.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction getSelfLocationInParent(element) {\n    let selector = '';\n    if (element['name'] === 'body' || element['name'] === 'head') {\n        return element['name'];\n    }\n    let sameEleCount = 0;\n    let prev = element.prev;\n    while (prev) {\n        if (prev.type === 'tag' && prev['name'] === element['name']) {\n            sameEleCount++;\n        }\n        prev = prev.prev;\n    }\n    selector += `${element['name']}:nth-of-type(${sameEleCount + 1})`;\n    return selector;\n}\nfunction getSourceElementSelector(element) {\n    if (element['name'] === 'html') {\n        return 'html';\n    }\n    else if (element['name'] === 'head') {\n        return 'html > head';\n    }\n    else if (element['name'] === 'body') {\n        return 'html > body';\n    }\n    let selector = 'html > ';\n    let parents = new Array();\n    let parent = element.parent;\n    while (parent && parent['name'] !== 'html') {\n        parents.unshift(getSelfLocationInParent(parent));\n        parent = parent.parent;\n    }\n    selector += parents.join(' > ');\n    selector += ' > ' + getSelfLocationInParent(element);\n    return selector;\n}\nexports.default = getSourceElementSelector;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/getSourceElementSelector.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isElementADescendantOfExplicitRole.js":
/*!*****************************************************************!*\
  !*** ./dist/htmlDomUtils/isElementADescendantOfExplicitRole.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getElementParent_1 = __importDefault(__webpack_require__(/*! ./getElementParent */ \"./dist/htmlDomUtils/getElementParent.js\"));\nconst getElementTagName_1 = __importDefault(__webpack_require__(/*! ./getElementTagName */ \"./dist/htmlDomUtils/getElementTagName.js\"));\nconst getElementAttribute_1 = __importDefault(__webpack_require__(/*! ./getElementAttribute */ \"./dist/htmlDomUtils/getElementAttribute.js\"));\nasync function isElementADescendantOfExplicitRole(elementQW, pageQW, names, roles) {\n    if (!elementQW.elementHtml || !pageQW.document) {\n        throw Error('Element is not defined');\n    }\n    let parent = await getElementParent_1.default(elementQW);\n    let result = false;\n    let sameRole, sameName;\n    if (parent !== null) {\n        let parentName = await getElementTagName_1.default(parent);\n        let parentRole = await getElementAttribute_1.default(parent, \"role\");\n        if (parentName !== null) {\n            sameName = names.includes(parentName);\n        }\n        if (parentRole !== null) {\n            sameRole = roles.includes(parentRole);\n        }\n        result = sameName || sameRole;\n        if (!result) {\n            return await isElementADescendantOfExplicitRole(parent, pageQW, names, roles);\n        }\n        else {\n            return result;\n        }\n    }\n    else {\n        return result;\n    }\n}\nexports.default = isElementADescendantOfExplicitRole;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isElementADescendantOfExplicitRole.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isElementFocusable.js":
/*!*************************************************!*\
  !*** ./dist/htmlDomUtils/isElementFocusable.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isElementFocusableByDefault_1 = __importDefault(__webpack_require__(/*! ./isElementFocusableByDefault */ \"./dist/htmlDomUtils/isElementFocusableByDefault.js\"));\nconst elementHasAttributes_1 = __importDefault(__webpack_require__(/*! ./elementHasAttributes */ \"./dist/htmlDomUtils/elementHasAttributes.js\"));\nconst getElementAttribute_1 = __importDefault(__webpack_require__(/*! ./getElementAttribute */ \"./dist/htmlDomUtils/getElementAttribute.js\"));\nconst isElementHiddenByCSS_1 = __importDefault(__webpack_require__(/*! ./isElementHiddenByCSS */ \"./dist/htmlDomUtils/isElementHiddenByCSS.js\"));\nasync function isElementFocusable(elementQW) {\n    let disabled = false;\n    let hidden = false;\n    let focusableByDefault = false;\n    let tabIndexLessThanZero = false;\n    let tabIndexExistsAndIsNumber = false;\n    const hasAttributes = await elementHasAttributes_1.default(elementQW);\n    const tabindex = await getElementAttribute_1.default(elementQW, 'tabindex');\n    if (hasAttributes) {\n        tabIndexExistsAndIsNumber = tabindex !== null && !isNaN(parseInt(tabindex, 10));\n        disabled = (getElementAttribute_1.default(elementQW, 'disabled')) !== null;\n        hidden = await isElementHiddenByCSS_1.default(elementQW);\n        focusableByDefault = await isElementFocusableByDefault_1.default(elementQW);\n        if (tabindex && tabIndexExistsAndIsNumber) {\n            tabIndexLessThanZero = parseInt(tabindex, 10) < 0;\n        }\n    }\n    if (focusableByDefault) {\n        return !(disabled && hidden && tabIndexLessThanZero);\n    }\n    else {\n        return tabIndexExistsAndIsNumber ? !tabIndexLessThanZero : false;\n    }\n}\nexports.default = isElementFocusable;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isElementFocusable.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isElementFocusableByDefault.js":
/*!**********************************************************!*\
  !*** ./dist/htmlDomUtils/isElementFocusableByDefault.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getElementTagName_1 = __importDefault(__webpack_require__(/*! ./getElementTagName */ \"./dist/htmlDomUtils/getElementTagName.js\"));\nconst elementHasAttribute_1 = __importDefault(__webpack_require__(/*! ./elementHasAttribute */ \"./dist/htmlDomUtils/elementHasAttribute.js\"));\nconst getElementAttribute_1 = __importDefault(__webpack_require__(/*! ./getElementAttribute */ \"./dist/htmlDomUtils/getElementAttribute.js\"));\nconst getElementParent_1 = __importDefault(__webpack_require__(/*! ./getElementParent */ \"./dist/htmlDomUtils/getElementParent.js\"));\nconst getElementChildren_1 = __importDefault(__webpack_require__(/*! ./getElementChildren */ \"./dist/htmlDomUtils/getElementChildren.js\"));\nasync function isElementFocusableByDefault(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    const draggableAttribute = await getElementAttribute_1.default(elementQW, 'draggable');\n    if (draggableAttribute && draggableAttribute === 'true') {\n        return true;\n    }\n    else {\n        const elementName = await getElementTagName_1.default(elementQW);\n        const hasHref = await elementHasAttribute_1.default(elementQW, 'href');\n        const elementAttributeType = await getElementAttribute_1.default(elementQW, 'type');\n        const parent = await getElementParent_1.default(elementQW);\n        let parentName;\n        let parentChildren;\n        if (parent) {\n            parentName = await getElementTagName_1.default(parent);\n            parentChildren = await getElementChildren_1.default(parent);\n        }\n        switch (elementName) {\n            case 'a':\n            case 'area':\n            case 'link':\n                if (hasHref) {\n                    return true;\n                }\n                break;\n            case 'input':\n                return !(elementAttributeType && elementAttributeType !== 'hidden');\n            case 'summary':\n                return !!(parent && parentName === 'details' && parentChildren && element === parentChildren[0]);\n            case 'textarea':\n            case 'select':\n            case 'button':\n                return true;\n        }\n        return false;\n    }\n}\nexports.default = isElementFocusableByDefault;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isElementFocusableByDefault.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isElementHidden.js":
/*!**********************************************!*\
  !*** ./dist/htmlDomUtils/isElementHidden.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isElementHiddenByCSSAux_1 = __importDefault(__webpack_require__(/*! ./isElementHiddenByCSSAux */ \"./dist/htmlDomUtils/isElementHiddenByCSSAux.js\"));\nconst getElementAttribute_1 = __importDefault(__webpack_require__(/*! ./getElementAttribute */ \"./dist/htmlDomUtils/getElementAttribute.js\"));\nconst getElementParent_1 = __importDefault(__webpack_require__(/*! ./getElementParent */ \"./dist/htmlDomUtils/getElementParent.js\"));\nconst getElementTagName_1 = __importDefault(__webpack_require__(/*! ./getElementTagName */ \"./dist/htmlDomUtils/getElementTagName.js\"));\nasync function isElementHidden(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    const name = await getElementTagName_1.default(elementQW);\n    const type = await getElementAttribute_1.default(elementQW, \"type\");\n    let typeHidden = name === \"input\" && type === \"hidden\";\n    const ariaHidden = await getElementAttribute_1.default(elementQW, 'aria-hidden') === 'true';\n    const hidden = await getElementAttribute_1.default(elementQW, 'hidden') !== null;\n    const cssHidden = await isElementHiddenByCSSAux_1.default(elementQW);\n    const parent = await getElementParent_1.default(elementQW);\n    let parentHidden = false;\n    if (parent) {\n        parentHidden = await isElementHidden(parent);\n    }\n    return cssHidden || hidden || ariaHidden || parentHidden || typeHidden;\n}\nexports.default = isElementHidden;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isElementHidden.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isElementHiddenByCSS.js":
/*!***************************************************!*\
  !*** ./dist/htmlDomUtils/isElementHiddenByCSS.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isElementHiddenByCSSAux_1 = __importDefault(__webpack_require__(/*! ./isElementHiddenByCSSAux */ \"./dist/htmlDomUtils/isElementHiddenByCSSAux.js\"));\nconst getElementParent_1 = __importDefault(__webpack_require__(/*! ./getElementParent */ \"./dist/htmlDomUtils/getElementParent.js\"));\nasync function isElementHiddenByCSS(elementQW) {\n    const parent = await getElementParent_1.default(elementQW);\n    let parentHidden = false;\n    if (parent) {\n        parentHidden = await isElementHiddenByCSS(parent);\n    }\n    return isElementHiddenByCSSAux_1.default(elementQW) || parentHidden;\n}\nexports.default = isElementHiddenByCSS;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isElementHiddenByCSS.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isElementHiddenByCSSAux.js":
/*!******************************************************!*\
  !*** ./dist/htmlDomUtils/isElementHiddenByCSSAux.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getElementStyleProperty_1 = __importDefault(__webpack_require__(/*! ./getElementStyleProperty */ \"./dist/htmlDomUtils/getElementStyleProperty.js\"));\nasync function isElementHiddenByCSSAux(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let visibility;\n    let displayNone;\n    const display = await getElementStyleProperty_1.default(elementQW, 'display', '');\n    displayNone = display ? display.trim() === 'none' : false;\n    const visibilityATT = await getElementStyleProperty_1.default(elementQW, 'visibility', '');\n    visibility = visibilityATT ? visibilityATT.trim() === 'collapse' || visibilityATT.trim() === 'hidden' : false;\n    return visibility || displayNone;\n}\nexports.default = isElementHiddenByCSSAux;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isElementHiddenByCSSAux.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isElementPresentation.js":
/*!****************************************************!*\
  !*** ./dist/htmlDomUtils/isElementPresentation.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getElementAttribute_1 = __importDefault(__webpack_require__(/*! ./getElementAttribute */ \"./dist/htmlDomUtils/getElementAttribute.js\"));\nconst isElementFocusable_1 = __importDefault(__webpack_require__(/*! ./isElementFocusable */ \"./dist/htmlDomUtils/isElementFocusable.js\"));\nconst elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(__webpack_require__(/*! ./elementHasGlobalARIAPropertyOrAttribute */ \"./dist/htmlDomUtils/elementHasGlobalARIAPropertyOrAttribute.js\"));\nasync function isElementPresentation(elementQW, pageQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    const role = await getElementAttribute_1.default(elementQW, 'role');\n    let presentationOrNone = role === 'presentation' || role === 'none';\n    const focusable = await isElementFocusable_1.default(elementQW);\n    const hasGlobalARIA = await elementHasGlobalARIAPropertyOrAttribute_1.default(elementQW);\n    let parentPresentation = false;\n    let childPresentational = false;\n    return ((presentationOrNone && !focusable && !hasGlobalARIA) || childPresentational) && !parentPresentation;\n}\nexports.default = isElementPresentation;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isElementPresentation.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isElementVisible.js":
/*!***********************************************!*\
  !*** ./dist/htmlDomUtils/isElementVisible.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst isElementHiddenByCSS_1 = __importDefault(__webpack_require__(/*! ./isElementHiddenByCSS */ \"./dist/htmlDomUtils/isElementHiddenByCSS.js\"));\nconst isOffScreen_1 = __importDefault(__webpack_require__(/*! ./isOffScreen */ \"./dist/htmlDomUtils/isOffScreen.js\"));\nasync function isElementVisible(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    const offScreen = await isOffScreen_1.default(elementQW);\n    const cssHidden = await isElementHiddenByCSS_1.default(elementQW);\n    return !(offScreen || cssHidden);\n}\nexports.default = isElementVisible;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isElementVisible.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/isOffScreen.js":
/*!******************************************!*\
  !*** ./dist/htmlDomUtils/isOffScreen.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nasync function isOffScreen(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    let element = elementQW.elementHtml;\n    let noParentScrolled = function noParentScrolled(element, offset) {\n        element = element['parentElement'];\n        while (element && element.nodeName.toLowerCase() !== 'html') {\n            if (element.scrollTop) {\n                offset += element.scrollTop;\n                if (offset >= 0) {\n                    return false;\n                }\n            }\n            element = element.parentElement;\n        }\n        return true;\n    };\n    let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);\n    let scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientHeight);\n    let bounding = element.getBoundingClientRect();\n    let left = bounding.left;\n    let right = bounding.right;\n    let bottom = bounding.bottom;\n    let top = bounding.top;\n    let noParentScrollTop = noParentScrolled(element, bottom);\n    return left > scrollWidth || right < 0 || bottom < 0 && noParentScrollTop || top > scrollHeight || right === 0 && left === 0;\n}\nexports.default = isOffScreen;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/isOffScreen.js?");

/***/ }),

/***/ "./dist/htmlDomUtils/videoElementHasAudio.js":
/*!***************************************************!*\
  !*** ./dist/htmlDomUtils/videoElementHasAudio.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getElementProperty_1 = __importDefault(__webpack_require__(/*! ./getElementProperty */ \"./dist/htmlDomUtils/getElementProperty.js\"));\nasync function videoElementHasAudio(elementQW) {\n    if (!elementQW.elementHtml) {\n        throw Error('Element is not defined');\n    }\n    return Number.parseInt(await getElementProperty_1.default(elementQW, 'webikitAudioDecodedByteCount')) > 0;\n}\nexports.default = videoElementHasAudio;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/htmlDomUtils/videoElementHasAudio.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst domUtils_1 = __importDefault(__webpack_require__(/*! ./htmlDomUtils/domUtils */ \"./dist/htmlDomUtils/domUtils.js\"));\nexports.DomUtilsHTML = domUtils_1.default;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./dist/index.js?");

/***/ }),

/***/ "./node_modules/htmlparser-to-html/index.js":
/*!**************************************************!*\
  !*** ./node_modules/htmlparser-to-html/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var emptyTags = {\n  \"area\": 1,\n  \"base\": 1,\n  \"basefont\": 1,\n  \"br\": 1,\n  \"col\": 1,\n  \"frame\": 1,\n  \"hr\": 1,\n  \"img\": 1,\n  \"input\": 1,\n  \"isindex\": 1,\n  \"link\": 1,\n  \"meta\": 1,\n  \"param\": 1,\n  \"embed\": 1,\n  \"?xml\": 1\n};\n\nvar ampRe = /&/g,\n    looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,\n    ltRe = /</g,\n    gtRe = />/g,\n    quotRe = /\\\"/g,\n    eqRe = /\\=/g;\n\nvar config = {\n    disableAttribEscape: false\n};\n\nfunction escapeAttrib(s) {\n  if (config.disableAttribEscape === true)\n    return s.toString();\n\n  // null or undefined\n  if(s == null) { return ''; }\n  if(s.toString && typeof s.toString == 'function') {\n    // Escaping '=' defangs many UTF-7 and SGML short-tag attacks.\n    return s.toString().replace(ampRe, '&amp;').replace(ltRe, '&lt;').replace(gtRe, '&gt;')\n            .replace(quotRe, '&#34;').replace(eqRe, '&#61;');\n  } else {\n    return '';\n  }\n}\n\nvar html = function(item, parent, eachFn) {\n  // apply recursively to arrays\n  if(Array.isArray(item)) {\n    return item.map(function(subitem) {\n      // parent, not item: the parent of an array item is not the array,\n      // but rather the element that contained the array\n      return html(subitem, parent, eachFn);\n    }).join('');\n  }\n  var orig = item;\n  if(eachFn) {\n    item = eachFn(item, parent);\n  }\n  if(typeof item != 'undefined' && typeof item.type != 'undefined') {\n    switch(item.type) {\n      case 'text':\n        return item.data;\n      case 'directive':\n        return '<'+item.data+'>';\n      case 'comment':\n        return '<!--'+item.data+'-->';\n      case 'style':\n      case 'script':\n      case 'tag':\n        var result = '<'+item.name;\n        if(item.attribs && Object.keys(item.attribs).length > 0) {\n          result += ' '+Object.keys(item.attribs).map(function(key){\n                  return key + '=\"'+escapeAttrib(item.attribs[key])+'\"';\n                }).join(' ');\n        }\n        if(item.children) {\n          // parent becomes the current element\n          // check if the current item (before any eachFns are run) - is a renderable\n          if(!orig.render) {\n            orig = parent;\n          }\n          result += '>'+html(item.children, orig, eachFn)+(emptyTags[item.name] ? '' : '</'+item.name+'>');\n        } else {\n          if(emptyTags[item.name]) {\n            result += '>';\n          } else {\n            result += '></'+item.name+'>';\n          }\n        }\n        return result;\n      case 'cdata':\n        return '<!CDATA['+item.data+']]>';\n    }\n  }\n  return item;\n}\n\nhtml.configure = function (userConfig) {\n  if(userConfig !== undefined) {\n    for (k in config) {\n      if (userConfig[k] !== undefined){\n        config[k] = userConfig[k];\n      }\n    }\n  }\n}\n\nmodule.exports = html;\n\n\n//# sourceURL=webpack://DomUtilsHTML/./node_modules/htmlparser-to-html/index.js?");

/***/ }),

/***/ "./node_modules/lodash.clone/index.js":
/*!********************************************!*\
  !*** ./node_modules/lodash.clone/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {/**\n * lodash (Custom Build) <https://lodash.com/>\n * Build: `lodash modularize exports=\"npm\" -o ./`\n * Copyright jQuery Foundation and other contributors <https://jquery.org/>\n * Released under MIT license <https://lodash.com/license>\n * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>\n * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors\n */\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    promiseTag = '[object Promise]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to match `RegExp` flags from their coerced string values. */\nvar reFlags = /\\w*$/;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used to detect unsigned integer values. */\nvar reIsUint = /^(?:0|[1-9]\\d*)$/;\n\n/** Used to identify `toStringTag` values supported by `_.clone`. */\nvar cloneableTags = {};\ncloneableTags[argsTag] = cloneableTags[arrayTag] =\ncloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =\ncloneableTags[boolTag] = cloneableTags[dateTag] =\ncloneableTags[float32Tag] = cloneableTags[float64Tag] =\ncloneableTags[int8Tag] = cloneableTags[int16Tag] =\ncloneableTags[int32Tag] = cloneableTags[mapTag] =\ncloneableTags[numberTag] = cloneableTags[objectTag] =\ncloneableTags[regexpTag] = cloneableTags[setTag] =\ncloneableTags[stringTag] = cloneableTags[symbolTag] =\ncloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =\ncloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;\ncloneableTags[errorTag] = cloneableTags[funcTag] =\ncloneableTags[weakMapTag] = false;\n\n/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/**\n * Adds the key-value `pair` to `map`.\n *\n * @private\n * @param {Object} map The map to modify.\n * @param {Array} pair The key-value pair to add.\n * @returns {Object} Returns `map`.\n */\nfunction addMapEntry(map, pair) {\n  // Don't return `map.set` because it's not chainable in IE 11.\n  map.set(pair[0], pair[1]);\n  return map;\n}\n\n/**\n * Adds `value` to `set`.\n *\n * @private\n * @param {Object} set The set to modify.\n * @param {*} value The value to add.\n * @returns {Object} Returns `set`.\n */\nfunction addSetEntry(set, value) {\n  // Don't return `set.add` because it's not chainable in IE 11.\n  set.add(value);\n  return set;\n}\n\n/**\n * A specialized version of `_.forEach` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns `array`.\n */\nfunction arrayEach(array, iteratee) {\n  var index = -1,\n      length = array ? array.length : 0;\n\n  while (++index < length) {\n    if (iteratee(array[index], index, array) === false) {\n      break;\n    }\n  }\n  return array;\n}\n\n/**\n * Appends the elements of `values` to `array`.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {Array} values The values to append.\n * @returns {Array} Returns `array`.\n */\nfunction arrayPush(array, values) {\n  var index = -1,\n      length = values.length,\n      offset = array.length;\n\n  while (++index < length) {\n    array[offset + index] = values[index];\n  }\n  return array;\n}\n\n/**\n * A specialized version of `_.reduce` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {*} [accumulator] The initial value.\n * @param {boolean} [initAccum] Specify using the first element of `array` as\n *  the initial value.\n * @returns {*} Returns the accumulated value.\n */\nfunction arrayReduce(array, iteratee, accumulator, initAccum) {\n  var index = -1,\n      length = array ? array.length : 0;\n\n  if (initAccum && length) {\n    accumulator = array[++index];\n  }\n  while (++index < length) {\n    accumulator = iteratee(accumulator, array[index], index, array);\n  }\n  return accumulator;\n}\n\n/**\n * The base implementation of `_.times` without support for iteratee shorthands\n * or max array length checks.\n *\n * @private\n * @param {number} n The number of times to invoke `iteratee`.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the array of results.\n */\nfunction baseTimes(n, iteratee) {\n  var index = -1,\n      result = Array(n);\n\n  while (++index < n) {\n    result[index] = iteratee(index);\n  }\n  return result;\n}\n\n/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\n/**\n * Checks if `value` is a host object in IE < 9.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a host object, else `false`.\n */\nfunction isHostObject(value) {\n  // Many host objects are `Object` objects that can coerce to strings\n  // despite having improperly defined `toString` methods.\n  var result = false;\n  if (value != null && typeof value.toString != 'function') {\n    try {\n      result = !!(value + '');\n    } catch (e) {}\n  }\n  return result;\n}\n\n/**\n * Converts `map` to its key-value pairs.\n *\n * @private\n * @param {Object} map The map to convert.\n * @returns {Array} Returns the key-value pairs.\n */\nfunction mapToArray(map) {\n  var index = -1,\n      result = Array(map.size);\n\n  map.forEach(function(value, key) {\n    result[++index] = [key, value];\n  });\n  return result;\n}\n\n/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\n/**\n * Converts `set` to an array of its values.\n *\n * @private\n * @param {Object} set The set to convert.\n * @returns {Array} Returns the values.\n */\nfunction setToArray(set) {\n  var index = -1,\n      result = Array(set.size);\n\n  set.forEach(function(value) {\n    result[++index] = value;\n  });\n  return result;\n}\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype,\n    funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar objectToString = objectProto.toString;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined,\n    Symbol = root.Symbol,\n    Uint8Array = root.Uint8Array,\n    getPrototype = overArg(Object.getPrototypeOf, Object),\n    objectCreate = Object.create,\n    propertyIsEnumerable = objectProto.propertyIsEnumerable,\n    splice = arrayProto.splice;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols,\n    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,\n    nativeKeys = overArg(Object.keys, Object);\n\n/* Built-in method references that are verified to be native. */\nvar DataView = getNative(root, 'DataView'),\n    Map = getNative(root, 'Map'),\n    Promise = getNative(root, 'Promise'),\n    Set = getNative(root, 'Set'),\n    WeakMap = getNative(root, 'WeakMap'),\n    nativeCreate = getNative(Object, 'create');\n\n/** Used to detect maps, sets, and weakmaps. */\nvar dataViewCtorString = toSource(DataView),\n    mapCtorString = toSource(Map),\n    promiseCtorString = toSource(Promise),\n    setCtorString = toSource(Set),\n    weakMapCtorString = toSource(WeakMap);\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries ? entries.length : 0;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n}\n\n/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  return this.has(key) && delete this.__data__[key];\n}\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);\n}\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries ? entries.length : 0;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n}\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  return true;\n}\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries ? entries.length : 0;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  return getMapData(this, key)['delete'](key);\n}\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  getMapData(this, key).set(key, value);\n  return this;\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\n/**\n * Creates a stack cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Stack(entries) {\n  this.__data__ = new ListCache(entries);\n}\n\n/**\n * Removes all key-value entries from the stack.\n *\n * @private\n * @name clear\n * @memberOf Stack\n */\nfunction stackClear() {\n  this.__data__ = new ListCache;\n}\n\n/**\n * Removes `key` and its value from the stack.\n *\n * @private\n * @name delete\n * @memberOf Stack\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction stackDelete(key) {\n  return this.__data__['delete'](key);\n}\n\n/**\n * Gets the stack value for `key`.\n *\n * @private\n * @name get\n * @memberOf Stack\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction stackGet(key) {\n  return this.__data__.get(key);\n}\n\n/**\n * Checks if a stack value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Stack\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction stackHas(key) {\n  return this.__data__.has(key);\n}\n\n/**\n * Sets the stack `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Stack\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the stack cache instance.\n */\nfunction stackSet(key, value) {\n  var cache = this.__data__;\n  if (cache instanceof ListCache) {\n    var pairs = cache.__data__;\n    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {\n      pairs.push([key, value]);\n      return this;\n    }\n    cache = this.__data__ = new MapCache(pairs);\n  }\n  cache.set(key, value);\n  return this;\n}\n\n// Add methods to `Stack`.\nStack.prototype.clear = stackClear;\nStack.prototype['delete'] = stackDelete;\nStack.prototype.get = stackGet;\nStack.prototype.has = stackHas;\nStack.prototype.set = stackSet;\n\n/**\n * Creates an array of the enumerable property names of the array-like `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @param {boolean} inherited Specify returning inherited property names.\n * @returns {Array} Returns the array of property names.\n */\nfunction arrayLikeKeys(value, inherited) {\n  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.\n  // Safari 9 makes `arguments.length` enumerable in strict mode.\n  var result = (isArray(value) || isArguments(value))\n    ? baseTimes(value.length, String)\n    : [];\n\n  var length = result.length,\n      skipIndexes = !!length;\n\n  for (var key in value) {\n    if ((inherited || hasOwnProperty.call(value, key)) &&\n        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\n/**\n * Assigns `value` to `key` of `object` if the existing value is not equivalent\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignValue(object, key, value) {\n  var objValue = object[key];\n  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||\n      (value === undefined && !(key in object))) {\n    object[key] = value;\n  }\n}\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\n/**\n * The base implementation of `_.assign` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssign(object, source) {\n  return object && copyObject(source, keys(source), object);\n}\n\n/**\n * The base implementation of `_.clone` and `_.cloneDeep` which tracks\n * traversed objects.\n *\n * @private\n * @param {*} value The value to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @param {boolean} [isFull] Specify a clone including symbols.\n * @param {Function} [customizer] The function to customize cloning.\n * @param {string} [key] The key of `value`.\n * @param {Object} [object] The parent object of `value`.\n * @param {Object} [stack] Tracks traversed objects and their clone counterparts.\n * @returns {*} Returns the cloned value.\n */\nfunction baseClone(value, isDeep, isFull, customizer, key, object, stack) {\n  var result;\n  if (customizer) {\n    result = object ? customizer(value, key, object, stack) : customizer(value);\n  }\n  if (result !== undefined) {\n    return result;\n  }\n  if (!isObject(value)) {\n    return value;\n  }\n  var isArr = isArray(value);\n  if (isArr) {\n    result = initCloneArray(value);\n    if (!isDeep) {\n      return copyArray(value, result);\n    }\n  } else {\n    var tag = getTag(value),\n        isFunc = tag == funcTag || tag == genTag;\n\n    if (isBuffer(value)) {\n      return cloneBuffer(value, isDeep);\n    }\n    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {\n      if (isHostObject(value)) {\n        return object ? value : {};\n      }\n      result = initCloneObject(isFunc ? {} : value);\n      if (!isDeep) {\n        return copySymbols(value, baseAssign(result, value));\n      }\n    } else {\n      if (!cloneableTags[tag]) {\n        return object ? value : {};\n      }\n      result = initCloneByTag(value, tag, baseClone, isDeep);\n    }\n  }\n  // Check for circular references and return its corresponding clone.\n  stack || (stack = new Stack);\n  var stacked = stack.get(value);\n  if (stacked) {\n    return stacked;\n  }\n  stack.set(value, result);\n\n  if (!isArr) {\n    var props = isFull ? getAllKeys(value) : keys(value);\n  }\n  arrayEach(props || value, function(subValue, key) {\n    if (props) {\n      key = subValue;\n      subValue = value[key];\n    }\n    // Recursively populate clone (susceptible to call stack limits).\n    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));\n  });\n  return result;\n}\n\n/**\n * The base implementation of `_.create` without support for assigning\n * properties to the created object.\n *\n * @private\n * @param {Object} prototype The object to inherit from.\n * @returns {Object} Returns the new object.\n */\nfunction baseCreate(proto) {\n  return isObject(proto) ? objectCreate(proto) : {};\n}\n\n/**\n * The base implementation of `getAllKeys` and `getAllKeysIn` which uses\n * `keysFunc` and `symbolsFunc` to get the enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @param {Function} symbolsFunc The function to get the symbols of `object`.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction baseGetAllKeys(object, keysFunc, symbolsFunc) {\n  var result = keysFunc(object);\n  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));\n}\n\n/**\n * The base implementation of `getTag`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  return objectToString.call(value);\n}\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\n/**\n * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeys(object) {\n  if (!isPrototype(object)) {\n    return nativeKeys(object);\n  }\n  var result = [];\n  for (var key in Object(object)) {\n    if (hasOwnProperty.call(object, key) && key != 'constructor') {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\n/**\n * Creates a clone of  `buffer`.\n *\n * @private\n * @param {Buffer} buffer The buffer to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Buffer} Returns the cloned buffer.\n */\nfunction cloneBuffer(buffer, isDeep) {\n  if (isDeep) {\n    return buffer.slice();\n  }\n  var result = new buffer.constructor(buffer.length);\n  buffer.copy(result);\n  return result;\n}\n\n/**\n * Creates a clone of `arrayBuffer`.\n *\n * @private\n * @param {ArrayBuffer} arrayBuffer The array buffer to clone.\n * @returns {ArrayBuffer} Returns the cloned array buffer.\n */\nfunction cloneArrayBuffer(arrayBuffer) {\n  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);\n  new Uint8Array(result).set(new Uint8Array(arrayBuffer));\n  return result;\n}\n\n/**\n * Creates a clone of `dataView`.\n *\n * @private\n * @param {Object} dataView The data view to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned data view.\n */\nfunction cloneDataView(dataView, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;\n  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);\n}\n\n/**\n * Creates a clone of `map`.\n *\n * @private\n * @param {Object} map The map to clone.\n * @param {Function} cloneFunc The function to clone values.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned map.\n */\nfunction cloneMap(map, isDeep, cloneFunc) {\n  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);\n  return arrayReduce(array, addMapEntry, new map.constructor);\n}\n\n/**\n * Creates a clone of `regexp`.\n *\n * @private\n * @param {Object} regexp The regexp to clone.\n * @returns {Object} Returns the cloned regexp.\n */\nfunction cloneRegExp(regexp) {\n  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));\n  result.lastIndex = regexp.lastIndex;\n  return result;\n}\n\n/**\n * Creates a clone of `set`.\n *\n * @private\n * @param {Object} set The set to clone.\n * @param {Function} cloneFunc The function to clone values.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned set.\n */\nfunction cloneSet(set, isDeep, cloneFunc) {\n  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);\n  return arrayReduce(array, addSetEntry, new set.constructor);\n}\n\n/**\n * Creates a clone of the `symbol` object.\n *\n * @private\n * @param {Object} symbol The symbol object to clone.\n * @returns {Object} Returns the cloned symbol object.\n */\nfunction cloneSymbol(symbol) {\n  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};\n}\n\n/**\n * Creates a clone of `typedArray`.\n *\n * @private\n * @param {Object} typedArray The typed array to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned typed array.\n */\nfunction cloneTypedArray(typedArray, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;\n  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);\n}\n\n/**\n * Copies the values of `source` to `array`.\n *\n * @private\n * @param {Array} source The array to copy values from.\n * @param {Array} [array=[]] The array to copy values to.\n * @returns {Array} Returns `array`.\n */\nfunction copyArray(source, array) {\n  var index = -1,\n      length = source.length;\n\n  array || (array = Array(length));\n  while (++index < length) {\n    array[index] = source[index];\n  }\n  return array;\n}\n\n/**\n * Copies properties of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy properties from.\n * @param {Array} props The property identifiers to copy.\n * @param {Object} [object={}] The object to copy properties to.\n * @param {Function} [customizer] The function to customize copied values.\n * @returns {Object} Returns `object`.\n */\nfunction copyObject(source, props, object, customizer) {\n  object || (object = {});\n\n  var index = -1,\n      length = props.length;\n\n  while (++index < length) {\n    var key = props[index];\n\n    var newValue = customizer\n      ? customizer(object[key], source[key], key, object, source)\n      : undefined;\n\n    assignValue(object, key, newValue === undefined ? source[key] : newValue);\n  }\n  return object;\n}\n\n/**\n * Copies own symbol properties of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbols(source, object) {\n  return copyObject(source, getSymbols(source), object);\n}\n\n/**\n * Creates an array of own enumerable property names and symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeys(object) {\n  return baseGetAllKeys(object, keys, getSymbols);\n}\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\n/**\n * Creates an array of the own enumerable symbol properties of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;\n\n/**\n * Gets the `toStringTag` of `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nvar getTag = baseGetTag;\n\n// Fallback for data views, maps, sets, and weak maps in IE 11,\n// for data views in Edge < 14, and promises in Node.js.\nif ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||\n    (Map && getTag(new Map) != mapTag) ||\n    (Promise && getTag(Promise.resolve()) != promiseTag) ||\n    (Set && getTag(new Set) != setTag) ||\n    (WeakMap && getTag(new WeakMap) != weakMapTag)) {\n  getTag = function(value) {\n    var result = objectToString.call(value),\n        Ctor = result == objectTag ? value.constructor : undefined,\n        ctorString = Ctor ? toSource(Ctor) : undefined;\n\n    if (ctorString) {\n      switch (ctorString) {\n        case dataViewCtorString: return dataViewTag;\n        case mapCtorString: return mapTag;\n        case promiseCtorString: return promiseTag;\n        case setCtorString: return setTag;\n        case weakMapCtorString: return weakMapTag;\n      }\n    }\n    return result;\n  };\n}\n\n/**\n * Initializes an array clone.\n *\n * @private\n * @param {Array} array The array to clone.\n * @returns {Array} Returns the initialized clone.\n */\nfunction initCloneArray(array) {\n  var length = array.length,\n      result = array.constructor(length);\n\n  // Add properties assigned by `RegExp#exec`.\n  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {\n    result.index = array.index;\n    result.input = array.input;\n  }\n  return result;\n}\n\n/**\n * Initializes an object clone.\n *\n * @private\n * @param {Object} object The object to clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneObject(object) {\n  return (typeof object.constructor == 'function' && !isPrototype(object))\n    ? baseCreate(getPrototype(object))\n    : {};\n}\n\n/**\n * Initializes an object clone based on its `toStringTag`.\n *\n * **Note:** This function only supports cloning values with tags of\n * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.\n *\n * @private\n * @param {Object} object The object to clone.\n * @param {string} tag The `toStringTag` of the object to clone.\n * @param {Function} cloneFunc The function to clone values.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneByTag(object, tag, cloneFunc, isDeep) {\n  var Ctor = object.constructor;\n  switch (tag) {\n    case arrayBufferTag:\n      return cloneArrayBuffer(object);\n\n    case boolTag:\n    case dateTag:\n      return new Ctor(+object);\n\n    case dataViewTag:\n      return cloneDataView(object, isDeep);\n\n    case float32Tag: case float64Tag:\n    case int8Tag: case int16Tag: case int32Tag:\n    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:\n      return cloneTypedArray(object, isDeep);\n\n    case mapTag:\n      return cloneMap(object, isDeep, cloneFunc);\n\n    case numberTag:\n    case stringTag:\n      return new Ctor(object);\n\n    case regexpTag:\n      return cloneRegExp(object);\n\n    case setTag:\n      return cloneSet(object, isDeep, cloneFunc);\n\n    case symbolTag:\n      return cloneSymbol(object);\n  }\n}\n\n/**\n * Checks if `value` is a valid array-like index.\n *\n * @private\n * @param {*} value The value to check.\n * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.\n * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.\n */\nfunction isIndex(value, length) {\n  length = length == null ? MAX_SAFE_INTEGER : length;\n  return !!length &&\n    (typeof value == 'number' || reIsUint.test(value)) &&\n    (value > -1 && value % 1 == 0 && value < length);\n}\n\n/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\n/**\n * Checks if `value` is likely a prototype object.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.\n */\nfunction isPrototype(value) {\n  var Ctor = value && value.constructor,\n      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;\n\n  return value === proto;\n}\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to process.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\n/**\n * Creates a shallow clone of `value`.\n *\n * **Note:** This method is loosely based on the\n * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)\n * and supports cloning arrays, array buffers, booleans, date objects, maps,\n * numbers, `Object` objects, regexes, sets, strings, symbols, and typed\n * arrays. The own enumerable properties of `arguments` objects are cloned\n * as plain objects. An empty object is returned for uncloneable values such\n * as error objects, functions, DOM nodes, and WeakMaps.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to clone.\n * @returns {*} Returns the cloned value.\n * @see _.cloneDeep\n * @example\n *\n * var objects = [{ 'a': 1 }, { 'b': 2 }];\n *\n * var shallow = _.clone(objects);\n * console.log(shallow[0] === objects[0]);\n * // => true\n */\nfunction clone(value) {\n  return baseClone(value, false, true);\n}\n\n/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nfunction isArguments(value) {\n  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.\n  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&\n    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);\n}\n\n/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\n/**\n * This method is like `_.isArrayLike` except that it also checks if `value`\n * is an object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array-like object,\n *  else `false`.\n * @example\n *\n * _.isArrayLikeObject([1, 2, 3]);\n * // => true\n *\n * _.isArrayLikeObject(document.body.children);\n * // => true\n *\n * _.isArrayLikeObject('abc');\n * // => false\n *\n * _.isArrayLikeObject(_.noop);\n * // => false\n */\nfunction isArrayLikeObject(value) {\n  return isObjectLike(value) && isArrayLike(value);\n}\n\n/**\n * Checks if `value` is a buffer.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.\n * @example\n *\n * _.isBuffer(new Buffer(2));\n * // => true\n *\n * _.isBuffer(new Uint8Array(2));\n * // => false\n */\nvar isBuffer = nativeIsBuffer || stubFalse;\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 8-9 which returns 'object' for typed array and other constructors.\n  var tag = isObject(value) ? objectToString.call(value) : '';\n  return tag == funcTag || tag == genTag;\n}\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\n/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return !!value && (type == 'object' || type == 'function');\n}\n\n/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return !!value && typeof value == 'object';\n}\n\n/**\n * Creates an array of the own enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects. See the\n * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * for more details.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keys(new Foo);\n * // => ['a', 'b'] (iteration order is not guaranteed)\n *\n * _.keys('hi');\n * // => ['0', '1']\n */\nfunction keys(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);\n}\n\n/**\n * This method returns a new empty array.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {Array} Returns the new empty array.\n * @example\n *\n * var arrays = _.times(2, _.stubArray);\n *\n * console.log(arrays);\n * // => [[], []]\n *\n * console.log(arrays[0] === arrays[1]);\n * // => false\n */\nfunction stubArray() {\n  return [];\n}\n\n/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = clone;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../usr/lib/node_modules/webpack/buildin/module.js */ \"../../../../../usr/lib/node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://DomUtilsHTML/./node_modules/lodash.clone/index.js?");

/***/ })

/******/ });