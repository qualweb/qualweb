'use strict';

import {DomElement} from 'htmlparser2';
import {trim} from 'lodash';
import {isElementHidden, getElementById,getContentComputedStylesAttribute} from "../domUtils/domUtils";
import getTrimmedText from './getTrimmedText';
import getDefaultName from './getDefaultName';
import allowsNameFromContent from "./allowsNameFromContent";
import isElementChildOfDetails from './isElementChildOfDetails';


function getAccessibleName(element: DomElement, processedHTML: DomElement[], reference: boolean): string | undefined {
  let AName, ariaLabelBy, ariaLabel, title, alt, attrType,value,role;
  let isChildOfDetails = isElementChildOfDetails(element);
  let isSummary = element.name === "summary";
  let type = element.type;
  let sectionAndGrouping = ["span"];
  let allowNameFromContent =allowsNameFromContent(element) ;
  let summaryCheck = ((isSummary && isChildOfDetails) || !isSummary);
  if (element.attribs) {
      ariaLabelBy = getElementById(element.attribs["aria-labelledby"], processedHTML).length > 0 ? element.attribs["aria-labelledby"] : "";
      ariaLabel = element.attribs["aria-label"];
      attrType = element.attribs["type"];
      title = element.attribs["title"];
      role = element.attribs["role"];

  }

  if (isElementHidden(element) && !reference) {
      //noAName
  } else if(type==="text"){
      AName = getTrimmedText(element);
  }else if (ariaLabelBy && ariaLabelBy !== "" && !reference && summaryCheck) {
      AName = getAccessibleNameFromAriaLabelledBy(ariaLabelBy, processedHTML);
  } else if (ariaLabel && trim(ariaLabel) !== "" && summaryCheck) {
      AName = ariaLabel;
  } else if (allowNameFromContent||((role&&allowNameFromContent)||(!role))&&reference||element.name==="label") {
      AName = getFirstNotUndefined(getTextFromCss(element,processedHTML), title);
  }else if ( sectionAndGrouping.indexOf(String(element.name))>=0) {//section and grouping
      AName = getFirstNotUndefined( title);
  } else if (element.name === "iframe") {
      AName = getFirstNotUndefined(title);
  } else if (element.name === "area" ||element.name === "img" || (element.name === "input" && attrType === "image")) {
      if (element.attribs) {
          alt = element.attribs["alt"];
      }
      AName = getFirstNotUndefined(alt, title);
  }else if (element.name === "input" && (attrType === "button"||attrType === "submit"||attrType === "reset")) {
      if (element.attribs) {
          value = element.attribs["value"];
      }
      AName = getFirstNotUndefined(value, title,getDefaultName(element));
  }

  return AName;
}

function getTextFromCss(element: DomElement,processedHTML: DomElement[]): string {

  let before = getContentComputedStylesAttribute(element, "computed-style-before", "^ content: &quot");
  let after = getContentComputedStylesAttribute(element, "computed-style-after", "^ content: &quot");
  let aNameChildren = getAccessibleNameFromChildren(element, processedHTML, "");


  return before +  aNameChildren + after;

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
          if (trim(String(args)) !== "") {
              end = true;
          }
      }
      i++;
  }
  return result;
}


function getAccessibleNameFromAriaLabelledBy(ariaLabelId: string, processedHTML: DomElement[]): string | undefined {
  let ListIdRefs = ariaLabelId.split(" ");
  let result: string | undefined;
  let accessNameFromId: string | undefined;

  for (let id of ListIdRefs) {
      accessNameFromId = getAccessibleName(getElementById(id, processedHTML)[0], processedHTML, true);
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





function getAccessibleNameFromChildren(element: DomElement, processedHTML: DomElement[], acumulatedText: string): string {

  if (element.children) {
      for (let child of element.children) {
          let aName = getAccessibleName(child, processedHTML, true);
          if(aName)
              acumulatedText += aName;
      }
  }
  return acumulatedText;
}

export = getAccessibleName;
