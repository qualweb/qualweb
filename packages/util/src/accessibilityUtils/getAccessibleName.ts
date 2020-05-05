'use strict';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementWidget from './isElementWidget';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import getValueFromEmbeddedControl from './getValueFromEmbeddedControl';
import { formElements, typesWithLabel, sectionAndGrouping, tabularElements } from './constants';
import elementHasRoleNoneOrPresentation from "./elementHasRoleNoneOrPresentation";
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion'
//import getTreeSelector from '../shadowDomUtils/getTreeSelector';
import getElementRoleAName from './getElementRoleAName';
import isElementControl from './isElementControl';
import { QWElement, QWPage } from '@qualweb/html-util';
import AccessibilityUtils from './accessibilityUtils';
async function getAccessibleName(elementQW: QWElement, pageQW: QWPage): Promise<string | undefined> {
  return await getAccessibleNameRecursion(elementQW, pageQW, false, false);
}
async function getAccessibleNameRecursion(elementQW: QWElement, pageQW: QWPage, recursion: boolean, isWidget: boolean): Promise<string | undefined> {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType, value, role, placeholder, id;
  // let isChildOfDetails = isElementChildOfDetails(element);
  // let isSummary = element.name === "summary";
  let name = await AccessibilityUtils.domUtils.getElementTagName(elementQW);
  let allowNameFromContent = await allowsNameFromContent(elementQW);
  let treeSelector = ""//await getTreeSelector(element);
  // let summaryCheck = ((isSummary && isChildOfDetails) || !isSummary);
  ariaLabelBy = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "aria-labelledby");

  if (ariaLabelBy !== null && !(await verififyAriaLabel(ariaLabelBy, pageQW, elementQW))) {
    ariaLabelBy = "";
  }
  ariaLabel = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "aria-label");
  attrType = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "type");
  title = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "title");
  role = await getElementRoleAName(elementQW, pageQW, "");
  id = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "id");

  let referencedByAriaLabel = await isElementReferencedByAriaLabel(elementQW, pageQW);
  if (name === "svg") {
    AName = await getAccessibleNameSVGRecursion(elementQW, pageQW, recursion)
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = await getAccessibleNameFromAriaLabelledBy(elementQW, ariaLabelBy, pageQW);
  } else if (ariaLabel && ariaLabel.trim() !== "") {
    AName = ariaLabel;
  } else if (isWidget && await isElementControl(elementQW, pageQW)) {
    AName = getFirstNotUndefined(getValueFromEmbeddedControl(elementQW, pageQW, treeSelector), title);//treeSelector
  } else if (name === "area" || (name === "input" && attrType === "image")) {
    alt = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "alt");
    AName = getFirstNotUndefined(alt, title);
  } else if (name === "img") {
    alt = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "alt");
    if (!(await elementHasRoleNoneOrPresentation(elementQW))) {
      AName = getFirstNotUndefined(alt, title);
    }
  } else if (name === "input" && (attrType === "button" || attrType === "submit" || attrType === "reset")) {
    value = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "value");
    AName = getFirstNotUndefined(value, getDefaultName(elementQW), title);
  } else if (name === "input" && (typesWithLabel.indexOf(attrType) >= 0 || !attrType)) {
    placeholder = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "placeholder");
    if (!recursion) {
      AName = getFirstNotUndefined(await getValueFromLabel(elementQW, id, pageQW, treeSelector), title, placeholder);//treeSelector
    } else {
      AName = getFirstNotUndefined(title, placeholder);
    }
  } else if (name && formElements.indexOf(name) >= 0) {
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(elementQW, id, pageQW, treeSelector), title);//treeSelector
    } else {
      AName = getFirstNotUndefined(title);
    }
  } else if (name === "textarea") {
    placeholder = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "placeholder");
    if (!recursion) {
      AName = getFirstNotUndefined(getValueFromLabel(elementQW, id, pageQW, treeSelector), title, placeholder);
    } else {
      AName = getFirstNotUndefined(getTextFromCss(elementQW, pageQW, isWidget), title, placeholder);
    }
  } else if (name === "figure") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(elementQW, "figcaption", pageQW, treeSelector), title);
  } else if (name === "table") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(elementQW, "caption", pageQW, treeSelector), title);
  } else if (name === "fieldset") {
    AName = getFirstNotUndefined(await getValueFromSpecialLabel(elementQW, "legend", pageQW, treeSelector), title);
  } else if (allowNameFromContent || ((role && allowNameFromContent) || (!role)) && recursion || name === "label") {
    AName = getFirstNotUndefined(await getTextFromCss(elementQW, pageQW, isWidget), title);
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
  let labelElement = await AccessibilityUtils.domUtils.getElementInsideElement(element, label + treeSelector);
  let accessNameFromLabel;

  if (labelElement)
    accessNameFromLabel = await getAccessibleNameRecursion(labelElement, page, true, false);

  return accessNameFromLabel;
}

async function getValueFromLabel(element: QWElement, id: string, page: QWPage, treeSelector: string): Promise<string> {
  let referencedByLabelList: QWElement[] = [];
  let referencedByLabel = await AccessibilityUtils.domUtils.getElementsInsideDocument(page, `label[for="${id}"]` + treeSelector);
  if (referencedByLabel) {
    referencedByLabelList.push(...referencedByLabel);
  }
  let parent = await AccessibilityUtils.domUtils.getElementParent(element);
  let result, accessNameFromLabel;
  let isWidget = await isElementWidget(element, page);

  if (parent && await AccessibilityUtils.domUtils.getElementTagName(parent) === "label" && !(await isElementPresent(parent, referencedByLabelList))) {
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
async function isElementPresent(element: QWElement, listElement: QWElement[]): Promise<boolean> {
  let result = false;
  let i = 0;
  let elementSelector = await AccessibilityUtils.domUtils.getElementSelector(element);
  while (i < listElement.length && !result) {
    result = elementSelector === await AccessibilityUtils.domUtils.getElementSelector(listElement[i]);
  }
  return result;

}



async function getAccessibleNameFromAriaLabelledBy(element: QWElement, ariaLabelId: string, page: QWPage): Promise<string | undefined> {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  let isWidget = await isElementWidget(element, page);
  let elem;

  for (let id of ListIdRefs) {
    elem = await AccessibilityUtils.domUtils.getElementById(page, element, id);
    accessNameFromId = await getAccessibleNameRecursion(elem, page, true, isWidget);
    if (accessNameFromId) {
      if (result) {
        result += accessNameFromId.trim() + " ";
      } else {
        result = accessNameFromId.trim() + " ";
      }
    }
  }
  return !!result ? result.trim() : result;
}

async function getTextFromCss(element: QWElement, page: QWPage, isWidget: boolean): Promise<string> {
  let before = await AccessibilityUtils.domUtils.getElementStyleProperty(element, "content", ":before");
  let after = await AccessibilityUtils.domUtils.getElementStyleProperty(element, "content", ":after");
  let aNameList = await getAccessibleNameFromChildren(element, page, isWidget);
  let textValue = await getConcatentedText(element, aNameList);

  if (after === "none")
    after = "";
  if (before === "none")
    before = "";

  return before.replace(/["']/g, '') + textValue + after.replace(/["']/g, '');
}

async function getConcatentedText(elementQW: QWElement, aNames: string[]): Promise<string> {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  //FIXME
  let element = elementQW.elementHtml;
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

  if (!result) {
    result = "";
  }

  return result;
}
//adicionar texto entre ANames
//usar funcao get Trimmed text com texto dos ANames entre os text values
async function getAccessibleNameFromChildren(element: QWElement, page: QWPage, isWidget: boolean): Promise<string[]> {
  if (!isWidget) {
    isWidget = await isElementWidget(element, page);
  }
  let aName;
  let children = await AccessibilityUtils.domUtils.getElementChildren(element);
  let elementAnames: string[] = [];

  if (children) {
    for (let child of children) {
      aName = await getAccessibleNameRecursion(child, page, true, isWidget);
      if (!!aName) {
        elementAnames.push(aName);
      } else {
        elementAnames.push("");
      }
    }
  }
  return elementAnames;
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

export default getAccessibleName;
