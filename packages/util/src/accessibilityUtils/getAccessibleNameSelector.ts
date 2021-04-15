import { formElements, typesWithLabel } from './constants';

function getAccessibleNameSelector(element: typeof window.qwElement): Array<string> | undefined {
  return getAccessibleNameRecursion(element, false, false);
}

function getAccessibleNameRecursion(
  element: typeof window.qwElement,
  recursion: boolean,
  isWidget: boolean
): string[] | undefined {
  let AName, ariaLabelBy;
  const elementSelector = element.getElementSelector();
  const name = element.getElementTagName();
  const allowNameFromContent = window.AccessibilityUtils.allowsNameFromContent(element);
  ariaLabelBy = element.getElementAttribute('aria-labelledby');

  if (ariaLabelBy !== null && !verifyAriaLabel(ariaLabelBy)) {
    ariaLabelBy = '';
  }
  const ariaLabel = element.getElementAttribute('aria-label') ? [elementSelector] : null;
  const attrType = element.getElementAttribute('type');
  const title = element.getElementAttribute('title') ? [elementSelector] : null;
  const alt = element.getElementAttribute('alt') ? [elementSelector] : null;
  const value = element.getElementAttribute('value') ? [elementSelector] : null;
  const placeholder = element.getElementAttribute('placeholder') ? [elementSelector] : null;
  const role = window.AccessibilityUtils.getElementRoleAName(element, '');
  const id = element.getElementAttribute('id');
  const defaultName = window.AccessibilityUtils.getDefaultName(element) ? ['default'] : null;

  const referencedByAriaLabel = window.AccessibilityUtils.isElementReferencedByAriaLabel(element);
  if (ariaLabelBy && ariaLabelBy !== '' && !(referencedByAriaLabel && recursion)) {
    AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy);
  } else if (ariaLabel) {
    AName = ariaLabel;
  } else if (isWidget && window.AccessibilityUtils.isElementControl(element)) {
    const valueFromEmbeddedControl = window.AccessibilityUtils.getValueFromEmbeddedControl(element)
      ? elementSelector
      : null;
    AName = getFirstNotUndefined(valueFromEmbeddedControl, title);
  } else if (name === 'area' || (name === 'input' && attrType === 'image')) {
    AName = getFirstNotUndefined(alt, title);
  } else if (name === 'img') {
    AName = getFirstNotUndefined(alt, title);
  } else if (name === 'input' && (attrType === 'button' || attrType === 'submit' || attrType === 'reset')) {
    AName = getFirstNotUndefined(value, defaultName, title);
  } else if (name === 'input' && (!attrType || typesWithLabel.indexOf(attrType) >= 0)) {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id), title, placeholder);
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name && formElements.indexOf(name) >= 0) {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id), title);
    } else {
      AName = getFirstNotUndefined(title);
    }
  } else if (name === 'textarea') {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(element, isWidget), title, placeholder);
    }
  } else if (name === 'figure') {
    AName = getFirstNotUndefined(...(getValueFromSpecialLabel(element, 'figcaption') || []), title);
  } else if (name === 'table') {
    AName = getFirstNotUndefined(...(getValueFromSpecialLabel(element, 'caption') || []), title);
  } else if (name === 'fieldset') {
    AName = getFirstNotUndefined(...(getValueFromSpecialLabel(element, 'legend') || []), title);
  } else if (allowNameFromContent || (((role && allowNameFromContent) || !role) && recursion)) {
    AName = getFirstNotUndefined(...getTextFromCss(element, isWidget), title);
  } /*if (name && (sectionAndGrouping.indexOf(name) >= 0 || name === "iframe" || tabularElements.indexOf(name) >= 0)) and all other elements*/ else {
    AName = getFirstNotUndefined(title);
  }

  return AName;
}

function getFirstNotUndefined(...args: any[]): string | undefined {
  let result;
  let i = 0;
  let arg;
  let end = false;

  while (i < args.length && !end) {
    arg = args[i];
    if (arg !== undefined && arg !== null) {
      result = arg;
      if (String(arg).trim() !== '') {
        end = true;
      }
    }
    i++;
  }

  return result;
}

function getValueFromSpecialLabel(element: typeof window.qwElement, label: string): Array<string> | undefined {
  const labelElement = element.getElement(label);
  let accessNameFromLabel, result;

  if (labelElement) accessNameFromLabel = getAccessibleNameRecursion(labelElement, true, false);

  if (accessNameFromLabel) result = [element.getElementSelector()];

  return result;
}

function getValueFromLabel(element: typeof window.qwElement, id: string | null): Array<string> {
  const referencedByLabelList = new Array<typeof window.qwElement>();
  const referencedByLabel = window.qwPage.getElements(`label[for="${id}"]`, element);
  if (referencedByLabel) {
    referencedByLabelList.push(...referencedByLabel);
  }
  const parent = element.getElementParent();
  const isWidget = window.AccessibilityUtils.isElementWidget(element);

  if (parent && parent.getElementTagName() === 'label' && !isElementPresent(parent, referencedByLabelList)) {
    referencedByLabelList.push(parent);
  }

  const result = new Array<string>();
  for (const label of referencedByLabelList) {
    const accessNameFromLabel = getAccessibleNameRecursion(label, true, isWidget);
    if (accessNameFromLabel) {
      result.push(label.getElementSelector());
    }
  }

  return result;
}
function isElementPresent(element: typeof window.qwElement, listElement: Array<typeof window.qwElement>): boolean {
  let result = false;
  let i = 0;
  const elementSelector = element.getElementSelector();
  while (i < listElement.length && !result) {
    result = elementSelector === listElement[i].getElementSelector();
    i++;
  }
  return result;
}

function getAccessibleNameFromAriaLabelledBy(element: typeof window.qwElement, ariaLabelId: string): Array<string> {
  const ListIdRefs = ariaLabelId.split(' ');
  const result = new Array<string>();
  let accessNameFromId;
  const isWidget = window.AccessibilityUtils.isElementWidget(element);
  const elementID = element.getElementAttribute('id');

  for (const id of ListIdRefs || []) {
    if (id !== '' && elementID !== id) {
      const elem = window.qwPage.getElementByID(id);
      if (elem) {
        accessNameFromId = getAccessibleNameRecursion(elem, true, isWidget);
        if (accessNameFromId) {
          result.push(elem.getElementSelector());
        }
      }
    }
  }
  return result;
}

function getTextFromCss(element: typeof window.qwElement, isWidget: boolean): Array<string> {
  const aNameList = getAccessibleNameFromChildren(element, isWidget);
  const textValue = getConcatenatedText(element, []) ? element.getElementSelector() : null;

  if (textValue) aNameList.push(textValue);

  return aNameList;
}

function getConcatenatedText(element: typeof window.qwElement, aNames: Array<string>): string {
  return element.concatANames(aNames);
}

function getAccessibleNameFromChildren(element: typeof window.qwElement, isWidget: boolean): Array<string> {
  if (!isWidget) {
    isWidget = window.AccessibilityUtils.isElementWidget(element);
  }
  const children = element.getElementChildren();
  const result = new Array<string>();
  let aName;

  if (children) {
    for (const child of children) {
      aName = getAccessibleNameRecursion(child, true, isWidget);
      if (aName) {
        result.push(child.getElementSelector());
      }
    }
  }
  return result;
}

function verifyAriaLabel(ariaLabelBy: string): boolean {
  const elementIds = ariaLabelBy.split(' ');
  let result = false;
  for (const id of elementIds) {
    if (!result) {
      result = window.qwPage.getElementByID(id) !== null;
    }
  }

  return result;
}

export default getAccessibleNameSelector;
