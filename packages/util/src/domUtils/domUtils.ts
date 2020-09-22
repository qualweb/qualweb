'use strict';

import getSourceElementSelectorFunction from './getSourceElementSelector';
import getSourceElementHtmlCodeFunction from './getSourceElementHtmlCode';
import getSourceElementAttributeFunction from './getSourceElementAttribute';
import getElementReferencedByHREFFunction from './getElementReferencedByHREF';
import isElementHiddenByCSSFunction from './isElementHiddenByCSS';
import isElementHiddenByCSSAuxFunction from './isElementHiddenByCSSAux';
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
import isElementChildPresentationalFunction from './isElementChildPresentational';
import isElementChildPresentationalAuxFunction from './isElementChildPresentationalAux';
import elementHasContentFunction from './elementHasContent'
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

  @CacheDecorator("DomUtils.isElementHidden")
  public static isElementHidden(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementHiddenFunction(elementQW, pageQW);
  }

  @CacheDecorator("DomUtils.isElementHiddenByCSS")
  public static isElementHiddenByCSS(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementHiddenByCSSFunction(elementQW, pageQW);
  }

  @CacheDecorator("DomUtils.isElementFocusableByDefault")
  public static isElementFocusableByDefault(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementFocusableByDefaultFunction(elementQW);
  }

  @CacheDecorator("DomUtils.isElementFocusable")
  public static isElementFocusable(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementFocusableFunction(elementQW, pageQW);
  }

  @CacheDecorator("DomUtils.isElementVisible")
  public static isElementVisible(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementVisibleFunction(elementQW, pageQW);
  }

  @CacheDecorator("DomUtils.elementHasGlobalARIAPropertyOrAttribute")
  public static elementHasGlobalARIAPropertyOrAttribute(elementQW: QWElement, pageQW: QWPage): boolean {
    return elementHasGlobalARIAPropertyOrAttributeFunction(elementQW);
  }

  @CacheDecorator("DomUtils.elementIDIsReferenced")
  public static elementIDIsReferenced(elementQW: QWElement, pageQW: QWPage, id: string, attribute: string): boolean {
    return elementIDIsReferencedFunction(elementQW, pageQW, id, attribute);
  }

  @CacheDecorator("DomUtils.isElementADescendantOf")
  public static isElementADescendantOf(elementQW: QWElement, pageQW: QWPage, names: string[], roles: string[]): boolean {
    return isElementADescendantOfFunction(elementQW, pageQW, names, roles);
  }

  @CacheDecorator("DomUtils.isElementADescendantOfExplicitRole")
  public static isElementADescendantOfExplicitRole(elementQW: QWElement, pageQW: QWPage, names: string[], roles: string[]): boolean {
    return isElementADescendantOfExplicitRoleFunction(elementQW, pageQW, names, roles);
  }

  @CacheDecorator("DomUtils.isElementChildPresentationalAux")
  public static isElementChildPresentationalAux(element: QWElement, page: QWPage): boolean{
    return isElementChildPresentationalAuxFunction(element, page);
  }

  @CacheDecorator("DomUtils.isElementChildPresentational")
  public static isElementChildPresentational(elementQW: QWElement, pageQW: QWPage): boolean{
    return isElementChildPresentationalFunction(elementQW, pageQW);

  }

  @CacheDecorator("DomUtils.elementHasContent")
  public static elementHasContent(elementQW: QWElement, pageQW: QWPage, checkChildren: boolean): boolean {
    return elementHasContentFunction(elementQW, pageQW,checkChildren);

  }
  @CacheDecorator("DomUtils.isElementHiddenByCSSAux")
  public static isElementHiddenByCSSAux(elementQW: QWElement,pageQW:QWPage): boolean{
    return isElementHiddenByCSSAuxFunction(elementQW, pageQW); 
  }



}

export default DomUtils;
