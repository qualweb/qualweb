"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementRoleAName_1 = __importDefault(require("./getElementRoleAName"));
const getTrimmedText_1 = __importDefault(require("../domUtils/getTrimmedText"));
function getValueFromEmbeddedControl(element) {
    const role = getElementRoleAName_1.default(element, '');
    let name = element.getElementTagName();
    if (!name)
        name = '';
    let value = '';
    if (role === 'textbox') {
        const valueAT = element.getElementAttribute('value');
        value = valueAT ? valueAT : '';
    }
    else if (role === 'combobox') {
        const refrencedByLabel = element.getElement(`[aria-activedescendant]`);
        let aria_descendendant, selectedElement, optionSelected;
        if (refrencedByLabel) {
            aria_descendendant = refrencedByLabel.getElementAttribute('role');
            selectedElement = element.getElement(`[id="${aria_descendendant}"]`);
        }
        if (name === 'select') {
            optionSelected = element.getElement(`[selected]`);
        }
        const aria_owns = element.getElementAttribute('[aria-owns]');
        const elementasToSelect = window.qwPage.getElement(`[id="${aria_owns}"]`);
        let elementWithAriaSelected;
        if (elementasToSelect)
            elementWithAriaSelected = elementasToSelect.getElement(`[aria-selected="true"]`);
        if (optionSelected) {
            value = getTrimmedText_1.default(optionSelected);
        }
        else if (selectedElement) {
            value = getTrimmedText_1.default(selectedElement[0]);
        }
        else if (elementWithAriaSelected) {
            value = getTrimmedText_1.default(elementWithAriaSelected[0]);
        }
    }
    else if (role === 'listbox') {
        const elementsWithId = element.getElements(`[id]`);
        const elementWithAriaSelected = element.getElement(`[aria-selected="true"]`);
        let selectedElement;
        let optionSelected;
        for (const elementWithId of elementsWithId) {
            if (selectedElement) {
                const id = elementWithId.getElementAttribute('id');
                selectedElement = element.getElement(`[aria-activedescendant="${id}"]`);
            }
        }
        if (name === 'select') {
            optionSelected = element.getElement(`[selected]`);
        }
        if (selectedElement)
            value = getTrimmedText_1.default(elementsWithId[0]);
        else if (elementWithAriaSelected) {
            value = getTrimmedText_1.default(elementWithAriaSelected);
        }
        else if (optionSelected) {
            value = getTrimmedText_1.default(optionSelected);
        }
    }
    else if (role === 'range' ||
        role === 'progressbar' ||
        role === 'scrollbar' ||
        role === 'slider' ||
        role === 'spinbutton') {
        const valueTextVar = element.getElementAttribute('aria-valuetext');
        const valuenowVar = element.getElementAttribute('aria-valuenow');
        if (valueTextVar)
            value = valueTextVar;
        else if (valuenowVar)
            value = valuenowVar;
    }
    return value;
}
exports.default = getValueFromEmbeddedControl;
