'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import elementHasValidRole from "./elementHasValidRole";
import isElementHidden from '../domUtils/isElementHidden';
import isElementPresentation from '../domUtils/isElementPresentation';
import isElementFocusable from '../domUtils/isElementFocusable';
import elementIDIsReferenced from '../domUtils/elementIDIsReferenced';
import elementHasGlobalARIAPropertyOrAttribute from '../domUtils/elementHasGlobalARIAPropertyOrAttribute';

function isElementInAT(elementQW: QWElement, pageQW: QWPage): boolean {
  let isPresentation = isElementPresentation(elementQW, pageQW);
  let isHidden = isElementHidden(elementQW);
  let result = false;

  if (!isHidden && !isPresentation) {
    let type = elementQW.getElementType();
    let focusable = isElementFocusable(elementQW);
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
      ariaActivedescendant = elementIDIsReferenced(pageQW,elementQW, id, "aria-activedescendant");
      ariaControls = elementIDIsReferenced(pageQW,elementQW,id, " aria-controls");
      ariaDescribedby = elementIDIsReferenced(pageQW,elementQW, id, " aria-describedby");
      ariaDetails = elementIDIsReferenced(pageQW,elementQW, id, " aria-details");
      ariaErrormessage = elementIDIsReferenced(pageQW,elementQW, id, "aria-errormessage");
      ariaFlowto = elementIDIsReferenced(pageQW,elementQW, id, "aria-flowto");
      ariaLabelledby = elementIDIsReferenced(pageQW,elementQW, id, "aria-labelledby");
      ariaOwns = elementIDIsReferenced(pageQW,elementQW, id, "aria-owns");

    }
    let role = elementHasValidRole(elementQW,pageQW);
    let globalWaiARIA = elementHasGlobalARIAPropertyOrAttribute(elementQW);

    result = type === "text"||focusable||ariaActivedescendant||ariaControls||ariaDescribedby||ariaDetails||ariaErrormessage||ariaFlowto||ariaLabelledby||ariaOwns||role||globalWaiARIA;
  }
  //https://www.w3.org/TR/core-aam-1.1/#exclude_elements2
  return result;
}

export default isElementInAT;
