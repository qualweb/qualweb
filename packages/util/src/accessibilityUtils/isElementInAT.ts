'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementHidden from '../domUtils/isElementHidden';
import isElementChildPresentational from '../domUtils/isElementChildPresentational';
import isElementFocusable from '../domUtils/isElementFocusable';
import elementIDIsReferenced from '../domUtils/elementIDIsReferenced';
import elementHasGlobalARIAPropertyOrAttribute from '../domUtils/elementHasGlobalARIAPropertyOrAttribute';
import { notDefaultAT, needsToBeInsideDetails, notExposedIfEmpy } from './constants';
import { AccessibilityUtils } from '@qualweb/util';

function isElementInAT(elementQW: QWElement, pageQW: QWPage): boolean {
  let selector = elementQW.getElementSelector();
  let method = "AcceUtils.isElementInAT";
  let result;
  if (pageQW.isValueCached(selector, method)) {
    result = pageQW.getCachedValue(selector, method);
  } else {
    result = isElementInATAux(elementQW, pageQW);
    pageQW.cacheValue(selector, method, result);
  }
  return result;
}

function isElementInATAux(elementQW: QWElement, pageQW: QWPage): boolean {
  let childPresentational = isElementChildPresentational(elementQW, pageQW);
  let isHidden = isElementHidden(elementQW, pageQW);
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
      let focusable = isElementFocusable(elementQW, pageQW);
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
        ariaActivedescendant = elementIDIsReferenced(pageQW, elementQW, id, "aria-activedescendant");
        ariaControls = elementIDIsReferenced(pageQW, elementQW, id, " aria-controls");
        ariaDescribedby = elementIDIsReferenced(pageQW, elementQW, id, " aria-describedby");
        ariaDetails = elementIDIsReferenced(pageQW, elementQW, id, " aria-details");
        ariaErrormessage = elementIDIsReferenced(pageQW, elementQW, id, "aria-errormessage");
        ariaFlowto = elementIDIsReferenced(pageQW, elementQW, id, "aria-flowto");
        ariaLabelledby = elementIDIsReferenced(pageQW, elementQW, id, "aria-labelledby");
        ariaOwns = elementIDIsReferenced(pageQW, elementQW, id, "aria-owns");

      }
      let globalWaiARIA = elementHasGlobalARIAPropertyOrAttribute(elementQW);

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
