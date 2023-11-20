function getValueFromEmbeddedControl(element: typeof window.qwElement): string {
  const role = window.AccessibilityUtils.getElementRoleAName(element, '');
  let name = element.getElementTagName();
  if (!name) name = '';
  let value = '';

  if (role === 'textbox') {
    const valueAT = element.getElementAttribute('value');
    value = valueAT ? valueAT : '';
  } else if (role === 'combobox') {
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
    if (elementasToSelect) elementWithAriaSelected = elementasToSelect.getElement(`[aria-selected="true"]`);

    if (optionSelected) {
      value = window.DomUtils.getTrimmedText(optionSelected);
    } else if (selectedElement) {
      value = window.DomUtils.getTrimmedText(selectedElement[0]);
    } else if (elementWithAriaSelected) {
      value = window.DomUtils.getTrimmedText(elementWithAriaSelected[0]);
    }
  } else if (role === 'listbox') {
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

    if (selectedElement) value = window.DomUtils.getTrimmedText(elementsWithId[0]);
    else if (elementWithAriaSelected) {
      value = window.DomUtils.getTrimmedText(elementWithAriaSelected);
    } else if (optionSelected) {
      value = window.DomUtils.getTrimmedText(optionSelected);
    }
  } else if (
    role === 'range' ||
    role === 'progressbar' ||
    role === 'scrollbar' ||
    role === 'slider' ||
    role === 'spinbutton'
  ) {
    const valueTextVar = element.getElementAttribute('aria-valuetext');
    const valuenowVar = element.getElementAttribute('aria-valuenow');
    if (valueTextVar) value = valueTextVar;
    else if (valuenowVar) value = valuenowVar;
  }

  return value;
}

export default getValueFromEmbeddedControl;
