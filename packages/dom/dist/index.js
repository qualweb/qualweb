"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QWPage = void 0;
const qw_element_1 = require("@qualweb/qw-element");
class QWPage {
    constructor(document) {
        this.document = document;
    }
    getURL() {
        return this.document.URL;
    }
    getElement(selector) {
        let element = this.document.querySelector(selector);
        if (element)
            return new qw_element_1.QWElement(element);
        else
            return null;
    }
    getElements(selector) {
        let elements = this.document.querySelectorAll(selector);
        let qwList = [];
        for (let element of elements) {
            qwList.push(new qw_element_1.QWElement(element));
        }
        return qwList;
    }
    getElementByID(id, elementQW) {
        let treeSelector = elementQW.getTreeSelector();
        let element = this.document.querySelector(`#${id}` + treeSelector);
        if (element)
            return new qw_element_1.QWElement(element);
        else
            return null;
    }
    getElementByAttributeName(name) {
        let element = this.document.querySelector(`[name="${name}"]`);
        if (element)
            return new qw_element_1.QWElement(element);
        else
            return null;
    }
    processShadowDom() {
        let listElements = this.document.querySelectorAll("*") || new Array();
        let elementsFromShadowDom;
        let shadowCounter = 0;
        listElements.forEach(element => {
            if (element.shadowRoot !== null) {
                element.innerHTML = element.shadowRoot.innerHTML;
                elementsFromShadowDom = element.querySelectorAll("*");
                this.setShadowAttribute(elementsFromShadowDom, shadowCounter);
                shadowCounter++;
            }
        });
    }
    setShadowAttribute(elements, counter) {
        for (const element of elements || []) {
            element.setAttribute("shadowTree", counter + "");
        }
    }
    getPageRootElement() {
        const documentElement = this.document.documentElement;
        return documentElement ? new qw_element_1.QWElement(documentElement) : null;
    }
    getHTMLContent() {
        return this.document.documentElement.outerHTML;
    }
    getFocusedElement() {
        let activeElement = this.document.activeElement;
        let result;
        if (activeElement)
            result = new qw_element_1.QWElement(activeElement);
        return result;
    }
}
exports.QWPage = QWPage;
