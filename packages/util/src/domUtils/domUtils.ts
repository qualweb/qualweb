'use strict';

import getElementSelectorFunction from './getElementSelector';
import getSourceElementSelectorFunction from './getSourceElementSelector';
import getElementHtmlCodeFunction from './getElementHtmlCode';
import getSourceElementHtmlCodeFunction from './getSourceElementHtmlCode';
import elementHasAttributeFunction from './elementHasAttribute';
import elementHasAttributesFunction from './elementHasAttributes';
import getElementAttributeFunction from './getElementAttribute';
import getSourceElementAttributeFunction from './getSourceElementAttribute';
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
import getElementAttributesFunction from './getElementAttributes';
import isOffScreenFunction from './isOffScreen';
import isElementVisibleFunction from './isElementVisible'
import getVideoMetadataFunction from './getVideoMetadata'
import elementHasGlobalARIAPropertyOrAttributeFunction from './elementHasGlobalARIAPropertyOrAttribute'
import elementIDIsReferencedFunction from './elementIDIsReferenced';
import isElementADescendantOfFunction from './isElementADescendantOf';
import isElementADescendantOfExplicitRoleFunction from './isElementADescendantOfExplicitRole';
import getPageRootElementFunction from './getPageRootElement';
import isMathDocumentFunction from './isMathDocument';
import ROLES_ATTR from './roles';

/**
 * DOM Utilities namespace
 */
namespace DomUtils {
  export enum Optimization {
    Performance = 1,
    ErrorDetection = 2
  };

  export const elementHasAttribute = elementHasAttributeFunction;
  export const elementHasAttributes = elementHasAttributesFunction;
  export const getElementAttribute = getElementAttributeFunction;
  export const getSourceElementAttribute = getSourceElementAttributeFunction;
  export const getElementSelector = getElementSelectorFunction;
  export const getSourceElementSelector = getSourceElementSelectorFunction;
  export const getElementStyleProperty = getElementStylePropertyFunction;
  export const getElementHtmlCode = getElementHtmlCodeFunction;
  export const getSourceElementHtmlCode = getSourceElementHtmlCodeFunction;
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
  export const isElementFocusableByDefault = isElementFocusableByDefaultFunction;
  export const videoElementHasAudio = videoElementHasAudioFunction;
  export const getElementByAttributeName = getElementByAttributeNameFunction;
  export const isElementFocusable = isElementFocusableFunction;
  export const isFocusableBrowser = isFocusableBrowserFunction;
  export const getElementAttributes = getElementAttributesFunction;
  export const isOffScreen = isOffScreenFunction;
  export const isElementVisible = isElementVisibleFunction;
  export const getVideoMetadata = getVideoMetadataFunction;
  export const elementHasGlobalARIAPropertyOrAttribute = elementHasGlobalARIAPropertyOrAttributeFunction;
  export const elementIDIsReferenced = elementIDIsReferencedFunction;
  export const isElementADescendantOf = isElementADescendantOfFunction;
  export const isElementADescendantOfExplicitRole = isElementADescendantOfExplicitRoleFunction;
  export const getPageRootElement = getPageRootElementFunction;
  export const isMathDocument = isMathDocumentFunction;
  export const ROLES = ROLES_ATTR;
}

export = DomUtils;
