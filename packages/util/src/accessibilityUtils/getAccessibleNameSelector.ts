'use strict';
import allowsNameFromContent from './allowsNameFromContent';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import { formElements, typesWithLabel } from './constants';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';
import getDefaultName from './getDefaultName';

function getAccessibleNameSelector(element: QWElement, pageQW: QWPage): string[] | undefined {
  return getAccessibleNameRecursion(element, pageQW, false, false);
}

function getAccessibleNameRecursion(
  element: QWElement,
  page: QWPage,
  recursion: boolean,
  isWidget: boolean
): string[] | undefined {
  let AName, ariaLabelBy;
  const elementSelector = element.getElementSelector();
  const name = element.getElementTagName();
  const allowNameFromContent = allowsNameFromContent(element);
  ariaLabelBy = element.getElementAttribute('aria-labelledby');

  if (ariaLabelBy !== null && !verifyAriaLabel(ariaLabelBy, page, element)) {
    ariaLabelBy = '';
  }
  const ariaLabel = element.getElementAttribute('aria-label') ? [elementSelector] : null;
  const attrType = element.getElementAttribute('type');
  const title = element.getElementAttribute('title') ? [elementSelector] : null;
  const alt = element.getElementAttribute('alt') ? [elementSelector] : null;
  const value = element.getElementAttribute('value') ? [elementSelector] : null;
  const placeholder = element.getElementAttribute('placeholder') ? [elementSelector] : null;
  const role = AccessibilityUtils.getElementRoleAName(element, page, '');
  const id = element.getElementAttribute('id');
  const defaultName = getDefaultName(element) ? ['default'] : null;

  const referencedByAriaLabel = AccessibilityUtils.isElementReferencedByAriaLabel(element, page);
  if (ariaLabelBy && ariaLabelBy !== '' && !(referencedByAriaLabel && recursion)) {
    AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy, page);
  } else if (ariaLabel) {
    AName = ariaLabel;
  } else if (isWidget && AccessibilityUtils.isElementControl(element, page)) {
    const valueFromEmbeddedControl = getValueFromEmbeddedControl(element, page) ? elementSelector : null;
    AName = getFirstNotUndefined(valueFromEmbeddedControl, title);
  } else if (name === 'area' || (name === 'input' && attrType === 'image')) {
    AName = getFirstNotUndefined(alt, title);
  } else if (name === 'img') {
    AName = getFirstNotUndefined(alt, title);
  } else if (name === 'input' && (attrType === 'button' || attrType === 'submit' || attrType === 'reset')) {
    AName = getFirstNotUndefined(value, defaultName, title);
  } else if (name === 'input' && (!attrType || typesWithLabel.indexOf(attrType) >= 0)) {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, page), title, placeholder);
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name && formElements.indexOf(name) >= 0) {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, page), title);
    } else {
      AName = getFirstNotUndefined(title);
    }
  } else if (name === 'textarea') {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, page), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(element, page, isWidget), title, placeholder);
    }
  } else if (name === 'figure') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'figcaption', page), title);
  } else if (name === 'table') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'caption', page), title);
  } else if (name === 'fieldset') {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, 'legend', page), title);
  } else if (allowNameFromContent || (((role && allowNameFromContent) || !role) && recursion)) {
    AName = getFirstNotUndefined(getTextFromCss(element, page, isWidget), title);
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

function getValueFromSpecialLabel(element: QWElement, label: string, page: QWPage): string {
  const labelElement = element.getElement(label);
  let accessNameFromLabel, result;

  if (labelElement) accessNameFromLabel = getAccessibleNameRecursion(labelElement, page, true, false);

  if (accessNameFromLabel) result = [element.getElementSelector()];

  return result;
}

function getValueFromLabel(element: QWElement, id: string | null, page: QWPage): string[] {
  const referencedByLabelList: QWElement[] = [];
  const referencedByLabel = page.getElements(`label[for="${id}"]`, element);
  if (referencedByLabel) {
    referencedByLabelList.push(...referencedByLabel);
  }
  const parent = element.getElementParent();
  let result: string[] = [],
    accessNameFromLabel;
  const isWidget = AccessibilityUtils.isElementWidget(element, page);

  if (parent && parent.getElementTagName() === 'label' && !isElementPresent(parent, referencedByLabelList)) {
    referencedByLabelList.push(parent);
  }

  for (const label of referencedByLabelList) {
    accessNameFromLabel = getAccessibleNameRecursion(label, page, true, isWidget);
    if (accessNameFromLabel) {
      result.push(label.getElementSelector());
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

function getAccessibleNameFromAriaLabelledBy(element: QWElement, ariaLabelId: string, page: QWPage): string[] {
  const ListIdRefs = ariaLabelId.split(' ');
  const result: string[] = [];
  let accessNameFromId;
  const isWidget = AccessibilityUtils.isElementWidget(element, page);
  let elem;
  const elementID = element.getElementAttribute('id');

  for (const id of ListIdRefs) {
    if (id !== '' && elementID !== id) elem = page.getElementByID(id);
    if (elem) accessNameFromId = getAccessibleNameRecursion(elem, page, true, isWidget);
    if (accessNameFromId) {
      result.push(elem.getElementSelector());
    }
  }
  return result;
}

function getTextFromCss(element: QWElement, page: QWPage, isWidget: boolean): string[] {
  const aNameList = getAccessibleNameFromChildren(element, page, isWidget);
  const textValue = getConcatentedText(element, []) ? element.getElementSelector() : null;

  if (textValue) aNameList.push(textValue);

  return aNameList;
}

function getConcatentedText(element: QWElement, aNames: string[]): string {
  if (!element) {
    throw Error('Element is not defined');
  }
  return element.concatANames(aNames);
}

function getAccessibleNameFromChildren(element: QWElement, page: QWPage, isWidget: boolean): string[] {
  if (!isWidget) {
    isWidget = AccessibilityUtils.isElementWidget(element, page);
  }
  const children = element.getElementChildren();
  const result: string[] = [];
  let aName;

  if (children) {
    for (const child of children) {
      aName = getAccessibleNameRecursion(child, page, true, isWidget);
      if (aName) {
        result.push(child.getElementSelector());
      }
    }
  }
  return result;
}

function verifyAriaLabel(ariaLabelBy: string, page: QWPage, element: QWElement) {
  const elementIds = ariaLabelBy.split(' ');
  let result = false;
  for (const id of elementIds) {
    if (!result) {
      result = page.getElementByID(id) !== null;
    }
  }

  return result;
}

export default getAccessibleNameSelector;
