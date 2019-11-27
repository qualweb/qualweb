'use strict';

import { DomUtils } from "htmlparser2";
import getElementAttributeDocument = require("../domUtils/getElementAttributeDocument");
import getTrimmedText = require("./getTrimmedText");
import getElementNameDocument = require("../domUtils/getElementNameDocument");

function getValueFromEmbeddedControl(element: Element, document: Document): string {//stew

  let role = getElementAttributeDocument(element, "role");
  let name = getElementNameDocument(element);
  let value = "";
  let text = getTrimmedText(element);


  if ((role === "textbox") && text) {
    value = text;
  } else if (role === "combobox") {
    let refrencedByLabel = element.querySelector(`[aria-activedescendant]`);
    let aria_descendendant, selectedElement;
    if (refrencedByLabel !== null) {
      aria_descendendant = getElementAttributeDocument(refrencedByLabel, "role");
      selectedElement = element.querySelector(`[id="${aria_descendendant}"]`);
    }

    let aria_owns = getElementAttributeDocument(element, "aria-owns");
    let elementasToSelect = document.querySelector(`[id="${aria_owns}"]`);

    let elementWithAriaSelected;
    if (elementasToSelect !== null)
      elementWithAriaSelected = elementasToSelect.querySelector(`aria-selected="true"`);


    if (selectedElement.length > 0) {
      value = DomUtils.getText(selectedElement[0]);
    } else if (elementWithAriaSelected.length > 0) {
      value = DomUtils.getText(elementWithAriaSelected[0]);
    }

  } else if (role === "listbox" || name === 'select') {
    let elementsWithId = element.querySelectorAll(`[id]`);
    let elementWithAriaSelected = element.querySelector(`aria-selected="true"`);
    let selectedElement;
    let optionSelected;

    for (let elementWithId of elementsWithId) {
      if (selectedElement!==null) {
        let id = getElementAttributeDocument(elementWithId, "id");
        selectedElement = element.querySelector(`[aria-activedescendant="${id}"]`);
      }
    }

    if (name === 'select') {
      optionSelected = element.querySelector(`[selected]`);
    }

    if (selectedElement !== null)
      value = getTrimmedText(elementsWithId[0]);
    else if (elementWithAriaSelected !== null) {
      value =  getTrimmedText(elementWithAriaSelected);
    } else if (optionSelected !== null) {
      value = getTrimmedText(optionSelected);
    }
  } else if (role === "range" || role === "progressbar" || role === "scrollbar" || role === "slider" || role === "spinbutton"){
      let valueTextVar = getElementAttributeDocument(element,"aria-valuetext");
      let valuenowVar = getElementAttributeDocument(element,"aria-valuenow");
    if (valueTextVar !== null)
      value = valueTextVar;
    else if (valuenowVar)
      value = valuenowVar;
  }

  return value;
}

export = getValueFromEmbeddedControl;
