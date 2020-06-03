'use strict';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementWidget from './isElementWidget';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import { formElements, typesWithLabel } from './constants';
import elementHasRoleNoneOrPresentation from "./elementHasRoleNoneOrPresentation";
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion'
import getElementRoleAName from './getElementRoleAName';
import isElementControl from './isElementControl';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
function getAccessibleName(elementQW: QWElement, pageQW: QWPage): string | undefined {
  return getAccessibleNameRecursion(elementQW, pageQW, false, false);
}
function getAccessibleNameRecursion(elementQW: QWElement, pageQW: QWPage, recursion: boolean, isWidget: boolean): string | undefined {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType, value, role, placeholder, id;
  let name = elementQW.getElementTagName();
  let allowNameFromContent = allowsNameFromContent(elementQW);
  let treeSelector = elementQW.getTreeSelector();

  ariaLabelBy = elementQW.getElementAttribute("aria-labelledby");

  if (ariaLabelBy !== null && !(verifyAriaLabel(ariaLabelBy, pageQW, elementQW))) {
    ariaLabelBy = "";
  }
  ariaLabel = elementQW.getElementAttribute("aria-label");
  attrType = elementQW.getElementAttribute("type");
  title = elementQW.getElementAttribute("title");
  role = getElementRoleAName(elementQW, pageQW, "");
  id = elementQW.getElementAttribute("id");

  let referencedByAriaLabel = isElementReferencedByAriaLabel(elementQW, pageQW);
  if (name === "svg") {
    AName = getAccessibleNameSVGRecursion(elementQW, pageQW, recursion)
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = getAccessibleNameFromAriaLabelledBy(elementQW, ariaLabelBy, pageQW);
  } else if (ariaLabel && ariaLabel.trim() !== "") {
    AName = ariaLabel;
  } else if (isWidget && isElementControl(elementQW, pageQW)) {
    AName = getFirstNotUndefined(getValueFromEmbeddedControl(elementQW, pageQW, treeSelector), title);
  } else if (name === "area" || (name === "input" && attrType === "image")) {
    alt = elementQW.getElementAttribute("alt");
    AName = getFirstNotUndefined(alt, title);
  } else if (name === "img") {
    alt = elementQW.getElementAttribute("alt");
    if (!(elementHasRoleNoneOrPresentation(elementQW))) {
      AName = getFirstNotUndefined(alt, title);
    }
  } else if (name === "input" && (attrType === "button" || attrType === "submit" || attrType === "reset")) {
    value = elementQW.getElementAttribute("value");
    AName = getFirstNotUndefined(value, getDefaultName(elementQW), title);
  } else if (name === "input" && (typesWithLabel.indexOf(attrType) >= 0 || !attrType)) {
    placeholder = elementQW.getElementAttribute("placeholder");
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(elementQW, id, pageQW, treeSelector), title, placeholder);
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name && formElements.indexOf(name) >= 0) {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(elementQW, id, pageQW, treeSelector), title);
    } else {
      AName = getFirstNotUndefined(title);
    }
  } else if (name === "textarea") {
    placeholder = elementQW.getElementAttribute("placeholder");
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(elementQW, id, pageQW, treeSelector), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(elementQW, pageQW, isWidget), title, placeholder);
    }
  } else if (name === "figure") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(elementQW, "figcaption", pageQW, treeSelector), title);
  } else if (name === "table") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(elementQW, "caption", pageQW, treeSelector), title);
  } else if (name === "fieldset") {
    AName = getFirstNotUndefined(getValueFromSpecialLabel(elementQW, "legend", pageQW, treeSelector), title);
  } else if (allowNameFromContent || ((role && allowNameFromContent) || (!role)) && recursion || name === "label") {
    AName = getFirstNotUndefined(getTextFromCss(elementQW, pageQW, isWidget), title);
  } else /*if (name && (sectionAndGrouping.indexOf(name) >= 0 || name === "iframe" || tabularElements.indexOf(name) >= 0))*/ {
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

function getValueFromSpecialLabel(element: QWElement, label: string, page: QWPage, treeSelector: string): string {
  let labelElement = element.getElement(label + treeSelector);
  let accessNameFromLabel;

  if (labelElement)
    accessNameFromLabel = getAccessibleNameRecursion(labelElement, page, true, false);

  return accessNameFromLabel;
}

function getValueFromLabel(element: QWElement, id: string, page: QWPage, treeSelector: string): string {
  let referencedByLabelList: QWElement[] = [];
  let referencedByLabel = page.getElements(`label[for="${id}"]` + treeSelector);
  if (referencedByLabel) {
    referencedByLabelList.push(...referencedByLabel);
  }
  let parent = element.getElementParent();
  let result, accessNameFromLabel;
  let isWidget = isElementWidget(element, page);

  if (parent && parent.getElementTagName() === "label" && !(isElementPresent(parent, referencedByLabelList))) {
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
function isElementPresent(element: QWElement, listElement: QWElement[]): boolean {
  let result = false;
  let i = 0;
  let elementSelector = element.getElementSelector();
  while (i < listElement.length && !result) {
    result = elementSelector === listElement[i].getElementSelector();
  }
  return result;

}



function getAccessibleNameFromAriaLabelledBy(element: QWElement, ariaLabelId: string, page: QWPage): string | undefined {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  let isWidget = isElementWidget(element, page);
  let elem;

  for (let id of ListIdRefs) {
    if (id !== "")
      elem = page.getElementByID(id, element);
    if (elem)
      accessNameFromId = getAccessibleNameRecursion(elem, page, true, isWidget);
    if (accessNameFromId) {
      if (result) {
        result += accessNameFromId.trim() + " ";
      } else {
        result = accessNameFromId.trim() + " ";
      }
      elem = null;
    }
  }
  return !!result ? result.trim() : result;
}

function getTextFromCss(element: QWElement, page: QWPage, isWidget: boolean): string {
  let before = element.getElementStyleProperty("content", ":before");
  let after = element.getElementStyleProperty("content", ":after");
  let aNameList = getAccessibleNameFromChildren(element, page, isWidget);
  let textValue = getConcatentedText(element, aNameList);

  if (after === "none")
    after = "";
  if (before === "none")
    before = "";

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
    isWidget = isElementWidget(element, page);
  }
  let aName;
  let children = element.getElementChildren();
  let elementAnames: string[] = [];

  if (children) {
    for (let child of children) {
      aName = getAccessibleNameRecursion(child, page, true, isWidget);
      if (!!aName) {
        elementAnames.push(aName);
      } else {
        elementAnames.push("");
      }
    }
  }
  return elementAnames;
}



function verifyAriaLabel(ariaLabelBy: string, page: QWPage, element: QWElement) {
  let elementIds = ariaLabelBy.split(" ");
  let result = false;
  for (let id of elementIds) {
    if (!result && id !== "") {
      result = page.getElementByID(id, element) !== null;
    }
  }

  return result;
}

export default getAccessibleName;
