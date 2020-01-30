'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { trim } from 'lodash';
import getTrimmedText from './getTrimmedText';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementWidget from './isElementWidget';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import { formElements, typesWithLabel, sectionAndGrouping, tabularElements } from './constants';
import getElementAttribute from '../domUtils/getElementAttribute';
import getElementStyleProperty from '../domUtils/getElementStyleProperty';
import elementHasRoleNoneOrPresentation = require("./elementHasRoleNoneOrPresentation");
import getElementType from '../domUtils/getElementType';
import getElementById from '../domUtils/getElementById';
import isElementHidden from '../domUtils/isElementHidden';
import getElementParent from '../domUtils/getElementParent';
import getElementTagName from '../domUtils/getElementTagName';
import getElementChildren from '../domUtils/getElementChildren';
import getTreeSelector from '../shadowDomUtils/getTreeSelector';
import getElementRoleAName from './getElementRoleAName';
import isElementControl from './isElementControl';
async function getAccessibleName(element: ElementHandle, page: Page): Promise<string | undefined> {
  return await getAccessibleNameRecursion(element, page, false, false);
}

async function getAccessibleNameRecursion(element: ElementHandle, page: Page, recursion: boolean, isWidget: boolean): Promise<string | undefined> {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType, value, role, placeholder, id;
  // let isChildOfDetails = isElementChildOfDetails(element);
  // let isSummary = element.name === "summary";
  let type = await getElementType(element);
  let name = await getElementTagName(element);
  console.log(name)
  let allowNameFromContent = await allowsNameFromContent(element);
  let treeSelector = await getTreeSelector(element);
  // let summaryCheck = ((isSummary && isChildOfDetails) || !isSummary);
  ariaLabelBy = await getElementAttribute(element, "aria-labelledby");

  if (ariaLabelBy !== null && !(await verififyAriaLabel(ariaLabelBy,page, element))) {
    ariaLabelBy = "";
  }
  ariaLabel = await getElementAttribute(element, "aria-label");
  attrType = await getElementAttribute(element, "type");
  title = await getElementAttribute(element, "title");
  role = await getElementRoleAName(element, page,"");
  id = await getElementAttribute(element, "id");

  let referencedByAriaLabel = await isElementReferencedByAriaLabel(element, page);
  if (await isElementHidden(element) && !recursion ) {
    //noAName
  } else if (type === "text") {
    AName = await getTrimmedText(element);
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = await getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy, page);
  } else if (ariaLabel && trim(ariaLabel) !== "") {
    AName = ariaLabel;
  } else if (name === "area" || (name === "input" && attrType === "image")) {
    alt = await getElementAttribute(element, "alt");
    AName = getFirstNotUndefined(alt, title);
  } else if (name === "img") {
    alt = await getElementAttribute(element, "alt");
    if (!(await elementHasRoleNoneOrPresentation(element))) {
      AName = getFirstNotUndefined(alt, title);
    }
  } else if (name === "input" && (attrType === "button" || attrType === "submit" || attrType === "reset")) {
    value = await getElementAttribute(element, "value");
    AName = getFirstNotUndefined(value, getDefaultName(element), title);
  } else if (name === "input" && (typesWithLabel.indexOf(attrType) >= 0 || !attrType)) {
    placeholder = await getElementAttribute(element, "placeholder");
    if (!recursion) {
      AName = getFirstNotUndefined(await getValueFromLabel(element, id, page, treeSelector), title, placeholder);
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name && formElements.indexOf(name) >= 0) {
    console.log("form")
    console.log(recursion);
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, page, treeSelector), title);
    } else {
      AName = getFirstNotUndefined(title);
    }
  } else if (name === "textarea") {
    placeholder = await getElementAttribute(element, "placeholder");
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, page, treeSelector), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(element, page), title, placeholder);
    }
  } else if (name === "figure") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(element, "figcaption", page, treeSelector), title);
  } else if (name === "table") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(element, "caption", page, treeSelector), title);
  } else if (name === "fieldset") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(element, "legend", page, treeSelector), title);
  } else if (isWidget && await isElementControl(element,page)) {
    AName = getFirstNotUndefined(getValueFromEmbeddedControl(element, page, treeSelector), title);
  } else if (allowNameFromContent || ((role && allowNameFromContent) || (!role)) && recursion || name === "label") {
    AName = getFirstNotUndefined(await getTextFromCss(element, page), title);
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
      if (trim(String(arg)) !== "") {
        end = true;
      }
    }
    i++;
  }

  return result;
}

async function getValueFromSpecialLabel(element: ElementHandle, label: string, page: Page, treeSelector: string): Promise<string> {
  let labelElement = await element.$(label + treeSelector);
  let accessNameFromLabel;

  if (labelElement)
    accessNameFromLabel = await getAccessibleNameRecursion(labelElement, page, true, false);

  return accessNameFromLabel;
}

async function getValueFromLabel(element: ElementHandle, id: string, page: Page, treeSelector: string): Promise<string> {
  let referencedByLabelList: ElementHandle[] = [];
  let referencedByLabel = await page.$(`label[for="${id}"]` + treeSelector);
  if (referencedByLabel) {
    referencedByLabelList.push(referencedByLabel);
  }
  let parent = await getElementParent(element);
  let result, accessNameFromLabel;
  let isWidget = await isElementWidget(element);

  if (parent && await getElementTagName(parent) === "label") {
    referencedByLabelList.push(parent);
  }

  for (let label of referencedByLabelList) {
    accessNameFromLabel = await getAccessibleNameRecursion(label, page, true, isWidget);
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


async function getAccessibleNameFromAriaLabelledBy(element: ElementHandle, ariaLabelId: string, page: Page): Promise<string | undefined> {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  let isWidget = await isElementWidget(element);
  let elem;

  for (let id of ListIdRefs) {
    elem = await getElementById(page, element, id);
    accessNameFromId = await getAccessibleNameRecursion(elem, page, true, isWidget);
    if (accessNameFromId) {
      if (result) {
        result += accessNameFromId;
      } else {
        result = accessNameFromId;
      }
    }
  }
  return result;
}

async function getTextFromCss(element: ElementHandle, page: Page): Promise<string> {
  let before = await getElementStyleProperty(element, "content", ":before");
  let after = await getElementStyleProperty(element, "content", ":after");
  let aNameChildren = await getAccessibleNameFromChildren(element, page);
  let textValue = await getTrimmedText(element);

  if (after === "none")
    after = "";
  if (before === "none")
    before = "";

  if (!aNameChildren) {
    aNameChildren = "";
  }

  return before + textValue + aNameChildren + after;
}

async function getAccessibleNameFromChildren(element: ElementHandle, page: Page): Promise<string> {
  let isWidget = await isElementWidget(element);
  let result, aName;
  let children = await getElementChildren(element);

  if (children) {
    for (let child of children) {
      aName = await getAccessibleNameRecursion(child, page, true, isWidget);
      if (aName) {
        if (result) {
          result += aName;
        } else {
          result = aName;
        }
      }
    }
  }
  return result;
}
async function verififyAriaLabel(ariaLabelBy:string,page:Page,element:ElementHandle){

  let elementIds = ariaLabelBy.split(" ");
  let result = false;
  for(let id of elementIds){
    if(!result){
      result = await getElementById(page, element, id) !== null;
    }
  }

  return result;
}


export = getAccessibleName;
