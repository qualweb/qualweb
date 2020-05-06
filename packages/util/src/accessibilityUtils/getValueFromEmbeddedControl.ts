'use strict';
import getElementRoleAName = require("./getElementRoleAName");
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getTrimmedText from "./getTrimmedText";


function getValueFromEmbeddedControl(element: QWElement,  page:QWPage, treeSelector: string): string{

  let role = getElementRoleAName(element, page, "");
  let name = element.getElementTagName();
  if (!name)
    name = '';
  let value = "";


  if ((role === "textbox") ) {
    let valueAT = element.getElementAttribute("value");
    value = valueAT? valueAT : "";
  } else if (role === "combobox") {
    let refrencedByLabel = element.getElement(`[aria-activedescendant]` + treeSelector);
    let aria_descendendant, selectedElement, optionSelected;
    if (!!refrencedByLabel) {
      aria_descendendant = refrencedByLabel.getElementAttribute( "role");
      selectedElement = element.getElement(`[id="${aria_descendendant}"]`);
    }

    if (name === 'select') {
      optionSelected = element.getElement(`[selected]` + treeSelector);
    }

    let aria_owns = element.getElementAttribute( "[aria-owns]" + treeSelector);
    let elementasToSelect = page.getElement(`[id="${aria_owns}"]`);

    let elementWithAriaSelected;
    if (!!elementasToSelect )
      elementWithAriaSelected = elementasToSelect.getElement(`[aria-selected="true"]` + treeSelector);

    if (!!optionSelected) {
      value = getTrimmedText(optionSelected);
    }
    else if (!!selectedElement) {
      value = getTrimmedText(selectedElement[0]);
    } else if (!!elementWithAriaSelected) {
      value = getTrimmedText(elementWithAriaSelected[0]);
    }

  } else if (role === "listbox") {
    let elementsWithId = element.getElements(`[id]` + treeSelector);
    let elementWithAriaSelected = element.getElement(`[aria-selected="true"]` + treeSelector);
    let selectedElement;
    let optionSelected;

    for (let elementWithId of elementsWithId) {
      if (!!selectedElement) {
        let id = elementWithId.getElementAttribute( "id");
        selectedElement = element.getElement(`[aria-activedescendant="${id}"]` + treeSelector);
      }
    }

    if (name === 'select') {
      optionSelected = element.getElement(`[selected]` + treeSelector);
    }

    if (!!selectedElement)
      value = getTrimmedText(elementsWithId[0]);
    else if (!! elementWithAriaSelected) {
      value = getTrimmedText(elementWithAriaSelected);
    } else if (!!optionSelected) {
      value = getTrimmedText(optionSelected);
    }
  } else if (role === "range" || role === "progressbar" || role === "scrollbar" || role === "slider" || role === "spinbutton") {
    let valueTextVar = element.getElementAttribute( "aria-valuetext");
    let valuenowVar = element.getElementAttribute( "aria-valuenow");
    if (!!valueTextVar)
      value = valueTextVar;
    else if (!!valuenowVar)
      value = valuenowVar;
  }

  return value;
}

export default getValueFromEmbeddedControl;
