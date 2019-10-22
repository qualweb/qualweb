'use strict';

import { DomElement } from 'htmlparser2';
import getAccessibleName from './getAccessibleName';
const stew = new (require('stew-select')).Stew();

function isDataTable(element: DomElement, processedHTML: DomElement[]): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }
    // based on https://www.w3.org/TR/WCAG20-TECHS/H43.html
    // and https://fae.disability.illinois.edu/rulesets/TABLE_5/
    // it is considered that this element is already a <table> element

    let accessibleName = getAccessibleName(element, processedHTML);
    let thElem = stew.select(element, 'th');
    let tdHeaders = stew.select(element, 'td[scope]');
    let tdWithHeaders = stew.select(element, 'td[headers]');
    let idElem = stew.select(element, '[id]');
    let notPresentation, describedBy;

    if (element["attribs"]) {
      notPresentation = element.attribs["role"] === undefined || element.attribs["role"] !== "presentation";
      describedBy = Boolean(element["attribs"]["aria-describedby"]);
    }

    return (!!accessibleName || thElem.length > 0 || tdHeaders.length > 0 || tdWithHeaders.length > 0 || idElem.length > 0 || notPresentation || describedBy);
}

export = isDataTable;
