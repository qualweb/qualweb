'use strict';
import { ElementHandle } from "puppeteer";
import { getElementAttribute, getElementName } from "../domUtils/domUtils";
import isElementPresentation = require("../domUtils/isElementPresentation");
import isElementHidden = require("../domUtils/isElementHidden");



async function isElementInAt(element: ElementHandle): Promise<boolean> {
  let isPresentation = await isElementPresentation(element);
  let isHidden = await isElementHidden(element);
  //https://www.w3.org/TR/core-aam-1.1/#exclude_elements2
  

  return true;
}

export = isElementInAt;
