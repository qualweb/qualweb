'use strict';
import { QWElement } from "@qualweb/qw-element";
import { alwaysNotVisible, needsControls, alwaysVisible, needsOpen } from "./constants";
import textHasTheSameColorOfBackground from "./textHasTheSameColorOfBackground";
import { QWPage } from "@qualweb/qw-page";
import { DomUtils } from "@qualweb/util";


function elementHasContent(elementQW: QWElement, pageQW: QWPage, checkChildren: boolean): boolean {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let result = false;
  let name = elementQW.getElementTagName();
  if (alwaysNotVisible.includes(name)) {
    //Do nothing (dont delete)
  } else if (needsControls.includes(name)) {
    const controls = elementQW.getElementProperty('controls');
    result = !!controls;

  } else if (needsOpen.includes(name)) {
    const open = elementQW.getElementProperty('open');
    result = !!open;

  } else if (alwaysVisible.includes(name)) {
    result = true;

  } else {
    let textHasTheSameColor = textHasTheSameColorOfBackground(elementQW);
    let text = elementQW.getElementText();
    if (text) {
      text = text.trim();
      result = text !== "" && !textHasTheSameColor;
    }
  }
  let childrenVisible = false;
  if (checkChildren) {
    let children = elementQW.getElementChildren();
    for (let child of children) {
      checkChildren = childrenVisible || DomUtils.elementHasContent(child, pageQW, checkChildren);
    }
  }
  return result || checkChildren;
}
/*function isElementGroupingOrSection(elementQW:QWElement):boolean{
  let tagName =  elementQW.getElementTagName();
  let isGroupingOrSection = sectionAndGrouping.includes(tagName);
  let children= elementQW.getElementChildren();
  let counter = 0;
  while(isGroupingOrSection && counter < children.length){
    isGroupingOrSection = isElementGroupingOrSection(children[counter])
    counter++;
  }
  return isGroupingOrSection;
}*/

export default elementHasContent;
