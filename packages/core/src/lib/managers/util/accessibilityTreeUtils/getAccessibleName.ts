'use strict';

import { trim } from 'lodash';
import { getElementById, getElementNameDocument, getElementParentDocument, getElementStylePropertyDocument } from "../domUtils/domUtils";
import getTrimmedText from './getTrimmedText';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import hasRolePresentationOrNone from './hasRolePresentationOrNone';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import { controlRoles, formElements, typesWithLabel, sectionAndGrouping, tabularElements } from './constants';
import getElementAttributeDocument from '../domUtils/getElementAttributeDocument';
import isElementHiddenDocument from '../domUtils/isElementHiddenDocument';
import isElementWidgetDocument from './isElementWidgetDocument';

function getAccessibleName(element: Element, document: Document): string | undefined {
  return getAccessibleNameRecursion(element, document, false, false);
}
function getAccessibleNameRecursion(element: Element, document: Document, recursion: boolean, isWidget: boolean): string | undefined {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType, value, role, placeholder, id;
  // let isChildOfDetails = isElementChildOfDetails(element);
  // let isSummary = element.name === "summary";
  let type = element.nodeType;//fixme 
  let name = getElementNameDocument(element);

  let allowNameFromContent = allowsNameFromContent(element);
  // let summaryCheck = ((isSummary && isChildOfDetails) || !isSummary);

  ariaLabelBy = getElementById(getElementAttributeDocument(element, "aria-labelledby"), document) !== null ? getElementAttributeDocument(element, "aria-labelledby") : "";
  ariaLabel = getElementAttributeDocument(element, "aria-label");
  attrType = getElementAttributeDocument(element, "type");
  title = getElementAttributeDocument(element, "title");
  role = getElementAttributeDocument(element, "role");
  id = getElementAttributeDocument(element, "id");
  let referencedByAriaLabel = isElementReferencedByAriaLabel(id, document);

  if (isElementHiddenDocument(element) && !recursion) {
    //noAName
  } else if (type === 3) {
    AName = getTrimmedText(element);
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy, document);
  } else if (ariaLabel && trim(ariaLabel) !== "") {
    AName = ariaLabel;
  } else if (name === "area" || (name === "input" && attrType === "image")) {
    alt = getElementAttributeDocument(element, "alt");
    AName = getFirstNotUndefined(alt, title);
  } else if (name === "img") {
    alt = getElementAttributeDocument(element, "alt");
    if (!hasRolePresentationOrNone(element)) {
      AName = getFirstNotUndefined(alt, title);
    }
  } else if (name === "input" && (attrType === "button" || attrType === "submit" || attrType === "reset")) {

    value = getElementAttributeDocument(element, "value");

    AName = getFirstNotUndefined(value, getDefaultName(element), title);
  } else if (formElements.indexOf(name) >= 0 && !attrType) {
    AName = getFirstNotUndefined(getValueFromLabel(element, id, document), title);
  } else if (name === "input" && (typesWithLabel.indexOf(attrType) >= 0 || !attrType)) {
      placeholder = getElementAttributeDocument(element, "placeholder");
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, document), title, placeholder);
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name === "textarea") {
      placeholder = getElementAttributeDocument(element, "placeholder");
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(element, id, document), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(element, document), title, placeholder);
    }
  } else if (name === "figure") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, "figcaption", document), title);
  } else if (name === "table") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, "caption", document), title);
  } else if (name === "fieldset") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(element, "legend", document), title);
  } else if (isWidget && isRoleControl(element)) {
    AName = getFirstNotUndefined(getValueFromEmbeddedControl(element, document), title);
  } else if (allowNameFromContent || ((role && allowNameFromContent) || (!role)) && recursion || name === "label") {
    AName = getFirstNotUndefined(getTextFromCss(element, document), title);
  } else if (sectionAndGrouping.indexOf(name) >= 0 || name === "iframe" || tabularElements.indexOf(name) >= 0) {
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

function getValueFromSpecialLabel(element: Element, label: string, document:Document): string {
  let labelElement = element.querySelector(label); 
  let accessNameFromLabel;

  if (labelElement!==null)
    accessNameFromLabel = getAccessibleNameRecursion(labelElement, document, true, false);

  return accessNameFromLabel;
}

function getValueFromLabel(element: Element, id: string, document:Document): string {
  let referencedByLabel =  Array.from(document.querySelectorAll(`label[for="${id}"]`));
  let parent = getElementParentDocument(element);
  let parentName = getElementNameDocument(parent);
  let result, accessNameFromLabel;
  let isWidget = isElementWidgetDocument(element);

  if (parent && parentName === "label") {
    referencedByLabel.push(parent);
  }

  for (let label of referencedByLabel) {
    accessNameFromLabel = getAccessibleNameRecursion(label, document, true, isWidget);
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


function getAccessibleNameFromAriaLabelledBy(element: Element, ariaLabelId: string, document: Document): string | undefined {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  let isWidget = isElementWidgetDocument(element);

  for (let id of ListIdRefs) {
    let elem = getElementById(id, document);
    if (elem) {
      accessNameFromId = getAccessibleNameRecursion(elem, document, true, isWidget);
      if (accessNameFromId) {
        if (result) {
          result += accessNameFromId;
        } else {
          result = accessNameFromId;
        }
      }
    }
  }

  return result;
}

function getTextFromCss(element: Element, document: Document): string {
  let before = getElementStylePropertyDocument(element, ":before", "content:");
  let after = getElementStylePropertyDocument(element, ":after", "content:");
  let aNameChildren = getAccessibleNameFromChildren(element, document);

  if (!aNameChildren) {
    aNameChildren = "";
  }

  return before + aNameChildren + after;
}

function getAccessibleNameFromChildren(element: Element, document:Document): string {
  let isWidget = isElementWidgetDocument(element);
  let result, aName;

  if (element.children) {
    for (let child of element.children) {
      aName = getAccessibleNameRecursion(child, document, true, isWidget);
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

function isRoleControl(element: Element): boolean {

  let role;
  role =  getElementAttributeDocument(element, "role");;

  return controlRoles.indexOf(role) >= 0
}

export = getAccessibleName;
