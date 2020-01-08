'use strict';

import { ElementHandle } from 'puppeteer';
import getElementAttribute = require('./getElementAttribute');
import isElementFocusable = require('./isElementFocusable');
import getElementParent = require('./getElementParent');
import elementHasGlobalARIAPropertieOrAttribute = require('./elementHasGlobalARIAPropertieOrAttribute');
import { childPresentationalRole } from '../accessibilityTreeUtils/constants';


async function isElementPresentation(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  const role = await getElementAttribute(element,'role') 
  let presentationOrNone = role === 'presentation'|| role ==='none';
  const focusable = await isElementFocusable(element);
  const hasGlobalARIA = await elementHasGlobalARIAPropertieOrAttribute(element);
  const parent = await getElementParent(element);
  let parentPresentation= false;
  let childPresentational = false;

  if (parent) {
    parentPresentation = await isElementParentPresentation(parent);
    childPresentational = await isParentChildPresentational(parent);
  }

  return ((presentationOrNone && !focusable && !hasGlobalARIA )  || childPresentational) && !parentPresentation;
}

async function isElementParentPresentation(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  const role = await getElementAttribute(element,'role')//FIXME mudar para outro metodo dos roles
  let presentationOrNone = role === 'presentation'|| role ==='none';
  const focusable = await isElementFocusable(element);
  const hasGlobalARIA = await elementHasGlobalARIAPropertieOrAttribute(element);
  const parent = await getElementParent(element);
  let parentPresentation= false;
  let presentation = presentationOrNone && !focusable && !hasGlobalARIA; 

  if (parent && !presentation) {
    parentPresentation = await isElementParentPresentation(parent);
  }

  return presentation || parentPresentation;
}

async function isParentChildPresentational(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  const role = await getElementAttribute(element,'role')//FIXME mudar para outro metodo dos roles
  let childPresentational;
  if(role!== null)
    childPresentational= childPresentationalRole.includes(role);//todo
  const parent = await getElementParent(element);
  let isParentChildPresentational= false;

  if (parent && !childPresentational) {
    isParentChildPresentational = await isElementPresentationRecursion(parent);
  }

  return childPresentational || isParentChildPresentational;
}

export = isElementPresentation;
