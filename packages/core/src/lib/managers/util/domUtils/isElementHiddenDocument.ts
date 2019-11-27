'use strict';
import {  getElementParentDocument } from './domUtils';
import getElementAttributeDocument from './getElementAttributeDocument';
import isElementHiddenByCSSAuxDocument from './isElementHiddenByCSSAuxDocument';

function isElementHiddenDocument(element: Element): boolean {
  if (!element) {
    throw Error('Element is not defined');
  }

  const ariaHidden = getElementAttributeDocument(element,'aria-hidden')==='true';
  const hidden = getElementAttributeDocument(element,'aria-hidden') !== undefined;
  const cssHidden = isElementHiddenByCSSAuxDocument(element);
  const parent = getElementParentDocument(element);
  let parentHidden = false;

  if (parent) {
    parentHidden = isElementHiddenDocument(parent);
  }

  return cssHidden || hidden || ariaHidden || parentHidden;
}

export = isElementHiddenDocument;
