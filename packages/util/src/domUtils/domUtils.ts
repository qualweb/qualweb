'use strict';

import getSourceElementSelectorFunction from './getSourceElementSelector';
import getSourceElementHtmlCodeFunction from './getSourceElementHtmlCode';
import getSourceElementAttributeFunction from './getSourceElementAttribute';
import getElementReferencedByHREFFunction from './getElementReferencedByHREF';
import isElementHiddenByCSSFunction from './isElementHiddenByCSS';
import isElementFocusableByDefaultFunction from './isElementFocusableByDefault'
import videoElementHasAudioFunction from './videoElementHasAudio';
import isElementHiddenFunction from './isElementHidden';
import isElementFocusableFunction from './isElementFocusable';
import isFocusableBrowserFunction from './isFocusableBrowser';
import isElementVisibleFunction from './isElementVisible'
import elementHasGlobalARIAPropertyOrAttributeFunction from './elementHasGlobalARIAPropertyOrAttribute'
import elementIDIsReferencedFunction from './elementIDIsReferenced';
import isElementADescendantOfFunction from './isElementADescendantOf';
import isElementADescendantOfExplicitRoleFunction from './isElementADescendantOfExplicitRole';
import getVideoMetadataFunction from './getVideoMetadata';
import isMathDocumentFunction from './isMathDocument';
import isElementPresentationFunction from './isElementPresentation';

/**
 * DOM Utilities namespace
 */
namespace DomUtils {
  export const getSourceElementAttribute = getSourceElementAttributeFunction;
  export const getSourceElementSelector = getSourceElementSelectorFunction;
  export const getSourceElementHtmlCode = getSourceElementHtmlCodeFunction;
  export const getElementReferencedByHREF = getElementReferencedByHREFFunction;
  export const isElementHidden = isElementHiddenFunction;
  export const isElementHiddenByCSS = isElementHiddenByCSSFunction;
  export const isElementFocusableByDefault = isElementFocusableByDefaultFunction;
  export const videoElementHasAudio = videoElementHasAudioFunction;
  export const isElementFocusable = isElementFocusableFunction;
  export const isFocusableBrowser = isFocusableBrowserFunction;
  export const isElementVisible = isElementVisibleFunction;
  export const elementHasGlobalARIAPropertyOrAttribute = elementHasGlobalARIAPropertyOrAttributeFunction;
  export const elementIDIsReferenced = elementIDIsReferencedFunction;
  export const isElementADescendantOf = isElementADescendantOfFunction;
  export const isElementADescendantOfExplicitRole = isElementADescendantOfExplicitRoleFunction;
  export const getVideoMetadata = getVideoMetadataFunction;
  export const isMathDocument = isMathDocumentFunction;
  export const isElementPresentation = isElementPresentationFunction;
}

export default DomUtils;
