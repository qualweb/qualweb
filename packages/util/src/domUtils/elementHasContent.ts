'use strict';
import { QWElement } from "@qualweb/qw-element";
import { sectionAndGrouping } from "../accessibilityUtils/constants";

function elementHasContent(elementQW: QWElement): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let text = elementQW.getElementText();
  const sectionOrGrouping =isElementGroupingOrSection(elementQW);
  if(text)
    text = text.trim();
return !sectionOrGrouping || !!text;
}
function isElementGroupingOrSection(elementQW:QWElement):boolean{
  let tagName =  elementQW.getElementTagName();
  let isGroupingOrSection = sectionAndGrouping.includes(tagName);
  let children= elementQW.getElementChildren();
  let counter = 0;
  while(isGroupingOrSection && counter < children.length){
    isGroupingOrSection = isElementGroupingOrSection(children[counter])
    counter++;
  }
  return isGroupingOrSection;
}

export default elementHasContent;
