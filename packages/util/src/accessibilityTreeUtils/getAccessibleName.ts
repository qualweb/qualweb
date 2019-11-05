'use strict';

import {DomElement} from 'htmlparser2';
import {trim} from 'lodash';

const stew = new (require('stew-select')).Stew();
import {isElementHidden, getElementById, getContentComputedStylesAttribute} from "../domUtils/domUtils";
import getTrimmedText from './getTrimmedText';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementWidget from './isElementWidget';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import hasRolePresentationOrNone from './hasRolePresentationOrNone';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';

function getAccessibleName(element: DomElement, processedHTML: DomElement[]): string | undefined {
  return getAccessibleNameRecursion(element, processedHTML, false, false);
}

function getAccessibleNameRecursion(element: DomElement, processedHTML: DomElement[], recursion: boolean, isWidget: boolean): string | undefined {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType, value, role, placeholder, id;
  let typesWithLabel = ["text", "password", "search", "tel", "email", "url"];
  let tabularElements = ["tr", "td", "th"];
  let formElements = ["select", "option", "datalist", "optgroup"];
  // let isChildOfDetails = isElementChildOfDetails(element);
  // let isSummary = element.name === "summary";
  let type = element.type;
  let name = String(element.name);
  let sectionAndGrouping = ["span", "article", "section", "nav", "aside", "hgroup", "header", "footer", "address", "p", "hr"
    , "blockquote", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "ul", "ol", "dd", "dt", "dl", "figcaption"];
  let allowNameFromContent = allowsNameFromContent(element);
  // let summaryCheck = ((isSummary && isChildOfDetails) || !isSummary);
  if (element.attribs) {
    ariaLabelBy = getElementById(element.attribs["aria-labelledby"], processedHTML).length > 0 ? element.attribs["aria-labelledby"] : "";
    ariaLabel = element.attribs["aria-label"];
    attrType = element.attribs["type"];
    title = element.attribs["title"];
    role = element.attribs["role"];
    id = element.attribs["id"];
  }
  let referencedByAriaLabel = isElementReferencedByAriaLabel(id, processedHTML, element);

  if (isElementHidden(element) && !recursion) {
    //noAName
  } else if (type === "text") {
    AName = getTrimmedText(element);
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy, processedHTML);
  } else if (ariaLabel && trim(ariaLabel) !== "") {
    AName = ariaLabel;
  } else if (name === "area" || (name === "input" && attrType === "image")) {
    if (element.attribs) {
      alt = element.attribs["alt"];
    }
    AName = getFirstNotUndefined(alt, title);
  } else if (name === "img") {
    if (element.attribs) {
      alt = element.attribs["alt"];
    }
    if (!hasRolePresentationOrNone(element)) {
      AName = getFirstNotUndefined(alt, title);
    }
  } else if (name === "input" && (attrType === "button" || attrType === "submit" || attrType === "reset")) {
    if (element.attribs) {
      value = element.attribs["value"];
    }
    AName = getFirstNotUndefined(value, getDefaultName(element), title);
  } else if (formElements.indexOf(name) >= 0 && !attrType) {
    AName = getFirstNotUndefined(getValueFromLabel(element, id, processedHTML), title);
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

function getValueFromSpecialLabel(element: DomElement, label: string, processedHTML: DomElement[]): string {
  let labelElement = stew.select(element, label);
  let accessNameFromLabel;

  if (labelElement.length > 0)
    accessNameFromLabel = getAccessibleNameRecursion(labelElement[0], processedHTML, true, false);

  return accessNameFromLabel;
}

function getValueFromLabel(element: DomElement, id: string, processedHTML: DomElement[]): string {
  let referencedByLabel = stew.select(processedHTML, `label[for="${id}"]`);
  let parent = element.parent;
  let result, accessNameFromLabel;
  let isWidget = isElementWidget(element);

  if (parent && parent.name === "label") {
    referencedByLabel.push(parent);
  }

  for (let label of referencedByLabel) {
    accessNameFromLabel = getAccessibleNameRecursion(label, processedHTML, true, isWidget);
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


function getAccessibleNameFromAriaLabelledBy(element: DomElement, ariaLabelId: string, processedHTML: DomElement[]): string | undefined {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  let isWidget = isElementWidget(element);

  for (let id of ListIdRefs) {
    accessNameFromId = getAccessibleNameRecursion(getElementById(id, processedHTML)[0], processedHTML, true, isWidget);
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

function getTextFromCss(element: DomElement, processedHTML: DomElement[]): string {
  let before = getContentComputedStylesAttribute(element, "computed-style-before", "^ content: &quot");
  let after = getContentComputedStylesAttribute(element, "computed-style-after", "^ content: &quot");
  let aNameChildren = getAccessibleNameFromChildren(element, processedHTML);

  if (!aNameChildren) {
    aNameChildren = "";
  }

  return before + aNameChildren + after;
}

function getAccessibleNameFromChildren(element: DomElement, processedHTML: DomElement[]): string {
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

function isRoleControl(element: DomElement): boolean {
  let controlRoles = ["textbox", "button", "combobox", "listbox", "range", "progressbar", "scrollbar", "slider", "spinbutton"];

  if (element.attribs === undefined)
    return false;

  let role = element.attribs["role"];

  return controlRoles.indexOf(role) >= 0
}

export = getAccessibleName;
