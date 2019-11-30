'use strict';

import {ElementHandle, Page} from 'puppeteer';
import {trim} from 'lodash';

const stew = new (require('stew-select')).Stew();
import {
  isElementHidden,
  getElementById,
  getContentComputedStylesAttribute,
  getElementType,
  getElementParent
} from "../domUtils/domUtils";
import getTrimmedText from './getTrimmedText';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementWidget from './isElementWidget';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import hasRolePresentationOrNone from './hasRolePresentationOrNone';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import {controlRoles, formElements, typesWithLabel, sectionAndGrouping} from './constants';
import getElementName from '../domUtils/getElementName';
import getElementAttribute from '../domUtils/getElementAttribute';
import {elementHasRoleNoneOrPresentation} from "./accessibilityTreeUtils";

function getAccessibleName(element: ElementHandle, page: Page): string | undefined {
  return await getAccessibleNameRecursion(element, page, false, false);
}

async function getAccessibleNameRecursion(element: ElementHandle, page: Page, recursion: boolean, isWidget: boolean): Promise<string | undefined> {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType, value, role, placeholder, id;
  // let isChildOfDetails = isElementChildOfDetails(element);
  // let isSummary = element.name === "summary";
  let type = await getElementType(element);
  let name = await getElementName(element);
  let allowNameFromContent = allowsNameFromContent(element);
  // let summaryCheck = ((isSummary && isChildOfDetails) || !isSummary);
  ariaLabelBy = await getElementAttribute(element, "aria-labelledby");
  if (!ariaLabelBy && await getElementById(ariaLabelBy, page) === null) {
    ariaLabelBy = "";
  }
  ariaLabel = await getElementAttribute(element, "aria-label");
  attrType = await getElementAttribute(element, "type");
  title = await getElementAttribute(element, "title");
  role = await getElementAttribute(element, "role");
  id = await getElementAttribute(element, "id");
  ;

  let referencedByAriaLabel = isElementReferencedByAriaLabel(id, page);

  if (await isElementHidden(element) && !recursion) {
    //noAName
  } else if (type === "text") {
    AName = getTrimmedText(element);
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy, page);
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
  } else if (formElements.indexOf(name) >= 0 && !attrType) {
    AName = getFirstNotUndefined(getValueFromLabel(element, id, page), title);
  } else if (name === "input" && (typesWithLabel.indexOf(attrType) >= 0 || !attrType)) {
    if (element.attribs) {
      placeholder = element.attribs["placeholder"];
    }
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, processedHTML), title, placeholder);
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name === "textarea") {
    if (element.attribs) {

      placeholder = element.attribs["placeholder"];
    }
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, processedHTML), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(element, processedHTML), title, placeholder);
    }
  } else if (name === "figure") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, "figcaption", processedHTML), title);
  } else if (name === "table") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, "caption", processedHTML), title);
  } else if (name === "fieldset") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, "legend", processedHTML), title);
  } else if (isWidget && isRoleControl(element)) {
    AName = getFirstNotUndefined(getValueFromEmbeddedControl(element, processedHTML), title);
  } else if (allowNameFromContent || ((role && allowNameFromContent) || (!role)) && recursion || name === "label") {
    AName = getFirstNotUndefined(getTextFromCss(element, processedHTML), title);
  } else if (sectionAndGrouping.indexOf(String(element.name)) >= 0 || element.name === "iframe" || tabularElements.indexOf(String(name)) >= 0) {
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
    if (arg !== undefined) {
      result = arg;
      if (trim(String(arg)) !== "") {
        end = true;
      }
    }
    i++;
  }

  return result;
}

async function getValueFromSpecialLabel(element: ElementHandle, label: string,page:Page): Promise<string> {
  let labelElement = stew.select(element, label);
  let accessNameFromLabel;

  if (labelElement.length > 0)
    accessNameFromLabel = getAccessibleNameRecursion(labelElement[0], page, true, false);

  return accessNameFromLabel;
}

async function getValueFromLabel(element: ElementHandle, id: string, page:Page): Promise<string> {
  let referencedByLabelList:ElementHandle[] = [];
  let referencedByLabel = await page.$(`label[for="${id}"]`);
  if(referencedByLabel){
    referencedByLabelList.push(referencedByLabel);
  }
  let parent = await getElementParent(element);
  let result, accessNameFromLabel;
  let isWidget = await isElementWidget(element);

  if (parent &&await getElementName(parent)=== "label") {
    referencedByLabelList.push(parent);
  }

  for (let label of referencedByLabelList) {
    accessNameFromLabel = getAccessibleNameRecursion(label, page, true, isWidget);
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
    elem = await getElementById(id, page);
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

function getTextFromCss(element: ElementHandle, processedHTML: ElementHandle[]): string {
  let before = getContentComputedStylesAttribute(element, "computed-style-before", "^ content: &quot");
  let after = getContentComputedStylesAttribute(element, "computed-style-after", "^ content: &quot");
  let aNameChildren = getAccessibleNameFromChildren(element, processedHTML);

  if (!aNameChildren) {
    aNameChildren = "";
  }

  return before + aNameChildren + after;
}

function getAccessibleNameFromChildren(element: ElementHandle, processedHTML: ElementHandle[]): string {
  let isWidget = isElementWidget(element);
  let result, aName;

  if (element.children) {
    for (let child of element.children) {
      aName = getAccessibleNameRecursion(child, processedHTML, true, isWidget);
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

function isRoleControl(element: ElementHandle): boolean {

  if (element.attribs === undefined)
    return false;

  let role = element.attribs["role"];

  return controlRoles.indexOf(role) >= 0
}

export = getAccessibleName;
