'use strict';
import { ElementHandle,Page } from "puppeteer";
import { getElementAttribute,  getElementType, elementIDIsReferenced } from "../domUtils/domUtils";
import isElementPresentation = require("../domUtils/isElementPresentation");
import isElementHidden = require("../domUtils/isElementHidden");
import isElementFocusable = require("../domUtils/isElementFocusable");
import elementHasValidRole = require("./elementHasValidRole");
import elementHasGlobalARIAPropertieOrAttribute = require("../domUtils/elementHasGlobalARIAPropertieOrAttribute");




async function isElementInAt(element: ElementHandle,page:Page): Promise<boolean> {
  let isPresentation = await isElementPresentation(element);
  let isHidden = await isElementHidden(element);
  let type = await getElementType(element);
  let focusable = await isElementFocusable(element);
  let id = await getElementAttribute(element,"id");
  let ariaActivedescendant = false;
  let  ariaControls = false;
  let ariaDescribedby = false;
  let ariaDetails = false
  let ariaErrormessage = false;
  let ariaFlowto = false;
  let ariaLabelledby = false;
  let ariaOwns = false;
  if(id!== null){
    ariaActivedescendant = await elementIDIsReferenced(page,id,"aria-activedescendant");
    ariaControls = await elementIDIsReferenced(page,id," aria-controls");
    ariaDescribedby = await elementIDIsReferenced(page,id," aria-describedby");
    ariaDetails = await elementIDIsReferenced(page,id," aria-details");
    ariaErrormessage = await elementIDIsReferenced(page,id,"aria-errormessage");
    ariaFlowto = await elementIDIsReferenced(page,id,"aria-flowto");
    ariaLabelledby = await elementIDIsReferenced(page,id,"aria-labelledby");
    ariaOwns = await elementIDIsReferenced(page,id,"aria-owns");

  }
  let role = await elementHasValidRole(element);
  let globalWaiARIA = await elementHasGlobalARIAPropertieOrAttribute(element);



    
  
  //https://www.w3.org/TR/core-aam-1.1/#exclude_elements2
  

  return true;
}

export = isElementInAt;
