'use strict';

import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';


function isDataTable(element: QWElement, pageQW: QWPage): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }
  // based on https://www.w3.org/TR/WCAG20-TECHS/H43.html
  // and https://fae.disability.illinois.edu/rulesets/TABLE_5/
  // it is considered that AccessibilityUtils element is already a <table> element
  let accessibleName = AccessibilityUtils.getAccessibleName(element, pageQW);
  let thElem = element.getElements('th');
  let tdHeaders = element.getElements('td[scope]');
  let tdWithHeaders = element.getElements('td[headers]');
  let presentation, describedBy;
  presentation = element.getElementAttribute( "role") === "presentation";
  describedBy = Boolean(element.getElementAttribute( "aria-describedby"));

  return presentation ? false : (!!accessibleName || thElem.length > 0 || tdHeaders.length > 0 || tdWithHeaders.length > 0 || describedBy);
}

export default isDataTable;
