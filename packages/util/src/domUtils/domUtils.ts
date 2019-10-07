'use strict';

import getElementSelectorFunction from './getElementSelector';
import transformElementIntoHtmlFunction from './transformElementIntoHtml';
import elementHasAttributeFunction from './elementHasAttribute';
import getElementAttributeFunction from './getElementAttribute';
import getElementStylePropertyFunction from './getElementStyleProperty';
import isElementFocusableFunction from './isElementFocusable';
import isElementFocusableByDefaultFunction from './isElementFocusableByDefault';
import isElementHiddenFunction from './isElementHidden';
import isElementHiddenByCSSFunction from './isElementHiddenByCSS';
import getElementReferencedByHREFFunction from './getElementReferencedByHREF';

/**
 * DOM Utilities namespace
 */
namespace DomUtils {
  export const elementHasAttribute = elementHasAttributeFunction;
  export const getElementAttribute = getElementAttributeFunction;
  export const getElementSelector = getElementSelectorFunction;
  export const getElementStyleProperty = getElementStylePropertyFunction;
  export const transformElementIntoHtml = transformElementIntoHtmlFunction;
  export const isElementFocusable = isElementFocusableFunction;
  export const isElementFocusableByDefault = isElementFocusableByDefaultFunction;
  export const isElementHidden = isElementHiddenFunction;
  export const isElementHiddenByCSS = isElementHiddenByCSSFunction;
  export const getElementReferencedByHREF = getElementReferencedByHREFFunction;
}

export = DomUtils;