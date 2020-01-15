'use strict';

import getAccessibleName from "./getAccessibleName";
import {ElementHandle, Page} from "puppeteer";
import getElementAttribute from "../domUtils/getElementAttribute";

async function isDataTable(element: ElementHandle, page: Page): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }
  // based on https://www.w3.org/TR/WCAG20-TECHS/H43.html
  // and https://fae.disability.illinois.edu/rulesets/TABLE_5/
  // it is considered that this element is already a <table> element

  let accessibleName = await getAccessibleName(element, page);
  let thElem = await element.$$('th');
  let tdHeaders = await element.$$('td[scope]');
  let tdWithHeaders = await element.$$('td[headers]');
  let presentation, describedBy;
  presentation = await getElementAttribute(element, "role") === "presentation";
  describedBy = Boolean(await getElementAttribute(element, "aria-describedby"));


  return presentation ? false : (!!accessibleName || thElem.length > 0 || tdHeaders.length > 0 || tdWithHeaders.length > 0 || describedBy);
}

export = isDataTable;
