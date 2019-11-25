'use strict';

import getElementSelectorFunction from './getElementSelector';
import getElementHtmlCodeFunction from './getElementHtmlCode';
import elementHasAttributeFunction from './elementHasAttribute';
import elementHasAttributesFunction from './elementHasAttributes';
import getElementAttributeFunction from './getElementAttribute';
import getElementStylePropertyFunction from './getElementStyleProperty';
import getElementReferencedByHREFFunction from './getElementReferencedByHREF';
import elementHasChildFunction from './elementHasChild';
import getElementChildTextContentFunction from './getElementChildTextContent';
import elementHasParentFunction from './elementHasParent';
import getElementByIdFunction from './getElementById';
import getContentComputedStylesAttributeFunction from './getContentComputedStylesAttribute';
import getElementTextFunction from './getElementText';
import getElementParentFunction from './getElementParent';


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
  export const getElementHtmlCode = getElementHtmlCodeFunction;
  export const getElementReferencedByHREF = getElementReferencedByHREFFunction;
  export const elementHasChild = elementHasChildFunction;
  export const getElementChildTextContent = getElementChildTextContentFunction;
  export const elementHasParent = elementHasParentFunction;
  export const getElementById = getElementByIdFunction;
  export const getContentComputedStylesAttribute = getContentComputedStylesAttributeFunction;
  export const getElementText = getElementTextFunction;
  export const getElementParent = getElementParentFunction;
  export const ROLES = ROLES_ATTR;
}

export = DomUtils;
