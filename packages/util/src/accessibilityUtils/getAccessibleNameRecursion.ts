'use strict';
import { formElements, typesWithLabel } from './constants';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import getDefaultName from './getDefaultName';
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';
function getAccessibleNameRecursion(
  elementQW: QWElement,
  pageQW: QWPage,
  recursion: boolean,
  isWidget: boolean
): string | undefined {
  let AName, alt, value, placeholder;
  const name = elementQW.getElementTagName();
  const allowNameFromContent = AccessibilityUtils.allowsNameFromContent(elementQW);

  let ariaLabelBy = elementQW.getElementAttribute('aria-labelledby');
  const id = elementQW.getElementAttribute('id');

  if (ariaLabelBy !== null && !verifyAriaLabel(ariaLabelBy, pageQW, elementQW, id)) {
    ariaLabelBy = '';
  }
  const ariaLabel = elementQW.getElementAttribute('aria-label');
  const attrType = elementQW.getElementAttribute('type');
  const title = elementQW.getElementAttribute('title');
  const role = AccessibilityUtils.getElementRoleAName(elementQW, pageQW, '');

  const referencedByAriaLabel = AccessibilityUtils.isElementReferencedByAriaLabel(elementQW, pageQW);
  if (name === 'svg') {
    AName = getAccessibleNameSVGRecursion(elementQW, pageQW, recursion);
  } else if (ariaLabelBy && ariaLabelBy !== '' && !(referencedByAriaLabel && recursion)) {
    try {
      AName = getAccessibleNameFromAriaLabelledBy(elementQW, ariaLabelBy, pageQW);
    } catch (e) {
      AName = '';
    }
  } else if (ariaLabel && ariaLabel.trim() !== '') {
    AName = ariaLabel;
  } else if (isWidget && AccessibilityUtils.isElementControl(elementQW, pageQW)) {
    AName = getFirstNotUndefined(getValueFromEmbeddedControl(elementQW, pageQW), title);
  } else if (name === 'area' || (name === 'input' && attrType === 'image')) {
    alt = elementQW.getElementAttribute('alt');
    AName = getFirstNotUndefined(alt, title);
  } else if (name === 'img') {
    alt = elementQW.getElementAttribute('alt');
    AName = getFirstNotUndefined(alt, title);
  } else if (name === 'input' && (attrType === 'button' || attrType === 'submit' || attrType === 'reset')) {
    value = elementQW.getElementAttribute('value');
    AName = getFirstNotUndefined(value, getDefaultName(elementQW), title);
  } else if (name === 'input' && (!attrType || typesWithLabel.indexOf(attrType) >= 0)) {
    placeholder = elementQW.getElementAttribute('placeholder');
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(elementQW, id, pageQW), title, placeholder);
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name && formElements.indexOf(name) >= 0) {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(elementQW, id, pageQW), title);
    } else {
      AName = getFirstNotUndefined(title);
    }
  } else if (name === 'textarea') {
    placeholder = elementQW.getElementAttribute('placeholder');
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(elementQW, id, pageQW), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(elementQW, pageQW, isWidget), title, placeholder);
    }
  } else if (name === 'figure') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(elementQW, 'figcaption', pageQW), title);
  } else if (name === 'table') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(elementQW, 'caption', pageQW), title);
  } else if (name === 'fieldset') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(elementQW, 'legend', pageQW), title);
  } else if (allowNameFromContent || (((role && allowNameFromContent) || !role) && recursion) || name === 'label') {
    AName = getFirstNotUndefined(getTextFromCss(elementQW, pageQW, isWidget), title);
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

function getValueFromSpecialLabel(element: QWElement, label: string, page: QWPage): string {
  const labelElement = element.getElement(label);
  let accessNameFromLabel;

  if (labelElement)
    accessNameFromLabel = AccessibilityUtils.getAccessibleNameRecursion(labelElement, page, true, false);

  return accessNameFromLabel;
}

function getValueFromLabel(element: QWElement, id: string | null, page: QWPage): string {
  const referencedByLabelList: QWElement[] = [];
  const referencedByLabel = page.getElements(`label[for="${id}"]`, element);
  if (referencedByLabel) {
    referencedByLabelList.push(...referencedByLabel);
  }
  const parent = element.getElementParent();
  let result, accessNameFromLabel;
  const isWidget = AccessibilityUtils.isElementWidget(element, page);

  if (parent && parent.getElementTagName() === 'label' && !isElementPresent(parent, referencedByLabelList)) {
    referencedByLabelList.push(parent);
  }

  for (const label of referencedByLabelList) {
    accessNameFromLabel = AccessibilityUtils.getAccessibleNameRecursion(label, page, true, isWidget);
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
function isElementPresent(element: QWElement, listElement: QWElement[]): boolean {
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
  element: QWElement,
  ariaLabelId: string,
  page: QWPage
): string | undefined {
  const ListIdRefs = ariaLabelId.split(' ');
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  const isWidget = AccessibilityUtils.isElementWidget(element, page);
  const elementID = element.getElementAttribute('id');
  let elem;

  for (const id of ListIdRefs) {
    if (id !== '' && elementID !== id) elem = page.getElementByID(id, element);
    if (elem) accessNameFromId = AccessibilityUtils.getAccessibleNameRecursion(elem, page, true, isWidget);
    if (accessNameFromId) {
      if (result) {
        result += accessNameFromId.trim() + ' ';
      } else {
        result = accessNameFromId.trim() + ' ';
      }
      elem = null;
    }
  }
  return result ? result.trim() : result;
}

function getTextFromCss(element: QWElement, page: QWPage, isWidget: boolean): string {
  let before = element.getElementStyleProperty('content', ':before');
  let after = element.getElementStyleProperty('content', ':after');
  const aNameList = getAccessibleNameFromChildren(element, page, isWidget);
  const textValue = getConcatentedText(element, aNameList);

  if (after === 'none') after = '';
  if (before === 'none') before = '';

  return before.replace(/["']/g, '') + textValue + after.replace(/["']/g, '');
}

function getConcatentedText(elementQW: QWElement, aNames: string[]): string {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  return elementQW.concatANames(aNames);
}

function getAccessibleNameFromChildren(element: QWElement, page: QWPage, isWidget: boolean): string[] {
  if (!isWidget) {
    isWidget = AccessibilityUtils.isElementWidget(element, page);
  }
  let aName;
  const children = element.getElementChildren();
  const elementAnames: string[] = [];

  if (children) {
    for (const child of children) {
      if (AccessibilityUtils.isElementInAT(child, page)) {
        aName = AccessibilityUtils.getAccessibleNameRecursion(child, page, true, isWidget);
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

function verifyAriaLabel(ariaLabelBy: string, page: QWPage, element: QWElement, elementID: string | null) {
  const elementIds = ariaLabelBy.split(' ');
  let result = false;
  for (const id of elementIds) {
    if (!result && id !== '' && elementID !== id) {
      result = page.getElementByID(id, element) !== null;
    }
  }

  return result;
}

export default getAccessibleNameRecursion;
