'use strict';
import { QWElement,QWPage} from '@qualweb/html-util';
import getElementRoleAName = require("./getElementRoleAName");
import { AccessibilityUtils } from "..";


 async function getValueFromEmbeddedControl(elementQW: QWElement,  pageQW:QWPage, treeSelector: string): Promise<string>{//stew

  let element = elementQW.elementPupeteer;
  let page = pageQW.page;
  let role = await getElementRoleAName(elementQW, pageQW, "");
  let name = await AccessibilityUtils.domUtils.getElementTagName(elementQW);
  if (!name)
    name = '';
  let value = "";


  if ((role === "textbox") ) {
    let valueAT = await AccessibilityUtils.domUtils.getElementAttribute(elementQW,"value");
    value = valueAT? valueAT : "";
  } else if (role === "combobox") {
    let refrencedByLabel = await element.$(`[aria-activedescendant]` + treeSelector);
    let aria_descendendant, selectedElement, optionSelected;
    if (!!refrencedByLabel) {
      aria_descendendant = await AccessibilityUtils.domUtils.getElementAttribute(refrencedByLabel, "role");
      selectedElement = await element.$(`[id="${aria_descendendant}"]`);
    }

    if (name === 'select') {
      optionSelected = await element.$(`[selected]` + treeSelector);
    }

    let aria_owns = await AccessibilityUtils.domUtils.getElementAttribute(element, "[aria-owns]" + treeSelector);
    let elementasToSelect = await page.$(`[id="${aria_owns}"]`);

    let elementWithAriaSelected;
    if (!!elementasToSelect )
      elementWithAriaSelected = elementasToSelect.$(`[aria-selected="true"]` + treeSelector);

    if (!!optionSelected) {
      value = await AccessibilityUtils.domUtils.getTrimmedText(optionSelected);
    }
    else if (!!selectedElement) {
      value = await AccessibilityUtils.domUtils.getTrimmedText(selectedElement[0]);
    } else if (!!elementWithAriaSelected) {
      value = await AccessibilityUtils.domUtils.getTrimmedText(elementWithAriaSelected[0]);
    }

  } else if (role === "listbox") {
    let elementsWithId = await element.$$(`[id]` + treeSelector);
    let elementWithAriaSelected = await element.$(`[aria-selected="true"]` + treeSelector);
    let selectedElement;
    let optionSelected;

    for (let elementWithId of elementsWithId) {
      if (!!selectedElement) {
        let id = await AccessibilityUtils.domUtils.getElementAttribute(elementWithId, "id");
        selectedElement = await element.$(`[aria-activedescendant="${id}"]` + treeSelector);
      }
    }

    if (name === 'select') {
      optionSelected = await element.$(`[selected]` + treeSelector);
    }

    if (!!selectedElement)
      value = await AccessibilityUtils.domUtils.getTrimmedText(elementsWithId[0]);
    else if (!! elementWithAriaSelected) {
      value = await AccessibilityUtils.domUtils.getTrimmedText(elementWithAriaSelected);
    } else if (!!optionSelected) {
      value = await AccessibilityUtils.domUtils.getTrimmedText(optionSelected);
    }
  } else if (role === "range" || role === "progressbar" || role === "scrollbar" || role === "slider" || role === "spinbutton") {
    let valueTextVar = await AccessibilityUtils.domUtils.getElementAttribute(element, "aria-valuetext");
    let valuenowVar = await AccessibilityUtils.domUtils.getElementAttribute(element, "aria-valuenow");
    if (!!valueTextVar)
      value = valueTextVar;
    else if (!!valuenowVar)
      value = valuenowVar;
  }

  return value;
}

export default getValueFromEmbeddedControl;
