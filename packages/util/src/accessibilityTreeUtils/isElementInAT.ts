'use strict';
import { ElementHandle, Page } from "puppeteer";
import { getElementAttribute, getElementType, elementIDIsReferenced } from "../domUtils/domUtils";
import isElementPresentation = require("../domUtils/isElementPresentation");
import isElementHidden = require("../domUtils/isElementHidden");
import isElementFocusable = require("../domUtils/isElementFocusable");
import elementHasValidRole = require("./elementHasValidRole");
import elementHasGlobalARIAPropertieOrAttribute = require("../domUtils/elementHasGlobalARIAPropertieOrAttribute");




async function isElementInAT(element: ElementHandle, page: Page): Promise<boolean> {
  let isPresentation = await isElementPresentation(element, page);
  let isHidden = await isElementHidden(element);
  let result = false;

  if (!isHidden && !isPresentation) {
    let type = await getElementType(element);
    let focusable = await isElementFocusable(element);
    let id = await getElementAttribute(element, "id");
    let ariaActivedescendant = false;
    let ariaControls = false;
    let ariaDescribedby = false;
    let ariaDetails = false
    let ariaErrormessage = false;
    let ariaFlowto = false;
    let ariaLabelledby = false;
    let ariaOwns = false;
    if (id !== null) {
      ariaActivedescendant = await elementIDIsReferenced(page, id, "aria-activedescendant");
      ariaControls = await elementIDIsReferenced(page, id, " aria-controls");
      ariaDescribedby = await elementIDIsReferenced(page, id, " aria-describedby");
      ariaDetails = await elementIDIsReferenced(page, id, " aria-details");
      ariaErrormessage = await elementIDIsReferenced(page, id, "aria-errormessage");
      ariaFlowto = await elementIDIsReferenced(page, id, "aria-flowto");
      ariaLabelledby = await elementIDIsReferenced(page, id, "aria-labelledby");
      ariaOwns = await elementIDIsReferenced(page, id, "aria-owns");

    }
    let role = await elementHasValidRole(element, page);
    let globalWaiARIA = await elementHasGlobalARIAPropertieOrAttribute(element);

    result = type === "text"||focusable||ariaActivedescendant||ariaControls||ariaDescribedby||ariaDetails||ariaErrormessage||ariaFlowto||ariaLabelledby||ariaOwns||role||globalWaiARIA;
  }
  //https://www.w3.org/TR/core-aam-1.1/#exclude_elements2
  return result;
}

export = isElementInAT;
