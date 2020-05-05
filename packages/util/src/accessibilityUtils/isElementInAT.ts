'use strict';
import { QWElement,QWPage } from '@qualweb/html-util';
import elementHasValidRole from "./elementHasValidRole";
import { AccessibilityUtils } from "..";



async function isElementInAT(elementQW: QWElement,  pageQW:QWPage): Promise<boolean>{
  let isPresentation = await AccessibilityUtils.domUtils.isElementPresentation(elementQW, pageQW);
  let isHidden = await AccessibilityUtils.domUtils.isElementHidden(elementQW);
  let result = false;

  if (!isHidden && !isPresentation) {
    let type = await AccessibilityUtils.domUtils.getElementType(elementQW);
    let focusable = await AccessibilityUtils.domUtils.isElementFocusable(elementQW);
    let id = await AccessibilityUtils.domUtils.getElementAttribute(elementQW, "id");
    let ariaActivedescendant = false;
    let ariaControls = false;
    let ariaDescribedby = false;
    let ariaDetails = false
    let ariaErrormessage = false;
    let ariaFlowto = false;
    let ariaLabelledby = false;
    let ariaOwns = false;
    if (id !== null) {
      ariaActivedescendant = await AccessibilityUtils.domUtils.elementIDIsReferenced(pageQW,elementQW, id, "aria-activedescendant");
      ariaControls = await AccessibilityUtils.domUtils.elementIDIsReferenced(pageQW,elementQW,id, " aria-controls");
      ariaDescribedby = await AccessibilityUtils.domUtils.elementIDIsReferenced(pageQW,elementQW, id, " aria-describedby");
      ariaDetails = await AccessibilityUtils.domUtils.elementIDIsReferenced(pageQW,elementQW, id, " aria-details");
      ariaErrormessage = await AccessibilityUtils.domUtils.elementIDIsReferenced(pageQW,elementQW, id, "aria-errormessage");
      ariaFlowto = await AccessibilityUtils.domUtils.elementIDIsReferenced(pageQW,elementQW, id, "aria-flowto");
      ariaLabelledby = await AccessibilityUtils.domUtils.elementIDIsReferenced(pageQW,elementQW, id, "aria-labelledby");
      ariaOwns = await AccessibilityUtils.domUtils.elementIDIsReferenced(pageQW,elementQW, id, "aria-owns");

    }
    let role = await elementHasValidRole(elementQW,pageQW);
    let globalWaiARIA = await AccessibilityUtils.domUtils.elementHasGlobalARIAPropertieOrAttribute(elementQW);

    result = type === "text"||focusable||ariaActivedescendant||ariaControls||ariaDescribedby||ariaDetails||ariaErrormessage||ariaFlowto||ariaLabelledby||ariaOwns||role||globalWaiARIA;
  }
  //https://www.w3.org/TR/core-aam-1.1/#exclude_elements2
  return result;
}

export default isElementInAT;
