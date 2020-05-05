'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import elementHasValidRole from "./elementHasValidRole";
import { AccessibilityUtils } from "..";



async function isElementInAT(elementQW: QWElement,  pageQW:QWPage): Promise<boolean>{
  let isPresentation = awaitelementQWisElementPresentation(elementQW, pageQW);
  let isHidden = awaitelementQWisElementHidden(elementQW);
  let result = false;

  if (!isHidden && !isPresentation) {
    let type = awaitelementQWgetElementType(elementQW);
    let focusable = awaitelementQWisElementFocusable(elementQW);
    let id = awaitelementQWgetElementAttribute(elementQW, "id");
    let ariaActivedescendant = false;
    let ariaControls = false;
    let ariaDescribedby = false;
    let ariaDetails = false
    let ariaErrormessage = false;
    let ariaFlowto = false;
    let ariaLabelledby = false;
    let ariaOwns = false;
    if (id !== null) {
      ariaActivedescendant = awaitelementQWelementIDIsReferenced(pageQW,elementQW, id, "aria-activedescendant");
      ariaControls = awaitelementQWelementIDIsReferenced(pageQW,elementQW,id, " aria-controls");
      ariaDescribedby = awaitelementQWelementIDIsReferenced(pageQW,elementQW, id, " aria-describedby");
      ariaDetails = awaitelementQWelementIDIsReferenced(pageQW,elementQW, id, " aria-details");
      ariaErrormessage = awaitelementQWelementIDIsReferenced(pageQW,elementQW, id, "aria-errormessage");
      ariaFlowto = awaitelementQWelementIDIsReferenced(pageQW,elementQW, id, "aria-flowto");
      ariaLabelledby = awaitelementQWelementIDIsReferenced(pageQW,elementQW, id, "aria-labelledby");
      ariaOwns = awaitelementQWelementIDIsReferenced(pageQW,elementQW, id, "aria-owns");

    }
    let role = await elementHasValidRole(elementQW,pageQW);
    let globalWaiARIA = awaitelementQWelementHasGlobalARIAPropertieOrAttribute(elementQW);

    result = type === "text"||focusable||ariaActivedescendant||ariaControls||ariaDescribedby||ariaDetails||ariaErrormessage||ariaFlowto||ariaLabelledby||ariaOwns||role||globalWaiARIA;
  }
  //https://www.w3.org/TR/core-aam-1.1/#exclude_elements2
  return result;
}

export default isElementInAT;
