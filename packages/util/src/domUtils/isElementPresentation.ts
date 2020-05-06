'use strict';
import elementHasGlobalARIAPropertyOrAttribute from './elementHasGlobalARIAPropertyOrAttribute';
import { childPresentationalRole } from '../accessibilityUtils/constants';
import getElementRole from '../accessibilityUtils/getElementRole';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementFocusable from './isElementFocusable';


function isElementPresentation(elementQW: QWElement,pageQW:QWPage): boolean{
  if (!elementQW) {
    throw Error('Element is not defined');
  }

  const role = elementQW.getElementAttribute('role') 
  let presentationOrNone = role === 'presentation'|| role ==='none';
  const focusable =  isElementFocusable(elementQW);
  const hasGlobalARIA =  elementHasGlobalARIAPropertyOrAttribute(elementQW);
  const parent = elementQW.getElementParent();
  let parentPresentation= false;
  let childPresentational = false;

  if (parent) {
    parentPresentation =  isElementParentPresentation(parent);
    childPresentational =  isParentChildPresentational(parent,pageQW);
  }

  return ((presentationOrNone && !focusable && !hasGlobalARIA )  || childPresentational) && !parentPresentation;
}

function isElementParentPresentation(element: QWElement): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  const role = element.getElementAttribute('role')
  let presentationOrNone = role === 'presentation'|| role ==='none';
  const focusable = isElementFocusable(element);
  const hasGlobalARIA = elementHasGlobalARIAPropertyOrAttribute(element);
  const parent = element.getElementParent();
  let parentPresentation= false;
  let presentation = presentationOrNone && !focusable && !hasGlobalARIA; 

  if (parent && !presentation) {
    parentPresentation = isElementParentPresentation(parent);
  }

  return presentation || parentPresentation;
}

function isParentChildPresentational(element: QWElement,page:QWPage): boolean{
  if (!element) {
    throw Error('Element is not defined');
  }

  const role = getElementRole(element,page);
  let childPresentational;
  if(role!== null)
    childPresentational= childPresentationalRole.includes(role);
  const parent = element.getElementParent();
  let isParentChildPresentationalVar= false;

  if (parent && !childPresentational) {
    isParentChildPresentationalVar = isParentChildPresentational(parent,page);
  }

  return childPresentational || isParentChildPresentationalVar;
}
export default isElementPresentation;
