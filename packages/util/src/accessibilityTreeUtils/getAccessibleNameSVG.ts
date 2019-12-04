'use strict';
import { ElementHandle, Page } from 'puppeteer';
import { trim } from 'lodash';
import {
  isElementHidden,
  getElementById,
  getElementParent
} from "../domUtils/domUtils";
import getTrimmedText from './getTrimmedText';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import {
  noAccessibleObjectOrChild, noAccessibleObject, elementsLikeHtml
} from './constants';
import getElementName from '../domUtils/getElementName';
import getElementAttribute from '../domUtils/getElementAttribute';
import getAccessibleName = require("./getAccessibleName");
import getElementChildTextContent = require("../domUtils/getElementChildTextContent");

async function getAccessibleNameSVG(element: ElementHandle, page: Page): Promise<string | undefined> {
  //return getAccessibleNameSVGRecursion(element, processedHTML, false);
  return await getAccessibleNameSVGRecursion(element, page, false);
}

//elementos q sao usados para outros: desc(descricao),title
////let specialElements = ["circle","elipse","line","path","polygon","polyline","rect","use","g","image","mesh","textPath","tspan","foreignObject"];//https://www.w3.org/TR/svg-aam-1.0/#include_elements
//link role if the element has a valid href or xlink:href attribute. For a elements that are not links, use the mapping for tspan if the a element is a descendent of text, or the mapping for g otherwise.
async function getAccessibleNameSVGRecursion(element: ElementHandle, page: Page, recursion: boolean): Promise<string | undefined> {
  let AName, ariaLabelBy, ariaLabel, id, tag;

  tag = await getElementName(element);
  if (tag)
    tag = tag.toLocaleLowerCase();
  let regex = new RegExp('^fe[a-zA-Z]+');
  ariaLabelBy = await getElementAttribute(element, "aria-labelledby");
  if (!ariaLabelBy /*&& await getElementById(page,ariaLabelBy) === null*/) {
    ariaLabelBy = "";
  }
  ariaLabel = await getElementAttribute(element, "aria-label");
  id = await getElementAttribute(element, "id");


  let referencedByAriaLabel = await isElementReferencedByAriaLabel(id, page);
  let title = await getElementChildTextContent(element, "title");
  let titleAtt = await getElementAttribute(element, "xlink:title");//tem de ser a
  let href = await getElementAttribute(element, "href");
  ;

  //console.log((DomUtil.isElementHidden(element) && !recursion) +"/"+ hasParentOfName(element,noAccessibleObjectOrChild) +"/"+ (noAccessibleObject.indexOf(tag) >= 0) +"/"+ (noAccessibleObjectOrChild.indexOf(tag) >= 0) +"/"+ regex.test(tag))
  if (await isElementHidden(element) && !recursion ||await hasParentOfName(element, noAccessibleObjectOrChild) || noAccessibleObject.indexOf(tag) >= 0 || noAccessibleObjectOrChild.indexOf(tag) >= 0 || regex.test(tag)) {
    //noAName
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = await getAccessibleNameFromAriaLabelledBy(page, ariaLabelBy);
  } else if (elementsLikeHtml.indexOf(tag) >= 0) {
    AName = getAccessibleName(element, page);
  } else if (ariaLabel && trim(ariaLabel) !== "") {
    AName = ariaLabel;
  } else if (title && trim(title) !== "") {
    AName = title;
  } else if (titleAtt && trim(titleAtt) !== "" && tag === "a" && href !== undefined) {//check if link
    AName = titleAtt;
  } else if (tag && tag === "text") {
    AName = await getTrimmedText(element);
  }

  return AName;
}


async function hasParentOfName(element: ElementHandle, name: string[]) {

  let parent = await getElementParent(element);
  if (parent) {
    let parentName = await getElementName(element);
    return parentName && name.indexOf(parentName) >= 0 || hasParentOfName(parent, name);
  } else {
    return false;
  }
}


async function getAccessibleNameFromAriaLabelledBy(page: Page, ariaLabelId: string): Promise<string | undefined> {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;
  let elem;

  for (let id of ListIdRefs) {
    elem = await getElementById(page, id);
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

export = getAccessibleNameSVG;
