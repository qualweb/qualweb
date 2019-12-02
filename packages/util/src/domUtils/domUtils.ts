'use strict';

import getElementSelectorFunction from './getElementSelector';
import getElementHtmlCodeFunction from './getElementHtmlCode';
import elementHasAttributeFunction from './elementHasAttribute';
import elementHasAttributesFunction from './elementHasAttributes';
import getElementAttributeFunction from './getElementAttribute';
import getElementNameFunction from './getElementName';
import getElementAttribute2Function from './getElementAttribute2';
import getElementStylePropertyFunction from './getElementStyleProperty';
import getElementReferencedByHREFFunction from './getElementReferencedByHREF';
import elementHasChildFunction from './elementHasChild';
import getElementChildTextContentFunction from './getElementChildTextContent';
import elementHasParentFunction from './elementHasParent';
import getElementByIdFunction from './getElementById';
import getContentComputedStylesAttributeFunction from './getContentComputedStylesAttribute';
import getElementTextFunction from './getElementText';
import getElementParentFunction from './getElementParent';
import getElementTagNameFunction from './getElementTagName';
import getElementTypeFunction from './getElementType';
import elementHasChildrenFunction from './elementHasChildren';
import getElementChildrenFunction from './getElementChildren';
import getElementAttributesNameFunction from './getElementAttributesName';
import getElementNextSiblingFunction from './getElementNextSibling';
import getElementPreviousSiblingFunction from './getElementPreviousSibling';
import isElementHiddenByCSSFunction from './isElementHiddenByCSS';
import isElementFocusableByDefaultFunction from './isElementFocusableByDefault'
import videoElementHasAudioFunction from './videoElementHasAudio';
import getElementByAttributeNameFunction from './getElementByAttributeName';
import isElementHiddenFunction from './isElementHidden';
import isElementFocusableFunction from './isElementFocusable';
import isFocusableBrowserFunction from './isFocusableBrowser';

import ROLES_ATTR from './roles';

/**
 * DOM Utilities namespace
 */
namespace DomUtils {
  export const elementHasAttribute = elementHasAttributeFunction;
  export const elementHasAttributes = elementHasAttributesFunction;
  export const getElementAttribute = getElementAttributeFunction;
  export const getElementName = getElementNameFunction;
  export const getElementAttribute2 = getElementAttribute2Function;
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
  export const isElementHidden = isElementHiddenFunction;
  export const getElementTagName = getElementTagNameFunction;
  export const getElementType = getElementTypeFunction;
  export const elementHasChildren = elementHasChildrenFunction;
  export const getElementChildren = getElementChildrenFunction;
  export const getElementAttributesName = getElementAttributesNameFunction;
  export const getElementNextSibling = getElementNextSiblingFunction;
  export const getElementPreviousSibling = getElementPreviousSiblingFunction;
  export const isElementHiddenByCSS = isElementHiddenByCSSFunction;
  export  const isElementFocusableByDefault = isElementFocusableByDefaultFunction;
  export const videoElementHasAudio = videoElementHasAudioFunction;
  export const getElementByAttributeName = getElementByAttributeNameFunction;
  export const isElementFocusable = isElementFocusableFunction;
  export const isFocusableBrowser = isFocusableBrowserFunction;
  export const ROLES = ROLES_ATTR;
}

export = DomUtils;
