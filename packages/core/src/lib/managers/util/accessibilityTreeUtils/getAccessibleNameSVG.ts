'use strict';
import { ElementHandle } from 'puppeteer';
import {isElementHidden, getElementById,getElementChildTextContent,getElementAttribute} from "../domUtils/domUtils";
import getTrimmedText from './getTrimmedText';
import isElementReferencedByAriaLabel from './isElementReferencedByAriaLabel';
import getAccessibleName from './getAccessibleName';
import {trim} from 'lodash';
import { noAccessibleObjectOrChild, noAccessibleObject, elementsLikeHtml } from "./constants";

function getAccessibleNameSVG(element: ElementHandle, processedHTML: ElementHandle[]): string | undefined {
  return getAccessibleNameSVGRecursion(element, processedHTML, false);
}
//elementos q sao usados para outros: desc(descricao),title
////let specialElements = ["circle","elipse","line","path","polygon","polyline","rect","use","g","image","mesh","textPath","tspan","foreignObject"];//https://www.w3.org/TR/svg-aam-1.0/#include_elements
//link role if the element has a valid href or xlink:href attribute. For a elements that are not links, use the mapping for tspan if the a element is a descendent of text, or the mapping for g otherwise.
function getAccessibleNameSVGRecursion(element: ElementHandle, processedHTML: ElementHandle[], recursion: boolean): string | undefined {
  let AName, ariaLabelBy, ariaLabel, id, tag;

  tag = element.name;
  let regex = new RegExp('^fe[a-zA-Z]+');
  if (element.attribs) {
    ariaLabelBy = getElementById(element.attribs["aria-labelledby"], processedHTML).length > 0 ? element.attribs["aria-labelledby"] : "";
    ariaLabel = element.attribs["aria-label"];
    id = element.attribs["id"];
  }
  let referencedByAriaLabel = isElementReferencedByAriaLabel(id, processedHTML, element);
  let title = getElementChildTextContent(element, "title");
  let titleAtt = getElementAttribute(element, "xlink:title");//tem de ser a
  let href = getElementAttribute(element, "href");;

  //console.log((DomUtil.isElementHidden(element) && !recursion) +"/"+ hasParentOfName(element,noAccessibleObjectOrChild) +"/"+ (noAccessibleObject.indexOf(tag) >= 0) +"/"+ (noAccessibleObjectOrChild.indexOf(tag) >= 0) +"/"+ regex.test(tag))
  if (isElementHidden(element) && !recursion || hasParentOfName(element,noAccessibleObjectOrChild) || noAccessibleObject.indexOf(tag) >= 0 || noAccessibleObjectOrChild.indexOf(tag) >= 0 || regex.test(tag)) {
    //noAName
  } else if (ariaLabelBy && ariaLabelBy !== "" && !(referencedByAriaLabel && recursion)) {
    AName = getAccessibleNameFromAriaLabelledBy(element, ariaLabelBy, processedHTML);
  } else if (elementsLikeHtml.indexOf(tag) >= 0) {
    AName = getAccessibleName(element, processedHTML);
  } else if (ariaLabel && trim(ariaLabel) !== "") {
    AName = ariaLabel;
  } else if (title && trim(title) !== "") {
    AName = title;
  } else if (titleAtt && trim(titleAtt) !== "" && tag === "a" && href !== undefined) {//check if link
    AName = titleAtt;
  } else if (tag && tag === "text") {
    AName = getTrimmedText(element);
  }

  return AName;
}


function hasParentOfName(element: ElementHandle, name: string[]) {

  let parent = element.parent;
  if (parent && parent.name) {
    return name.indexOf(parent.name)>=0 || hasParentOfName(parent, name);
  } else {
    return false;
   }
}


function getAccessibleNameFromAriaLabelledBy(element: ElementHandle, ariaLabelId: string, processedHTML: ElementHandle[]): string | undefined {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;

  for (let id of ListIdRefs) {
    accessNameFromId = getAccessibleNameSVGRecursion(getElementById(id, processedHTML)[0], processedHTML, true);
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

/*async function getAccessibleNameSVG(url: string, selector: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {'waitUntil': 'networkidle0', timeout: 60000});
  const hrefElement = await page.$(selector);

  let options = {
    root: hrefElement
  };

  const snapshot = await page.accessibility.snapshot(options);
  let result;

  if (snapshot && snapshot.name)
    result = snapshot.name;
  
  browser.close();

  return result;
}*/

export = getAccessibleNameSVG;
