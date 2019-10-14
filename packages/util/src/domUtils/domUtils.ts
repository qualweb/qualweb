'use strict';

import getElementSelectorFunction from './getElementSelector';
import transformElementIntoHtmlFunction from './transformElementIntoHtml';
import elementHasAttributeFunction from './elementHasAttribute';
import elementHasAttributesFunction from './elementHasAttributes';
import getElementAttributeFunction from './getElementAttribute';
import getElementStylePropertyFunction from './getElementStyleProperty';
import isElementFocusableFunction from './isElementFocusable';
import isElementFocusableByDefaultFunction from './isElementFocusableByDefault';
import isElementHiddenFunction from './isElementHidden';
import isElementHiddenByCSSFunction from './isElementHiddenByCSS';
import getElementReferencedByHREFFunction from './getElementReferencedByHREF';
import elementHasChildFunction from './elementHasChild';
import getElementChildTextContentFunction from './getElementChildTextContent';
import elementHasParentFunction from './elementHasParent';
import getElementByIdFunction from './getElementById';
import getContentComputedStylesAttributeFunction from './getContentComputedStylesAttribute';


import ROLES_ATTR from './roles';

/**
 * DOM Utilities namespace
 */
namespace DomUtils {
  export const elementHasAttribute = elementHasAttributeFunction;
  export const elementHasAttributes = elementHasAttributesFunction;
  export const getElementAttribute = getElementAttributeFunction;
  export const getElementSelector = getElementSelectorFunction;
  export const getElementStyleProperty = getElementStylePropertyFunction;
  export const transformElementIntoHtml = transformElementIntoHtmlFunction;
  export const isElementFocusable = isElementFocusableFunction;
  export const isElementFocusableByDefault = isElementFocusableByDefaultFunction;
  export const isElementHidden = isElementHiddenFunction;
  export const isElementHiddenByCSS = isElementHiddenByCSSFunction;
  export const getElementReferencedByHREF = getElementReferencedByHREFFunction;
  export const elementHasChild = elementHasChildFunction;
  export const getElementChildTextContent = getElementChildTextContentFunction;
  export const elementHasParent = elementHasParentFunction;
  export const getElementById = getElementByIdFunction;
  export const getContentComputedStylesAttribute = getContentComputedStylesAttributeFunction;
  export const ROLES = ROLES_ATTR;
}

export = DomUtils;
