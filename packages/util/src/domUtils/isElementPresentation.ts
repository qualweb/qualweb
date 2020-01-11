'use strict';

import { ElementHandle, Page } from 'puppeteer';
import getElementAttribute = require('./getElementAttribute');
import isElementFocusable = require('./isElementFocusable');
import getElementParent = require('./getElementParent');
import elementHasGlobalARIAPropertieOrAttribute = require('./elementHasGlobalARIAPropertieOrAttribute');
import { childPresentationalRole } from '../accessibilityTreeUtils/constants';
import getElementRole = require('../accessibilityTreeUtils/getElementRole');


async function isElementPresentation(element: ElementHandle,page:Page): Promise<boolean> {
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
    childPresentational = await isParentChildPresentational(parent,page);
  }

  return ((presentationOrNone && !focusable && !hasGlobalARIA )  || childPresentational) && !parentPresentation;
}

async function isElementParentPresentation(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  const role = await getElementAttribute(element,'role')
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

async function isParentChildPresentational(element: ElementHandle,page:Page): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }

  const role = await getElementRole(element,page);
  let childPresentational;
  if(role!== null)
    childPresentational= childPresentationalRole.includes(role);//todo
  const parent = await getElementParent(element);
  let isParentChildPresentationalVar= false;

  if (parent && !childPresentational) {
    isParentChildPresentationalVar = await isParentChildPresentational(parent,page);
  }

  return childPresentational || isParentChildPresentationalVar;
}

export = isElementPresentation;
