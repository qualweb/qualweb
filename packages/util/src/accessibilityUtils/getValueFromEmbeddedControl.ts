'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';


function getValueFromEmbeddedControl(element: QWElement,  page:QWPage): string{

  let role = AccessibilityUtils.getElementRoleAName(element, page, "");
  let name = element.getElementTagName();
  if (!name)
    name = '';
  let value = "";


  if ((role === "textbox") ) {
    let valueAT = element.getElementAttribute("value");
    value = valueAT? valueAT : "";
  } else if (role === "combobox") {
    let refrencedByLabel = element.getElement(`[aria-activedescendant]` );
    let aria_descendendant, selectedElement, optionSelected;
    if (!!refrencedByLabel) {
      aria_descendendant = refrencedByLabel.getElementAttribute( "role");
      selectedElement = element.getElement(`[id="${aria_descendendant}"]`);
    }

    if (name === 'select') {
      optionSelected = element.getElement(`[selected]`);
    }

    let aria_owns = element.getElementAttribute( "[aria-owns]" );
    let elementasToSelect = page.getElement(`[id="${aria_owns}"]`);

    let elementWithAriaSelected;
    if (!!elementasToSelect )
      elementWithAriaSelected = elementasToSelect.getElement(`[aria-selected="true"]` );

    if (!!optionSelected) {
      value = AccessibilityUtils.getTrimmedText(optionSelected,page);
    }
    else if (!!selectedElement) {
      value = AccessibilityUtils.getTrimmedText(selectedElement[0],page);
    } else if (!!elementWithAriaSelected) {
      value = AccessibilityUtils.getTrimmedText(elementWithAriaSelected[0],page);
    }

  } else if (role === "listbox") {
    let elementsWithId = element.getElements(`[id]` );
    let elementWithAriaSelected = element.getElement(`[aria-selected="true"]` );
    let selectedElement;
    let optionSelected;

    for (let elementWithId of elementsWithId) {
      if (!!selectedElement) {
        let id = elementWithId.getElementAttribute( "id");
        selectedElement = element.getElement(`[aria-activedescendant="${id}"]` );
      }
    }

    if (name === 'select') {
      optionSelected = element.getElement(`[selected]`);
    }

    if (!!selectedElement)
      value = AccessibilityUtils.getTrimmedText(elementsWithId[0],page);
    else if (!! elementWithAriaSelected) {
      value = AccessibilityUtils.getTrimmedText(elementWithAriaSelected,page);
    } else if (!!optionSelected) {
      value = AccessibilityUtils.getTrimmedText(optionSelected,page);
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
