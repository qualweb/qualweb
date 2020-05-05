'use strict';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementWidget from './isElementWidget';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import { formElements, typesWithLabel, sectionAndGrouping, tabularElements } from './constants';
//import getTreeSelector from '../shadowDomUtils/getTreeSelector';
import getElementRoleAName from './getElementRoleAName';
import isElementControl from './isElementControl';

import { QWElement,QWPage } from '@qualweb/html-util';
import { AccessibilityUtils } from "..";

async function getAccessibleNameSelector(elementQW: QWElement,  pageQW:QWPage): Promise<string[] | undefined> {
  return await getAccessibleNameRecursion(elementQW, pageQW, false, false);
}

async function getAccessibleNameRecursion(element: QWElement, page: QWPage, recursion: boolean, isWidget: boolean): Promise<string []| undefined> {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType, value, role, placeholder, id,defaultName;
  let elementSelector = await AccessibilityUtils.domUtils.getElementSelector(element);
  let name = await AccessibilityUtils.domUtils.getElementTagName(element);
  let allowNameFromContent = await allowsNameFromContent(element);
  let treeSelector = "";//await getTreeSelector(element);
  ariaLabelBy = await AccessibilityUtils.domUtils.getElementAttribute(element, "aria-labelledby");

  if (ariaLabelBy !== null && !(await verififyAriaLabel(ariaLabelBy, page, element))) {
    ariaLabelBy = "";
  }
  ariaLabel = !!(await AccessibilityUtils.domUtils.getElementAttribute(element, "aria-label")) ? [elementSelector] : null;
  attrType = await AccessibilityUtils.domUtils.getElementAttribute(element, "type");
  title = !!(await AccessibilityUtils.domUtils.getElementAttribute(element, "title")) ? [elementSelector] : null;
  alt = !!(await AccessibilityUtils.domUtils.getElementAttribute(element, "alt")) ? [elementSelector] : null;
  value = !!(await AccessibilityUtils.domUtils.getElementAttribute(element, "value")) ? [elementSelector] : null;
  placeholder = await AccessibilityUtils.domUtils.getElementAttribute(element, "placeholder") ? [elementSelector] : null;
  role = await getElementRoleAName(element, page, "");
  id = await AccessibilityUtils.domUtils.getElementAttribute(element, "id");
  defaultName = !!(await getDefaultName(element))?["default"]:null;

  let referencedByAriaLabel = await isElementReferencedByAriaLabel(element, page);
  if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = await getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy, page);
  } else if (ariaLabel ) {
    AName = ariaLabel;
  } else if (isWidget && await isElementControl(element, page)) {
    let valueFromEmbeddedControl = !!(await getValueFromEmbeddedControl(element, page, treeSelector)) ? elementSelector : null;
    AName = getFirstNotUndefined(valueFromEmbeddedControl, title);
  } else if (name === "area" || (name === "input" && attrType === "image")) {
    AName = getFirstNotUndefined(alt, title);
  } else if (name === "img") {
    AName = getFirstNotUndefined(alt, title);
  } else if (name === "input" && (attrType === "button" || attrType === "submit" || attrType === "reset")) {
    AName = getFirstNotUndefined(value,defaultName , title);
  } else if (name === "input" && (typesWithLabel.indexOf(attrType) >= 0 || !attrType)) {
    if (!recursion) {
      AName = getFirstNotUndefined(await getValueFromLabel(element, id, page, treeSelector), title, placeholder);
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name && formElements.indexOf(name) >= 0) {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, page, treeSelector), title);
    } else {
      AName = getFirstNotUndefined(title);
    }
  } else if (name === "textarea") {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, page, treeSelector), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(element, page, isWidget), title, placeholder);
    }
  } else if (name === "figure") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(element, "figcaption", page, treeSelector), title);
  } else if (name === "table") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(element, "caption", page, treeSelector), title);
  } else if (name === "fieldset") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(element, "legend", page, treeSelector), title);
  } else if (allowNameFromContent || ((role && allowNameFromContent) || (!role)) && recursion) {
    AName = getFirstNotUndefined(await getTextFromCss(element, page, isWidget), title);
  } else if (name && (sectionAndGrouping.indexOf(name) >= 0 || name === "iframe" || tabularElements.indexOf(name) >= 0)) {
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
      if (String(arg).trim() !== "") {
        end = true;
      }
    }
    i++;
  }

  return result;
}

async function getValueFromSpecialLabel(element: QWElement, label: string, page: QWPage, treeSelector: string): Promise<string> {
  let labelElement = await AccessibilityUtils.domUtils.getElementInsideElement(element,label + treeSelector);
  let accessNameFromLabel, result;

  if (labelElement)
    accessNameFromLabel = await getAccessibleNameRecursion(labelElement, page, true, false);

  if (!!accessNameFromLabel)
    result = [await AccessibilityUtils.domUtils.getElementSelector(element)];

  return result;
}

async function getValueFromLabel(element: QWElement, id: string, page: QWPage, treeSelector: string): Promise<string[]> {
  let referencedByLabelList: QWElement[] = [];
  let referencedByLabel = await AccessibilityUtils.domUtils.getElementsInsideDocument(page,`label[for="${id}"]` + treeSelector);
  if (referencedByLabel) {
    referencedByLabelList.push(...referencedByLabel);
  }
  let parent = await AccessibilityUtils.domUtils.getElementParent(element);
  let result: string[] = [], accessNameFromLabel;
  let isWidget = await isElementWidget(element, page);

  if (parent && await AccessibilityUtils.domUtils.getElementTagName(parent) === "label" && !(await isElementPresent(parent, referencedByLabelList))) {
    referencedByLabelList.push(parent);
  }

  for (let label of referencedByLabelList) {
    accessNameFromLabel = await getAccessibleNameRecursion(label, page, true, isWidget);
    if (accessNameFromLabel) {
      result.push(await AccessibilityUtils.domUtils.getElementSelector(label))
    }

  }

  return result;
}
async function isElementPresent(element: QWElement, listElement: QWElement[]): Promise<boolean> {
  let result = false;
  let i = 0;
  let elementSelector = await AccessibilityUtils.domUtils.getElementSelector(element);
  while (i < listElement.length && !result) {
    result = elementSelector === await AccessibilityUtils.domUtils.getElementSelector(listElement[i]);
  }
  return result;

}



async function getAccessibleNameFromAriaLabelledBy(element: QWElement, ariaLabelId: string, page: QWPage): Promise<string[]> {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string[] = [];
  let accessNameFromId;
  let isWidget = await isElementWidget(element, page);
  let elem;


  for (let id of ListIdRefs) {
    elem = await AccessibilityUtils.domUtils.getElementById(page, element, id);
    accessNameFromId = await getAccessibleNameRecursion(elem, page, true, isWidget);
    if (accessNameFromId) {
      result.push(await AccessibilityUtils.domUtils.getElementSelector(elem));
    }
  }
  return result;
}

async function getTextFromCss(element: QWElement, page: QWPage, isWidget: boolean): Promise<string[]> {
  let aNameList = await getAccessibleNameFromChildren(element, page, isWidget);
  let textValue = !!(await getConcatentedText(element, [])) ? await AccessibilityUtils.domUtils.getElementSelector(element) : null;

  if (!!textValue)
    aNameList.push(textValue);



  return aNameList;
}

async function getConcatentedText(element: QWElement, aNames: string[]): Promise<string> {
  if (!element) {
    throw Error('Element is not defined');
  }
  let text = await element.evaluate((element, aNames) => {
    let chidlren = element.childNodes;
    let result = "";
    let textContent;
    let i = 0;
    let counter = 0;
    for (let child of chidlren) {
      textContent = child.textContent
      if (child.nodeType === 3 && !!textContent && textContent.trim() !== "") {
        result = result + (counter === 0 ? "" : " ") + textContent.trim();
        counter++;
      } else if (child.nodeType === 1) {
        result = result + (counter > 0 && !!aNames[i] ? " " : "") + aNames[i];
        i++;
      }

    }
    return result
  }, aNames);

  if (!text) {
    text = "";
  }

  return text;
}

async function getAccessibleNameFromChildren(element: QWElement, page: QWPage, isWidget: boolean): Promise<string[]> {
  if (!isWidget) {
    isWidget = await isElementWidget(element, page);
  }
  let children = await AccessibilityUtils.domUtils.getElementChildren(element);
  let result: string[] = [];
  let aName;

  if (children) {
    for (let child of children) {
      aName = await getAccessibleNameRecursion(child, page, true, isWidget);
      if (aName) {
        result.push(await AccessibilityUtils.domUtils.getElementSelector(child));
      }
    }
  }
  return result;
}



async function verififyAriaLabel(ariaLabelBy: string, page: QWPage, element: QWElement) {

  let elementIds = ariaLabelBy.split(" ");
  let result = false;
  for (let id of elementIds) {
    if (!result) {
      result = await AccessibilityUtils.domUtils.getElementById(page, element, id) !== null;
    }
  }

  return result;
}

export default getAccessibleNameSelector;