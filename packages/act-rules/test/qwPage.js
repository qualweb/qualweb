var QWPage =
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

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.QWPage = void 0;\nconst qw_element_1 = __webpack_require__(/*! @qualweb/qw-element */ \"./node_modules/@qualweb/qw-element/dist/index.js\");\nclass QWPage {\n    constructor(document, window) {\n        this.document = document;\n        this.window = window;\n        this.defaultWidth = this.window.innerWidth;\n        this.defaultHeight = this.window.innerHeight;\n    }\n    getURL() {\n        return this.document.URL;\n    }\n    getElement(selector) {\n        const element = this.document.querySelector(selector);\n        return element ? new qw_element_1.QWElement(element) : null;\n    }\n    getElements(selector) {\n        const elements = this.document.querySelectorAll(selector);\n        const qwList = [];\n        for (const element of elements || []) {\n            qwList.push(new qw_element_1.QWElement(element));\n        }\n        return qwList;\n    }\n    getElementByID(id, elementQW) {\n        const treeSelector = elementQW.getTreeSelector();\n        const element = this.document.querySelector(`#${id}` + treeSelector);\n        return element ? new qw_element_1.QWElement(element) : null;\n    }\n    getElementByAttributeName(name) {\n        const element = this.document.querySelector(`[name=\"${name}\"]`);\n        return element ? new qw_element_1.QWElement(element) : null;\n    }\n    processShadowDom() {\n        const listElements = this.document.querySelectorAll('*');\n        let shadowCounter = 0;\n        for (const element of listElements || []) {\n            if (element.shadowRoot !== null) {\n                element.innerHTML = element.shadowRoot.innerHTML;\n                const elementsFromShadowDom = element.querySelectorAll('*');\n                this.setShadowAttribute(elementsFromShadowDom, shadowCounter);\n                shadowCounter++;\n            }\n        }\n    }\n    setShadowAttribute(elements, counter) {\n        for (const element of elements || []) {\n            element.setAttribute('shadowTree', counter + '');\n        }\n    }\n    getPageRootElement() {\n        const documentElement = this.document.documentElement;\n        return documentElement ? new qw_element_1.QWElement(documentElement) : null;\n    }\n    getHTMLContent() {\n        return this.document.documentElement.outerHTML;\n    }\n    getFocusedElement() {\n        const activeElement = this.document.activeElement;\n        return activeElement ? new qw_element_1.QWElement(activeElement) : null;\n    }\n    changeToDefaultViewport() {\n        this.window.resizeTo(this.defaultWidth, this.defaultHeight);\n    }\n    changeViewport(width, height) {\n        this.window.resizeTo(width, height);\n    }\n}\nexports.QWPage = QWPage;\n\n\n//# sourceURL=webpack://QWPage/./dist/index.js?");

/***/ }),

/***/ "./node_modules/@qualweb/qw-element/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@qualweb/qw-element/dist/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.QWElement = void 0;\nclass QWElement {\n    constructor(element) {\n        this.element = element;\n    }\n    elementHasAttribute(attribute) {\n        return this.element.getAttributeNames().includes(attribute);\n    }\n    elementHasAttributes() {\n        return this.element.getAttributeNames().length > 0;\n    }\n    elementHasChild(childName) {\n        for (const child of this.element.children || []) {\n            if (child.tagName.toLowerCase() === childName.toLowerCase()) {\n                return true;\n            }\n        }\n        return false;\n    }\n    elementHasChildren() {\n        return this.element.children.length > 0;\n    }\n    elementHasParent(parent) {\n        const parentElement = this.element['parentElement'];\n        return parentElement ? parentElement['tagName'].toLowerCase() === parent.toLowerCase() : false;\n    }\n    getElementAttribute(attribute) {\n        return this.element.getAttribute(attribute);\n    }\n    getElementAttributes() {\n        const attributes = {};\n        for (const attr of this.element.getAttributeNames() || []) {\n            attributes[attr] = this.element.getAttribute(attr);\n        }\n        return attributes;\n    }\n    getElementAttributesName() {\n        return this.element.getAttributeNames();\n    }\n    getElementChildren() {\n        const selector = this.getElementSelector();\n        let treeSelector = this.getTreeSelector();\n        let elements = this.element.querySelectorAll(selector + ' > *' + treeSelector);\n        let qwList = [];\n        for (let element of elements) {\n            qwList.push(new QWElement(element));\n        }\n        return qwList;\n    }\n    getTreeSelector() {\n        const attribute = this.getElementAttribute('shadowTree');\n        let result = ':not([shadowTree])';\n        if (attribute !== null) {\n            result = `[shadowTree=\"${attribute}\"]`;\n        }\n        return result;\n    }\n    getElementChildTextContent(childName) {\n        for (const child of this.element.children || []) {\n            if (child.tagName.toLowerCase() === childName.toLowerCase()) {\n                return child['textContent'] || undefined;\n            }\n        }\n        return undefined;\n    }\n    getElementHtmlCode(withText, fullElement) {\n        const clonedElem = this.element.cloneNode(true);\n        if (fullElement) {\n            return clonedElem.outerHTML;\n        }\n        else if (withText) {\n            const text = clonedElem['text'];\n            clonedElem.innerHTML = text !== undefined ? text : '';\n            return clonedElem.outerHTML;\n        }\n        else {\n            clonedElem.innerHTML = '';\n            return clonedElem.outerHTML;\n        }\n    }\n    getElement(selector) {\n        let element = this.element.querySelector(selector);\n        return this.convertElementToQWElement(element);\n    }\n    convertElementToQWElement(element) {\n        if (element)\n            return new QWElement(element);\n        else\n            return null;\n    }\n    convertElementsToQWElement(elements) {\n        let qwList = [];\n        for (let element of elements) {\n            qwList.push(new QWElement(element));\n        }\n        return qwList;\n    }\n    getElements(selector) {\n        return this.convertElementsToQWElement(this.element.querySelectorAll(selector));\n    }\n    getElementNextSibling() {\n        return this.convertElementToQWElement(this.element.nextElementSibling);\n    }\n    getElementParent() {\n        return this.convertElementToQWElement(this.element.parentElement);\n    }\n    getElementPreviousSibling() {\n        return this.convertElementToQWElement(this.element.previousElementSibling);\n    }\n    getElementProperty(property) {\n        let propertyValue = this.element[property];\n        return propertyValue === null ? \"\" : propertyValue;\n    }\n    getElementSelector() {\n        if (this.element.tagName.toLowerCase() === 'html') {\n            return 'html';\n        }\n        else if (this.element.tagName.toLowerCase() === 'head') {\n            return 'html > head';\n        }\n        else if (this.element.tagName.toLowerCase() === 'body') {\n            return 'html > body';\n        }\n        let selector = 'html > ';\n        let parents = new Array();\n        let parent = this.element.parentElement;\n        while (parent && parent.tagName.toLowerCase() !== 'html') {\n            parents.unshift(this.getSelfLocationInParent(parent));\n            parent = parent['parentElement'];\n        }\n        selector += parents.join(' > ');\n        selector += ' > ' + this.getSelfLocationInParent(this.element);\n        return selector;\n    }\n    getSelfLocationInParent(element) {\n        let selector = '';\n        if (element.tagName.toLowerCase() === 'body' || element.tagName.toLowerCase() === 'head') {\n            return element.tagName.toLowerCase();\n        }\n        let sameEleCount = 0;\n        let prev = element.previousElementSibling;\n        while (prev) {\n            if (prev.tagName.toLowerCase() === element.tagName.toLowerCase()) {\n                sameEleCount++;\n            }\n            prev = prev.previousElementSibling;\n        }\n        selector += `${element.tagName.toLowerCase()}:nth-of-type(${sameEleCount + 1})`;\n        return selector;\n    }\n    getElementStyleProperty(property, pseudoStyle) {\n        const styles = getComputedStyle(this.element, pseudoStyle);\n        return styles.getPropertyValue(property);\n    }\n    getElementTagName() {\n        return this.element['tagName'].toLowerCase();\n    }\n    getElementText() {\n        return this.element.textContent || '';\n    }\n    getElementType() {\n        return this.element.nodeType === 1 ? 'tag' : this.element.nodeType === 2 ? 'attribute' : this.element.nodeType === 3 ? 'text' : 'comment';\n    }\n    getNumberOfSiblingsWithTheSameTag() {\n        let aCount = 1;\n        let nextSibling = this.element.nextElementSibling;\n        while (nextSibling) {\n            if (nextSibling.tagName.toLowerCase() === 'a') {\n                aCount++;\n            }\n            nextSibling = nextSibling.nextElementSibling;\n        }\n        return aCount;\n    }\n    setElementAttribute(attribute, value) {\n        this.element.setAttribute(attribute, value);\n    }\n    concatANames(aNames) {\n        const children = this.element.childNodes;\n        let result = '';\n        let textContent;\n        let i = 0;\n        let counter = 0;\n        for (const child of children || []) {\n            textContent = child.textContent;\n            if (child.nodeType === 3 && !!textContent && textContent.trim() !== \"\") {\n                result = result + (counter === 0 ? \"\" : \" \") + textContent.trim();\n                counter++;\n            }\n            else if (child.nodeType === 1) {\n                result = result + (counter > 0 && !!aNames[i] ? \" \" : \"\") + aNames[i];\n                i++;\n            }\n        }\n        if (!result) {\n            result = '';\n        }\n        return result;\n    }\n    isOffScreen() {\n        const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);\n        const scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientHeight);\n        const bounding = this.element.getBoundingClientRect();\n        const left = bounding.left;\n        const right = bounding.right;\n        const bottom = bounding.bottom;\n        const top = bounding.top;\n        const noParentScrollTop = this.noParentScrolled(bottom);\n        return left > scrollWidth || right < 0 || bottom < 0 && noParentScrollTop || top > scrollHeight || right === 0 && left === 0;\n    }\n    isElementHTMLElement() {\n        return this.element instanceof HTMLElement;\n    }\n    getContentFrame() {\n        let page = null;\n        if (this.getElementTagName() === \"iframe\") {\n            const element = this.element;\n            const contentWindow = element.contentWindow;\n            if (contentWindow) {\n                page = contentWindow.document;\n            }\n        }\n        return page;\n    }\n    elementHasTextNode() {\n        if (this.element.firstChild !== null) {\n            return this.element.firstChild.nodeType === 3;\n        }\n        else {\n            return false;\n        }\n    }\n    noParentScrolled(offset) {\n        let element = this.element.parentElement;\n        while (element && element.nodeName.toLowerCase() !== 'html') {\n            if (element.scrollTop) {\n                offset += element.scrollTop;\n                if (offset >= 0) {\n                    return false;\n                }\n            }\n            element = element.parentElement;\n        }\n        return true;\n    }\n    focusElement() {\n        const htmlElement = this.element;\n        htmlElement.focus();\n    }\n    getBoundingBox() {\n        return this.element.getBoundingClientRect();\n    }\n    getShadowElement(selector) {\n        let shadowRoot = this.element.shadowRoot;\n        let element;\n        if (shadowRoot)\n            element = shadowRoot.querySelector(selector);\n        return this.convertElementToQWElement(element);\n    }\n    getShadowElements(selector) {\n        let shadowRoot = this.element.shadowRoot;\n        let elements;\n        if (shadowRoot)\n            elements = shadowRoot.querySelectorAll(selector);\n        return this.convertElementsToQWElement(elements);\n    }\n}\nexports.QWElement = QWElement;\n\n\n//# sourceURL=webpack://QWPage/./node_modules/@qualweb/qw-element/dist/index.js?");

/***/ })

/******/ });