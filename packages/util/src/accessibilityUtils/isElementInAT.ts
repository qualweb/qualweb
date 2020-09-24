'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

import { notDefaultAT, needsToBeInsideDetails, notExposedIfEmpy } from './constants';
import { AccessibilityUtils,DomUtils } from '@qualweb/util';


function isElementInAT(elementQW: QWElement, pageQW: QWPage): boolean {
  let childPresentational = AccessibilityUtils.isElementChildPresentational(elementQW, pageQW);
  let isHidden = DomUtils.isElementHidden(elementQW, pageQW);
  let result = false;
  let role = AccessibilityUtils.getElementRole(elementQW, pageQW);
  let validRole = AccessibilityUtils.elementHasValidRole(elementQW, pageQW);

  if (!isHidden && !childPresentational && role !== "presentation" && role !== "none") {
    let name = elementQW.getElementTagName()
    let notExposedIfEmpyTag = notExposedIfEmpy.includes(name);
    let needsToBeInsideDetailsTag = needsToBeInsideDetails.includes(name);


    if (notDefaultAT.includes(name) || notExposedIfEmpyTag || needsToBeInsideDetailsTag) {
      let specialCondition = false;
      if (notExposedIfEmpyTag) {
        let text = elementQW.getElementText()
        specialCondition = !!text && text.trim() !== "";
      } else if (needsToBeInsideDetailsTag) {
        let parent = elementQW.getElementParent()
        specialCondition = !!parent && parent.getElementTagName() === "details";
      }
      let type = elementQW.getElementType();
      let focusable = AccessibilityUtils.isElementFocusable(elementQW, pageQW);
      let id = elementQW.getElementAttribute("id");
      let ariaActivedescendant = false;
      let ariaControls = false;
      let ariaDescribedby = false;
      let ariaDetails = false;
      let ariaErrormessage = false;
      let ariaFlowto = false;
      let ariaLabelledby = false;
      let ariaOwns = false;
      if (id !== null) {
        ariaActivedescendant = DomUtils.elementIDIsReferenced(elementQW,pageQW, id, "aria-activedescendant");
        ariaControls = DomUtils.elementIDIsReferenced(elementQW, pageQW,id, " aria-controls");
        ariaDescribedby = DomUtils.elementIDIsReferenced(elementQW,pageQW, id, " aria-describedby");
        ariaDetails = DomUtils.elementIDIsReferenced( elementQW, pageQW,id, " aria-details");
        ariaErrormessage = DomUtils.elementIDIsReferenced(elementQW, pageQW,id, "aria-errormessage");
        ariaFlowto = DomUtils.elementIDIsReferenced(elementQW, pageQW,id, "aria-flowto");
        ariaLabelledby = DomUtils.elementIDIsReferenced( elementQW,pageQW, id, "aria-labelledby");
        ariaOwns =DomUtils. elementIDIsReferenced(elementQW, pageQW,id, "aria-owns");

      }
      let globalWaiARIA = AccessibilityUtils.elementHasGlobalARIAPropertyOrAttribute(elementQW,pageQW);

      result = specialCondition || type === "text" || focusable || ariaActivedescendant || ariaControls || ariaDescribedby || ariaDetails || ariaErrormessage || ariaFlowto || ariaLabelledby || ariaOwns || validRole || globalWaiARIA;

    }
    else {
      //defaultInAT
      result = true;
    }
  }
  return result;
}

export default isElementInAT;
