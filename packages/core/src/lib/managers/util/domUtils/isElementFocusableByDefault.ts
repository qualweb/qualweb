'use strict';

import {ElementHandle} from "puppeteer";
import getElementName = require("./getElementName");
import getElementAttribute = require("./getElementAttribute");
import getElementParent = require("./getElementParent");
import getElementChildren = require("./getElementChildren");

async function isElementFocusableByDefault(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  switch (await getElementName(element)) {
    case 'a':
    case 'area':
    case 'link':
      if (await  getElementAttribute(element,'href')) {
        return true;
      }
      break;
    case 'input':
      return !(await  getElementAttribute(element,'type') !== 'hidden');
    case 'summary':
      const parent = await getElementParent(element);
      return !!(parent && await getElementName(parent)=== 'details' && await getElementChildren(element) && await getElementChildren(element)[0] === element);
    case 'textarea':
    case 'select':
    case 'button':
      return true;
  }
  return false;
}

export = isElementFocusableByDefault;
