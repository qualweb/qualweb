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
import elementHasContentFunction from './elementHasContent'

/**
 * DOM Utilities namespace
 */
class DomUtils {
 public static getSourceElementAttribute = getSourceElementAttributeFunction;
 public static getSourceElementSelector = getSourceElementSelectorFunction;
 public static getSourceElementHtmlCode = getSourceElementHtmlCodeFunction;
 public static getElementReferencedByHREF = getElementReferencedByHREFFunction;
 public static isElementHidden = isElementHiddenFunction;
 public static isElementHiddenByCSS = isElementHiddenByCSSFunction;
 public static isElementFocusableByDefault = isElementFocusableByDefaultFunction;
 public static videoElementHasAudio = videoElementHasAudioFunction;
 public static isElementFocusable = isElementFocusableFunction;
 public static isFocusableBrowser = isFocusableBrowserFunction;
 public static isElementVisible = isElementVisibleFunction;
 public static elementHasGlobalARIAPropertyOrAttribute = elementHasGlobalARIAPropertyOrAttributeFunction;
 public static elementIDIsReferenced = elementIDIsReferencedFunction;
 public static isElementADescendantOf = isElementADescendantOfFunction;
 public static isElementADescendantOfExplicitRole = isElementADescendantOfExplicitRoleFunction;
 public static getVideoMetadata = getVideoMetadataFunction;
 public static elementHasContent = elementHasContentFunction;
}

export default DomUtils;
