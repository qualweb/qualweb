'use strict';

import { ElementHandle, Page } from 'puppeteer';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementWidget from './isElementWidget';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import { formElements, typesWithLabel, sectionAndGrouping, tabularElements } from './constants';
import getElementAttribute from '../domUtils/getElementAttribute';
import getElementType from '../domUtils/getElementType';
import getElementById from '../domUtils/getElementById';
import getElementParent from '../domUtils/getElementParent';
import getElementTagName from '../domUtils/getElementTagName';
import getElementChildren from '../domUtils/getElementChildren';
import getTreeSelector from '../shadowDomUtils/getTreeSelector';
import getElementRoleAName from './getElementRoleAName';
import isElementControl from './isElementControl';
import getElementSelector from '../domUtils/getElementSelector';
async function getAccessibleNameSelector(element: ElementHandle, page: Page): Promise<string[] | undefined> {
  return await getAccessibleNameRecursion(element, page, false, false);
}

async function getAccessibleNameRecursion(element: ElementHandle, page: Page, recursion: boolean, isWidget: boolean): Promise<string []| undefined> {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType, value, role, placeholder, id,defaultName;
  let elementSelector = await getElementType(element);
  let name = await getElementTagName(element);
  let allowNameFromContent = await allowsNameFromContent(element);
  let treeSelector = await getTreeSelector(element);
  ariaLabelBy = await getElementAttribute(element, "aria-labelledby");

  if (ariaLabelBy !== null && !(await verififyAriaLabel(ariaLabelBy, page, element))) {
    ariaLabelBy = "";
  }
  ariaLabel = !!(await getElementAttribute(element, "aria-label")) ? [elementSelector] : null;
  attrType = await getElementAttribute(element, "type");
  title = !!(await getElementAttribute(element, "title")) ? [elementSelector] : null;
  alt = !!(await getElementAttribute(element, "alt")) ? [elementSelector] : null;
  value = !!(await getElementAttribute(element, "value")) ? [elementSelector] : null;
  placeholder = await getElementAttribute(element, "placeholder") ? [elementSelector] : null;
  role = await getElementRoleAName(element, page, "");
  id = await getElementAttribute(element, "id");
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

async function getValueFromSpecialLabel(element: ElementHandle, label: string, page: Page, treeSelector: string): Promise<string> {
  let labelElement = await element.$(label + treeSelector);
  let accessNameFromLabel, result;

  if (labelElement)
    accessNameFromLabel = await getAccessibleNameRecursion(labelElement, page, true, false);

  if (!!accessNameFromLabel)
    result = [await getElementSelector(element)];

  return result;
}

async function getValueFromLabel(element: ElementHandle, id: string, page: Page, treeSelector: string): Promise<string[]> {
  let referencedByLabelList: ElementHandle[] = [];
  let referencedByLabel = await page.$$(`label[for="${id}"]` + treeSelector);
  if (referencedByLabel) {
    referencedByLabelList.push(...referencedByLabel);
  }
  let parent = await getElementParent(element);
  let result: string[] = [], accessNameFromLabel;
  let isWidget = await isElementWidget(element, page);

  if (parent && await getElementTagName(parent) === "label" && !(await isElementPresent(parent, referencedByLabelList))) {
    referencedByLabelList.push(parent);
  }

  for (let label of referencedByLabelList) {
    accessNameFromLabel = await getAccessibleNameRecursion(label, page, true, isWidget);
    if (accessNameFromLabel) {
      result.push(await getElementSelector(label))
    }

  }

  return result;
}
async function isElementPresent(element: ElementHandle, listElement: ElementHandle[]): Promise<boolean> {
  let result = false;
  let i = 0;
  let elementSelector = await getElementSelector(element);
  while (i < listElement.length && !result) {
    result = elementSelector === await getElementSelector(listElement[i]);
  }
  return result;

}



async function getAccessibleNameFromAriaLabelledBy(element: ElementHandle, ariaLabelId: string, page: Page): Promise<string[]> {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string[] = [];
  let accessNameFromId;
  let isWidget = await isElementWidget(element, page);
  let elem;


  for (let id of ListIdRefs) {
    elem = await getElementById(page, element, id);
    accessNameFromId = await getAccessibleNameRecursion(elem, page, true, isWidget);
    if (accessNameFromId) {
      result.push(await getElementSelector(elem));
    }
  }
  return result;
}

async function getTextFromCss(element: ElementHandle, page: Page, isWidget: boolean): Promise<string[]> {
  let aNameList = await getAccessibleNameFromChildren(element, page, isWidget);
  let textValue = !!(await getConcatentedText(element, [])) ? await getElementSelector(element) : null;

  if (!!textValue)
    aNameList.push(textValue);



  return aNameList;
}

async function getConcatentedText(element: ElementHandle, aNames: string[]): Promise<string> {
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

async function getAccessibleNameFromChildren(element: ElementHandle, page: Page, isWidget: boolean): Promise<string[]> {
  if (!isWidget) {
    isWidget = await isElementWidget(element, page);
  }
  let children = await getElementChildren(element);
  let result: string[] = [];
  let aName;

  if (children) {
    for (let child of children) {
      aName = await getAccessibleNameRecursion(child, page, true, isWidget);
      if (aName) {
        result.push(await getElementSelector(child));
      }
    }
  }
  return result;
}



async function verififyAriaLabel(ariaLabelBy: string, page: Page, element: ElementHandle) {

  let elementIds = ariaLabelBy.split(" ");
  let result = false;
  for (let id of elementIds) {
    if (!result) {
      result = await getElementById(page, element, id) !== null;
    }
  }

  return result;
}

export default getAccessibleNameSelector;