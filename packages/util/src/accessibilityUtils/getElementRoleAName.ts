'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getImplicitRole from './getImplicitRole';
import isElementFocusable from '../domUtils/isElementFocusable';
import elementHasGlobalARIAPropertyOrAttribute from '../domUtils/elementHasGlobalARIAPropertyOrAttribute';

function getElementRoleAName(elementQW: QWElement, pageQW: QWPage, aName: string | undefined): string | null {
  let selector = elementQW.getElementSelector();
    let method = "AcceUtils.getElementRoleAName";
    let result;
    if(pageQW.isValueCached(selector,method)){
       result = pageQW.getCachedValue(selector,method);
    }else{
      result = getElementRoleANameAux(elementQW, pageQW,aName);
      pageQW.cacheValue(selector,method,result);
    }
    return result;}
  


function getElementRoleANameAux(elementQW: QWElement, pageQW: QWPage, aName: string | undefined): string | null {
  let explicitRole = elementQW.getElementAttribute("role");
  let role = explicitRole;
  if (explicitRole === null || ((explicitRole === "none" || explicitRole === "presentation") && (isElementFocusable(elementQW,pageQW) ||elementHasGlobalARIAPropertyOrAttribute(elementQW)))) {
    role = getImplicitRole(elementQW, pageQW, aName);
  }
  return role;
}

export = getElementRoleAName;
