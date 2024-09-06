import type { QWElement } from '@qualweb/qw-element';
import getElementReferencedByHREFFunction from './getElementReferencedByHREF';
import isElementHiddenByCSSFunction from './isElementHiddenByCSS';
import isElementHiddenByCSSAuxFunction from './isElementHiddenByCSSAux';
import videoElementHasAudioFunction from './videoElementHasAudio';
import isElementHiddenFunction from './isElementHidden';
import isFocusableBrowserFunction from '../accessibilityUtils/isFocusableBrowser';
import isElementVisibleFunction from './isElementVisible';
import elementIdIsReferencedFunction from './elementIdIsReferenced';
import isElementADescendantOfFunction from './isElementADescendantOf';
import isElementADescendantOfExplicitRoleFunction from './isElementADescendantOfExplicitRole';
import getVideoMetadataFunction from './getVideoMetadata';
import elementHasContentFunction from './elementHasContent';
import getTrimmedTextFunction from './getTrimmedText';
import objectElementIsNonTextFunction from './objectElementIsNonText';
import isHumanLanguageFunction from './isHumanLanguage';
import getTextSizeFunction from './getTextSize';

import { Cache, FullMethodCache } from '../cache';

/**
 * DOM Utilities namespace
 *
 */
class DomUtils {
  public static getVideoMetadata = getVideoMetadataFunction;
  public static getElementReferencedByHREF = getElementReferencedByHREFFunction;
  public static videoElementHasAudio = videoElementHasAudioFunction;
  public static isFocusableBrowser = isFocusableBrowserFunction;
  public static objectElementIsNonText = objectElementIsNonTextFunction;
  public static isHumanLanguage = isHumanLanguageFunction;
  public static getTextSize = getTextSizeFunction;

  @Cache('DomUtils.isElementHidden')
  public static isElementHidden(element: QWElement): boolean {
    return isElementHiddenFunction(element);
  }

  @Cache('DomUtils.isElementHiddenByCSS')
  public static isElementHiddenByCSS(element: QWElement): boolean {
    return isElementHiddenByCSSFunction(element);
  }

  @Cache('DomUtils.isElementVisible')
  public static isElementVisible(element: QWElement): boolean {
    return isElementVisibleFunction(element);
  }

  @FullMethodCache('DomUtils.elementIdIsReferenced')
  public static elementIdIsReferenced(element: QWElement, id: string, attribute: string): boolean {
    return elementIdIsReferencedFunction(element, id, attribute);
  }

  @FullMethodCache('DomUtils.isElementADescendantOf')
  public static isElementADescendantOf(
    element: QWElement,
    names: Array<string>,
    roles: Array<string>
  ): boolean {
    return isElementADescendantOfFunction(element, names, roles);
  }

  @FullMethodCache('DomUtils.isElementADescendantOfExplicitRole')
  public static isElementADescendantOfExplicitRole(
    element: QWElement,
    names: Array<string>,
    roles: Array<string>
  ): boolean {
    return isElementADescendantOfExplicitRoleFunction(element, names, roles);
  }

  @Cache('DomUtils.elementHasContent')
  public static elementHasContent(element: QWElement, checkChildren: boolean): boolean {
    return elementHasContentFunction(element, checkChildren);
  }
  @Cache('DomUtils.isElementHiddenByCSSAux')
  public static isElementHiddenByCSSAux(element: QWElement): boolean {
    return isElementHiddenByCSSAuxFunction(element);
  }
  @Cache('DomUtils.getTrimmedText')
  public static getTrimmedText(element: QWElement): string {
    return getTrimmedTextFunction(element);
  }
}

export default DomUtils;
