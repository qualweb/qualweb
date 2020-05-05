'use strict';

import getAccessibleName from "./getAccessibleName";
import { QWElement,QWPage } from '@qualweb/html-util';
import { AccessibilityUtils } from "..";

//import getTreeSelector from "../shadowDomUtils/getTreeSelector";

async function isDataTable(elementQW: QWElement,  pageQW:QWPage): Promise<boolean> {
  if (!elementQW.elementPupeteer) {
    throw Error('Element is not defined');
  }
  let element = elementQW.elementPupeteer;
  // based on https://www.w3.org/TR/WCAG20-TECHS/H43.html
  // and https://fae.disability.illinois.edu/rulesets/TABLE_5/
  // it is considered that AccessibilityUtils element is already a <table> element
  //let treeSelector = await getTreeSelector(element);
  let accessibleName = await getAccessibleName(elementQW, pageQW);
  let thElem = await element.$$('th'/*+treeSelector*/);
  let tdHeaders = await element.$$('td[scope]'/*+treeSelector*/);
  let tdWithHeaders = await element.$$('td[headers]'/*+treeSelector*/);
  let presentation, describedBy;
  presentation = await AccessibilityUtils.domUtils.getElementAttribute(element, "role") === "presentation";
  describedBy = Boolean(await AccessibilityUtils.domUtils.getElementAttribute(element, "aria-describedby"));


  return presentation ? false : (!!accessibleName || thElem.length > 0 || tdHeaders.length > 0 || tdWithHeaders.length > 0 || describedBy);
}

export default isDataTable;
