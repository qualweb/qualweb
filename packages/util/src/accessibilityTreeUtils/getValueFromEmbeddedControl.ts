'use strict';

import {DomElement, DomUtils} from "htmlparser2";
const stew = new (require('stew-select')).Stew();

function getValueFromEmbeddedControl(element: DomElement, processedHTML: DomElement[]): string {//stew
  if (!element.attribs)
    return "";

  let role = element.attribs.role;
  let value = "";

  if ((element.name === "textarea" || role === "textbox") && element.children !== undefined) {
    value = DomUtils.getText(element);
  } else if (element.name === "input" && element.attribs && element.attribs["type"] === "text") {
    value = element.attribs["value"];
  } else if ((element.name === "button" || role === "button") && element.children !== undefined) {
    value = DomUtils.getText(element);
  } else if (role === "combobox") {
    let referencedByLabel = stew.select(element, `[aria-activedescendant]`);
    let ariaDescendant, selectedElement;
    if (referencedByLabel.length > 0) {
      ariaDescendant = referencedByLabel[0].attribs["aria-activedescendant"];
      selectedElement = stew.select(element, `[id="${ariaDescendant}"]`);
    }

    let aria_owns = element.attribs["aria-owns"];
    let elementsToSelect = stew.select(processedHTML, `[id="${aria_owns}"]`);

    let elementWithAriaSelected;
    if (elementsToSelect.length > 0)
      elementWithAriaSelected = stew.select(elementsToSelect[0], `aria-selected="true"`);


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
