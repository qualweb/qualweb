'use strict';
import getTrimmedText from './getTrimmedText';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import {
  noAccessibleObjectOrChild, noAccessibleObject, elementsLikeHtml, textContainer
} from './constants';
import getAccessibleName from "./getAccessibleName";
import { AccessibilityUtils } from "..";

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
async function getAccessibleNameSVGRecursion(element: QWElement, page: QWPage, recursion: boolean): Promise<string | undefined> {
  let AName, ariaLabelBy, ariaLabel, tag;

  tag = element.getElementTagName();
  if (!tag)
    tag = '';
  let regex = new RegExp('^fe[a-zA-Z]+');
  ariaLabelBy = element.getElementAttribute("aria-labelledby");
  if (ariaLabelBy !== null && page.getElementByID(ariaLabelBy, element) === null) {
    ariaLabelBy = "";
  }
  ariaLabel = element.getElementAttribute("aria-label");
  let referencedByAriaLabel = await isElementReferencedByAriaLabel(element, page);
  let title = element.getElementChildTextContent("title");
  let titleAtt = element.getElementAttribute("xlink:title");//tem de ser a
  let href = element.getElementAttribute("href");

  //console.log((DomUtil.isElementHidden(element) && !recursion) +"/"+ hasParentOfName(element,noAccessibleObjectOrChild) +"/"+ (noAccessibleObject.indexOf(tag) >= 0) +"/"+ (noAccessibleObjectOrChild.indexOf(tag) >= 0) +"/"+ regex.test(tag))
  if ((element.isElementHidden(element) || await hasParentOfName(element, noAccessibleObjectOrChild) || noAccessibleObject.indexOf(tag) >= 0 || noAccessibleObjectOrChild.indexOf(tag) >= 0 || regex.test(tag)) && !recursion) {
    //noAName
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = await getAccessibleNameFromAriaLabelledBy(page, element, ariaLabelBy);
  } else if (elementsLikeHtml.indexOf(tag) >= 0) {
    AName = getAccessibleName(element, page);
  } else if (ariaLabel && ariaLabel.trim() !== "") {
    AName = ariaLabel;
  } else if (title && title.trim() !== "") {
    AName = title;
  } else if (titleAtt && titleAtt.trim() !== "" && tag === "a" && href !== undefined) {//check if link
    AName = titleAtt;
  } else if (textContainer.indexOf(tag) >= 0 || recursion) {
    AName = await getTextFromCss(element, page);
  } else if (tag && tag === "text") {
    AName = await getTrimmedText(element);
  }
  return AName;
}


async function hasParentOfName(element: QWElement, name: string[]) {

  let parent = element.getElementParent();
  if (parent) {
    let parentName = parent.getElementTagName();
    return parentName && name.indexOf(parentName) >= 0 || hasParentOfName(parent, name);
  } else {
    return false;
  }
}


async function getAccessibleNameFromAriaLabelledBy(page: QWPage, element: QWElement, ariaLabelId: string): Promise<string | undefined> {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  let elem;

  for (let id of ListIdRefs) {
    elem = page.getElementByID(id, element);
    if (elem)
      accessNameFromId = await getAccessibleNameSVGRecursion(elem, page, true);
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




async function getAccessibleNameFromChildren(element: QWElement, page: QWPage): Promise<string[]> {

  let aName;
  let children = element.getElementChildren();
  let elementAnames: string[] = [];

  if (children) {
    for (let child of children) {
      aName = await getAccessibleNameSVGRecursion(child, page, true);
      if (!!aName) {
        elementAnames.push(aName);
      } else {
        elementAnames.push("");
      }
    }
  }
  return elementAnames;
}

async function getTextFromCss(element: QWElement, page: QWPage): Promise<string> {
  let before = element.getElementStyleProperty("content", ":before");
  let after = element.getElementStyleProperty("content", ":after");
  let aNameList = await getAccessibleNameFromChildren(element, page);
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
  return elementQW.concatANames(aNames);
}

export default getAccessibleNameSVGRecursion;

