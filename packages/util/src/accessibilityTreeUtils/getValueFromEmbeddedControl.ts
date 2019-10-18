'use strict';

import { DomElement, DomUtils } from "htmlparser2";
const stew = new (require('stew-select')).Stew();

function getValueFromEmbeddedControl(element: DomElement, processedHTML: DomElement[]): string {//stew
  if (!element.attribs)
    return "";

  let role = element.attribs.role;
  let value = "";


  if ((role === "textbox") && element.children !== undefined) {
    value = DomUtils.getText(element);
  } else if (role === "combobox") {
    let refrencedByLabel = stew.select(element, `[aria-activedescendant]`);
    let aria_descendendant, selectedElement;
    if (refrencedByLabel.length > 0) {
      aria_descendendant = refrencedByLabel[0].attribs["aria-activedescendant"];
      selectedElement = stew.select(element, `[id="${aria_descendendant}"]`);
    }

    let aria_owns = element.attribs["aria-owns"];
    let elementasToSelect = stew.select(processedHTML, `[id="${aria_owns}"]`);

    let elementWithAriaSelected;
    if (elementasToSelect.length > 0)
      elementWithAriaSelected = stew.select(elementasToSelect[0], `aria-selected="true"`);


    if (selectedElement.length > 0) {
      value = DomUtils.getText(selectedElement[0]);
    } else if (elementWithAriaSelected.length > 0) {
      value = DomUtils.getText(elementWithAriaSelected[0]);
    }

  } else if (role === "listbox" || element.name === 'select') {
    let elementsWithId = stew.select(element, `[id]`);
    let elementWithAriaSelected = stew.select(element, `aria-selected="true"`);
    let selectedElement = [];
    let optionSelected;

    for (let elementWithId of elementsWithId) {
      if (selectedElement.length === 0) {
        let id = elementWithId.attribs.id;
        selectedElement = stew.select(element, `[aria-activedescendant="${id}"]`);
      }
    }

    if (element.name === 'select') {
      optionSelected = stew.select(element, `[selected]`);
    }

    if (selectedElement.length > 0)
      value = DomUtils.getText(elementsWithId[0]);
    else if (elementWithAriaSelected.length > 0) {
      value = DomUtils.getText(elementWithAriaSelected[0]);
    } else if (optionSelected.length > 0) {
      value = DomUtils.getText(optionSelected[0]);
    }
  } else if (role === "range" || role === "progressbar" || role === "scrollbar" || role === "slider" || role === "spinbutton") {
    if (element.attribs["aria-valuetext"] !== undefined)
      value = element.attribs["aria-valuetext"];
    else if (element.attribs["aria-valuenow"] !== undefined)
      value = element.attribs["aria-valuenow"];
  }

  return value;
}

export = getValueFromEmbeddedControl;
