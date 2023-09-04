import { formElements, typesWithLabel } from './constants';
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';

function getAccessibleNameRecursion(
  element: typeof window.qwElement,
  recursion: boolean,
  isWidget: boolean
): string | undefined {
  let AName, alt, value, placeholder;
  const name = element.getElementTagName();
  const allowNameFromContent = window.AccessibilityUtils.allowsNameFromContent(element);

  let ariaLabelBy = element.getElementAttribute('aria-labelledby');
  const id = element.getElementAttribute('id');

  if (ariaLabelBy !== null && !verifyAriaLabel(ariaLabelBy, id)) {
    ariaLabelBy = '';
  }
  const ariaLabel = element.getElementAttribute('aria-label');
  const attrType = element.getElementAttribute('type');
  const title = element.getElementAttribute('title');
  const role = window.AccessibilityUtils.getElementRoleAName(element, '');
  console.log({ element, recursion, isWidget, allowNameFromContent, role });

  const referencedByAriaLabel = window.AccessibilityUtils.isElementReferencedByAriaLabel(element);
  if (name === 'svg') {
    AName = getAccessibleNameSVGRecursion(element, recursion);
  } else if (ariaLabelBy && ariaLabelBy !== '' && !(referencedByAriaLabel && recursion)) {
    try {
      AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy);
    } catch (e) {
      AName = '';
    }
  } else if (ariaLabel && ariaLabel.trim() !== '') {
    AName = ariaLabel;
  } else if (isWidget && window.AccessibilityUtils.isElementControl(element)) {
    AName = getFirstNotUndefined(window.AccessibilityUtils.getValueFromEmbeddedControl(element), title);
  } else if (name === 'area' || (name === 'input' && attrType === 'image')) {
    alt = element.getElementAttribute('alt');
    AName = getFirstNotUndefined(alt, title);
  } else if (name === 'img') {
    alt = element.getElementAttribute('alt');
    AName = getFirstNotUndefined(alt, title);
  } else if (name === 'input' && (attrType === 'button' || attrType === 'submit' || attrType === 'reset')) {
    value = element.getElementAttribute('value');
    AName = getFirstNotUndefined(value, window.AccessibilityUtils.getDefaultName(element), title);
  } else if (name === 'input' && (!attrType || typesWithLabel.indexOf(attrType) >= 0)) {
    placeholder = element.getElementAttribute('placeholder');
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
    placeholder = element.getElementAttribute('placeholder');
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(element, isWidget), title, placeholder);
    }
  } else if (name === 'figure') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'figcaption'), title);
  } else if (name === 'table') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'caption'), title);
  } else if (name === 'fieldset') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'legend'), title);
  } else if (
    allowNameFromContent ||
    (((role && allowNameFromContent) || !role || role === 'generic' || role === 'paragraph') && recursion) ||
    name === 'label'
  ) {
    AName = getFirstNotUndefined(getTextFromCss(element, isWidget), title);
  } /*if (name && (sectionAndGrouping.indexOf(name) >= 0 || name === "iframe" || tabularElements.indexOf(name) >= 0))*/ else {
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

function getValueFromSpecialLabel(element: typeof window.qwElement, label: string): string {
  const labelElement = element.getElement(label);
  let accessNameFromLabel;

  if (labelElement)
    accessNameFromLabel = window.AccessibilityUtils.getAccessibleNameRecursion(labelElement, true, false);

  return accessNameFromLabel;
}

function getValueFromLabel(element: typeof window.qwElement, id: string | null): string {
  const referencedByLabelList = new Array<typeof window.qwElement>();
  const referencedByLabel = window.qwPage.getElements(`label[for="${id}"]`, element);
  if (referencedByLabel) {
    referencedByLabelList.push(...referencedByLabel);
  }
  const parent = element.getElementParent();
  let result, accessNameFromLabel;
  const isWidget = window.AccessibilityUtils.isElementWidget(element);

  if (parent && parent.getElementTagName() === 'label' && !isElementPresent(parent, referencedByLabelList)) {
    referencedByLabelList.push(parent);
  }

  for (const label of referencedByLabelList ?? []) {
    accessNameFromLabel = window.AccessibilityUtils.getAccessibleNameRecursion(label, true, isWidget);
    if (accessNameFromLabel) {
      if (result) {
        result += accessNameFromLabel;
      } else {
        result = accessNameFromLabel;
      }
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

function getAccessibleNameFromAriaLabelledBy(
  element: typeof window.qwElement,
  ariaLabelId: string
): string | undefined {
  const ListIdRefs = ariaLabelId.split(' ');
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  const isWidget = window.AccessibilityUtils.isElementWidget(element);
  const elementID = element.getElementAttribute('id');
  let elem;

  for (const id of ListIdRefs) {
    if (id !== '' /*&& elementID !== id*/) elem = window.qwPage.getElementByID(id);
    if (elem)
      accessNameFromId = window.AccessibilityUtils.getAccessibleNameRecursion(elem, true, isWidget && elementID !== id);
    if (accessNameFromId) {
      if (result) {
        result += accessNameFromId.trim() + ' ';
      } else {
        result = accessNameFromId.trim() + ' ';
      }
      elem = null;
      accessNameFromId = undefined;
    }
  }
  return result ? result.trim() : result;
}

function getTextFromCss(element: typeof window.qwElement, isWidget: boolean): string {
  const before = cleanSVGAndNoneCode(element.getElementStyleProperty('content', ':before'));
  const after = cleanSVGAndNoneCode(element.getElementStyleProperty('content', ':after'));
  const aNameList = getAccessibleNameFromChildren(element, isWidget);
  const textValue = getConcatenatedText(element, aNameList);

  return before.replace(/["']/g, '') + textValue + after.replace(/["']/g, '');
}

function getConcatenatedText(element: typeof window.qwElement, aNames: Array<string>): string {
  return element.concatANames(aNames);
}

function cleanSVGAndNoneCode(text: string): string {
  if (!text || text === 'none' || text.includes('url(')) {
    text = '';
  }
  return text;
}

function getAccessibleNameFromChildren(element: typeof window.qwElement, isWidget: boolean): Array<string> {
  if (!isWidget) {
    isWidget = window.AccessibilityUtils.isElementWidget(element);
  }
  let aName;
  const children = element.getElementChildren();
  const elementAnames = new Array<string>();
  if (children) {
    for (const child of children) {
      const role = window.AccessibilityUtils.getElementRoleAName(child, '');
      if (!window.DomUtils.isElementHidden(child) && role !== 'presentation' && role !== 'none') {
        aName = window.AccessibilityUtils.getAccessibleNameRecursion(child, true, isWidget);
        if (aName) {
          elementAnames.push(aName);
        } else {
          elementAnames.push('');
        }
      } else {
        elementAnames.push('');
      }
    }
  }
  return elementAnames;
}

function verifyAriaLabel(ariaLabelBy: string, elementID: string | null) {
  const elementIds = ariaLabelBy.split(' ');
  let result = false;
  for (const id of elementIds) {
    if (!result && id !== '' && elementID !== id) {
      result = window.qwPage.getElementByID(id) !== null;
    }
  }

  return result;
}

export default getAccessibleNameRecursion;
