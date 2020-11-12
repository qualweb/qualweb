'use strict';

import getSourceElementSelectorFunction from './getSourceElementSelector';
import getSourceElementHtmlCodeFunction from './getSourceElementHtmlCode';
import getSourceElementAttributeFunction from './getSourceElementAttribute';
import getElementReferencedByHREFFunction from './getElementReferencedByHREF';
import isElementHiddenByCSSFunction from './isElementHiddenByCSS';
import isElementHiddenByCSSAuxFunction from './isElementHiddenByCSSAux';
import videoElementHasAudioFunction from './videoElementHasAudio';
import isElementHiddenFunction from './isElementHidden';
import isFocusableBrowserFunction from '../accessibilityUtils/isFocusableBrowser';
import isElementVisibleFunction from './isElementVisible';
import elementIDIsReferencedFunction from './elementIDIsReferenced';
import isElementADescendantOfFunction from './isElementADescendantOf';
import isElementADescendantOfExplicitRoleFunction from './isElementADescendantOfExplicitRole';
import getVideoMetadataFunction from './getVideoMetadata';
import elementHasContentFunction from './elementHasContent';
import getTrimmedTextFunction from './getTrimmedText';

import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { CacheDecorator } from '../decorator';

/**
 * DOM Utilities namespace
 *
 */
class DomUtils {
  public static getSourceElementAttribute = getSourceElementAttributeFunction;
  public static getSourceElementSelector = getSourceElementSelectorFunction;
  public static getSourceElementHtmlCode = getSourceElementHtmlCodeFunction;
  public static getVideoMetadata = getVideoMetadataFunction;
  public static getElementReferencedByHREF = getElementReferencedByHREFFunction;
  public static videoElementHasAudio = videoElementHasAudioFunction;
  public static isFocusableBrowser = isFocusableBrowserFunction;

  @CacheDecorator('DomUtils.isElementHidden')
  public static isElementHidden(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementHiddenFunction(elementQW, pageQW);
  }

  @CacheDecorator('DomUtils.isElementHiddenByCSS')
  public static isElementHiddenByCSS(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementHiddenByCSSFunction(elementQW, pageQW);
  }

  @CacheDecorator('DomUtils.isElementVisible')
  public static isElementVisible(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementVisibleFunction(elementQW, pageQW);
  }

  @CacheDecorator('DomUtils.elementIDIsReferenced')
  public static elementIDIsReferenced(elementQW: QWElement, pageQW: QWPage, id: string, attribute: string): boolean {
    return elementIDIsReferencedFunction(elementQW, pageQW, id, attribute);
  }

  @CacheDecorator('DomUtils.isElementADescendantOf')
  public static isElementADescendantOf(
    elementQW: QWElement,
    pageQW: QWPage,
    names: string[],
    roles: string[]
  ): boolean {
    return isElementADescendantOfFunction(elementQW, pageQW, names, roles);
  }

  @CacheDecorator('DomUtils.isElementADescendantOfExplicitRole')
  public static isElementADescendantOfExplicitRole(
    elementQW: QWElement,
    pageQW: QWPage,
    names: string[],
    roles: string[]
  ): boolean {
    return isElementADescendantOfExplicitRoleFunction(elementQW, pageQW, names, roles);
  }

  @CacheDecorator('DomUtils.elementHasContent')
  public static elementHasContent(elementQW: QWElement, pageQW: QWPage, checkChildren: boolean): boolean {
    return elementHasContentFunction(elementQW, pageQW, checkChildren);
  }
  @CacheDecorator('DomUtils.isElementHiddenByCSSAux')
  public static isElementHiddenByCSSAux(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementHiddenByCSSAuxFunction(elementQW, pageQW);
  }
  @CacheDecorator('DomUtils.getTrimmedText')
  public static getTrimmedText(element: QWElement, page: QWPage): string {
    return getTrimmedTextFunction(element);
  }
}

export default DomUtils;
