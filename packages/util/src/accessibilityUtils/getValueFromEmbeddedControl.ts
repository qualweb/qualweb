import type { QWElement } from '@qualweb/qw-element';

function getValueFromEmbeddedControl(element: QWElement): string {
  const role = window.AccessibilityUtils.getElementRoleAName(element, '');
  const name = element.getElementTagName() ?? '';
  let value = '';

  if (role === 'textbox') {
    const valueAT = element.getElementAttribute('value');
    value = valueAT ? valueAT : '';
  } else if (role === 'combobox') {
    const referencedByLabel = element.getElement(`[aria-activedescendant]`);
    let aria_descendant, selectedElement, optionSelected;
    if (referencedByLabel) {
      aria_descendant = referencedByLabel.getElementAttribute('role');
      selectedElement = element.getElement(`[id="${aria_descendant}"]`);
    }

    if (name === 'select') {
      optionSelected = element.getElement(`[selected]`);
    }

    const aria_owns = element.getElementAttribute('[aria-owns]');
    const elementsToSelect = window.qwPage.getElement(`[id="${aria_owns}"]`);

    let elementWithAriaSelected: QWElement | null = null;
    if (elementsToSelect) {
      elementWithAriaSelected = elementsToSelect.getElement(`[aria-selected="true"]`);
    }

    if (optionSelected) {
      value = window.DomUtils.getTrimmedText(optionSelected);
    } else if (selectedElement) {
      value = window.DomUtils.getTrimmedText(selectedElement);
    } else if (elementWithAriaSelected) {
      value = window.DomUtils.getTrimmedText(elementWithAriaSelected);
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
