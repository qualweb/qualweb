'use strict';

import getAccessibleName from "./getAccessibleName";
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

//import getTreeSelector from "../shadowDomUtils/getTreeSelector";

async function isDataTable(element: QWElement,  pageQW:QWPage): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }
  // based on https://www.w3.org/TR/WCAG20-TECHS/H43.html
  // and https://fae.disability.illinois.edu/rulesets/TABLE_5/
  // it is considered that AccessibilityUtils element is already a <table> element
  //let treeSelector = await getTreeSelector(element);
  let accessibleName = await getAccessibleName(element, pageQW);
  let thElem = await element.getElements('th'/*+treeSelector*/);
  let tdHeaders = await element.getElements('td[scope]'/*+treeSelector*/);
  let tdWithHeaders = await element.getElements('td[headers]'/*+treeSelector*/);
  let presentation, describedBy;
  presentation = element.getElementAttribute( "role") === "presentation";
  describedBy = Boolean(element.getElementAttribute( "aria-describedby"));


  return presentation ? false : (!!accessibleName || thElem.length > 0 || tdHeaders.length > 0 || tdWithHeaders.length > 0 || describedBy);
}

export default isDataTable;
