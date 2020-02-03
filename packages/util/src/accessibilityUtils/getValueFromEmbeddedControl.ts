'use strict';
import getElementAttribute from "../domUtils/getElementAttribute";
import getElementTagName from "../domUtils/getElementTagName";
import getTrimmedText from "./getTrimmedText";
import { ElementHandle, Page } from "puppeteer";
import getElementRoleAName = require("./getElementRoleAName");

async function getValueFromEmbeddedControl(element: ElementHandle, page: Page, treeSelector: string): Promise<string> {//stew

  let role = await getElementRoleAName(element, page, "");
  let name = await getElementTagName(element);
  if (!name)
    name = '';
  let value = "";


  if ((role === "textbox") ) {
    let valueAT = await getElementAttribute(element,"value");
    value = valueAT? valueAT : "";
  } else if (role === "combobox") {
    let refrencedByLabel = await element.$(`[aria-activedescendant]` + treeSelector);
    let aria_descendendant, selectedElement, optionSelected;
    if (!!refrencedByLabel) {
      aria_descendendant = await getElementAttribute(refrencedByLabel, "role");
      selectedElement = await element.$(`[id="${aria_descendendant}"]`);
    }

    if (name === 'select') {
      optionSelected = await element.$(`[selected]` + treeSelector);
    }

    let aria_owns = await getElementAttribute(element, "[aria-owns]" + treeSelector);
    let elementasToSelect = await page.$(`[id="${aria_owns}"]`);

    let elementWithAriaSelected;
    if (!!elementasToSelect )
      elementWithAriaSelected = elementasToSelect.$(`[aria-selected="true"]` + treeSelector);

    if (!!optionSelected) {
      value = await getTrimmedText(optionSelected);
    }
    else if (!!selectedElement) {
      value = await getTrimmedText(selectedElement[0]);
    } else if (!!elementWithAriaSelected) {
      value = await getTrimmedText(elementWithAriaSelected[0]);
    }

  } else if (role === "listbox") {
    let elementsWithId = await element.$$(`[id]` + treeSelector);
    let elementWithAriaSelected = await element.$(`[aria-selected="true"]` + treeSelector);
    let selectedElement;
    let optionSelected;

    for (let elementWithId of elementsWithId) {
      if (!!selectedElement) {
        let id = await getElementAttribute(elementWithId, "id");
        selectedElement = await element.$(`[aria-activedescendant="${id}"]` + treeSelector);
      }
    }

    if (name === 'select') {
      optionSelected = await element.$(`[selected]` + treeSelector);
    }

    if (!!selectedElement)
      value = await getTrimmedText(elementsWithId[0]);
    else if (!! elementWithAriaSelected) {
      value = await getTrimmedText(elementWithAriaSelected);
    } else if (!!optionSelected) {
      value = await getTrimmedText(optionSelected);
    }
  } else if (role === "range" || role === "progressbar" || role === "scrollbar" || role === "slider" || role === "spinbutton") {
    let valueTextVar = await getElementAttribute(element, "aria-valuetext");
    let valuenowVar = await getElementAttribute(element, "aria-valuenow");
    if (!!valueTextVar)
      value = valueTextVar;
    else if (!!valuenowVar)
      value = valuenowVar;
  }

  return value;
}

export default getValueFromEmbeddedControl;
