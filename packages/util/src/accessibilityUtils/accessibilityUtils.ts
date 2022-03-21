import allowsNameFromContentFunction from './allowsNameFromContent';
import getAccessibleNameFunction from './getAccessibleName';
import getAccessibleNameRecursionFunction from './getAccessibleNameRecursion';
import getDefaultNameFunction from './getDefaultName';
import getAccessibleNameSVGFunction from './getAccessibleNameSVG';
import isDataTableFunction from './isDataTable';
import isElementControlFunction from './isElementControl';
import isElementWidgetFunction from './isElementWidget';
import getElementRoleFunction from './getElementRole';
import getElementRoleANameFunction from './getElementRoleAName';
import getImplicitRoleFunction from './getImplicitRole';
import isElementInATFunction from './isElementInAT';
import elementHasValidRoleFunction from './elementHasValidRole';
import isElementReferencedByAriaLabelFunction from './isElementReferencedByAriaLabel';
import getDisabledWidgetsFunction from './getDisabledWidgets';
import getAccessibleNameSelectorFunction from './getAccessibleNameSelector';
import getLinkContextFunction from './getLinkContext';
import getOwnerElementFunction from './getOwnerElement';
import isElementChildPresentationalFunction from './isElementChildPresentational';
import isElementChildPresentationalAuxFunction from './isElementChildPresentationalAux';
import elementHasGlobalARIAPropertyOrAttributeFunction from './elementHasGlobalARIAPropertyOrAttribute';
import isElementFocusableByDefaultFunction from './isElementFocusableByDefault';
import isElementFocusableFunction from './isElementFocusable';
import isFocusableBrowserFunction from './isFocusableBrowser';
import getOwnedElementsFunction from './getOwnedElements';
import getValueFromEmbeddedControlFunction from './getValueFromEmbeddedControl';
import isPartOfSequentialFocusNavigationFunction from './isPartOfSequentialFocusNavigation';
import getAriaOwnerFunction from './getAriaOwner';
import getElementValidExplicitRoleFunction from './getElementValidExplicitRole';
import landmarkIsTopLevel from './landmarkIsTopLevel';
import ariaAttributesRoles from './ariaAttributesRoles.json';
import roles from './roles.json';
import languages from './language.json';

import { Cache, FullMethodCache } from '../cache';
import { AriaAttributesRoles, Roles } from '@qualweb/util';

class AccessibilityUtils {
  public static ariaAttributesRoles = <AriaAttributesRoles>ariaAttributesRoles;
  public static roles = <Roles>roles;
  public static languages = <{ [lang: string]: number }>languages;

  @Cache('AcceUtils.getLinkContext')
  public static getLinkContext(element: typeof window.qwElement): string[] {
    return getLinkContextFunction(element);
  }

  public static allowsNameFromContent = allowsNameFromContentFunction;

  @Cache('AcceUtils.elementHasValidRole')
  public static elementHasValidRole(element: typeof window.qwElement): boolean {
    return elementHasValidRoleFunction(element);
  }

  @Cache('AcceUtils.getElementValidExplicitRole')
  public static getElementValidExplicitRole(element: typeof window.qwElement): string | null {
    return getElementValidExplicitRoleFunction(element);
  }

  @Cache('AcceUtils.getAccessibleName')
  public static getAccessibleName(element: typeof window.qwElement): string | undefined {
    return getAccessibleNameFunction(element);
  }

  @FullMethodCache('AcceUtils.getAccessibleNameRecursion')
  public static getAccessibleNameRecursion(
    element: typeof window.qwElement,
    recursion: boolean,
    isWidget: boolean
  ): string | undefined {
    return getAccessibleNameRecursionFunction(element, recursion, isWidget);
  }

  @Cache('AcceUtils.getAccessibleNameSelector')
  public static getAccessibleNameSelector(element: typeof window.qwElement): Array<string> | undefined {
    return getAccessibleNameSelectorFunction(element);
  }

  @Cache('AcceUtils.getAccessibleNameSVG')
  public static getAccessibleNameSVG(element: typeof window.qwElement): string | undefined {
    return getAccessibleNameSVGFunction(element);
  }
  public static getDefaultName = getDefaultNameFunction;

  public static getDisabledWidgets = getDisabledWidgetsFunction;

  public static isFocusableBrowser = isFocusableBrowserFunction;

  @Cache('AcceUtils.getOwnedElements')
  public static getOwnedElements(element: typeof window.qwElement): Array<typeof window.qwElement> {
    return getOwnedElementsFunction(element);
  }

  @Cache('AcceUtils.getElementRole')
  public static getElementRole(element: typeof window.qwElement): string | null {
    return getElementRoleFunction(element);
  }
  @FullMethodCache('AcceUtils.getElementRole')
  public static getElementRoleAName(element: typeof window.qwElement, aName: string | undefined): string | null {
    return getElementRoleANameFunction(element, aName);
  }

  @Cache('AcceUtils.isDataTable')
  public static isDataTable(element: typeof window.qwElement): boolean {
    return isDataTableFunction(element);
  }

  @Cache('AcceUtils.isElementControl')
  public static isElementControl(element: typeof window.qwElement): boolean {
    return isElementControlFunction(element);
  }

  @Cache('AcceUtils.getValueFromEmbeddedControl')
  public static getValueFromEmbeddedControl(element: typeof window.qwElement): string {
    return getValueFromEmbeddedControlFunction(element);
  }

  @Cache('AcceUtils.isElementInAT')
  public static isElementInAT(element: typeof window.qwElement): boolean {
    return isElementInATFunction(element);
  }
  @Cache('AcceUtils.isElementReferencedByAriaLabel')
  public static isElementReferencedByAriaLabel(element: typeof window.qwElement): boolean {
    return isElementReferencedByAriaLabelFunction(element);
  }
  @Cache('AcceUtils.isElementWidget')
  public static isElementWidget(element: typeof window.qwElement): boolean {
    return isElementWidgetFunction(element);
  }

  @FullMethodCache('AcceUtils.getImplicitRole')
  public static getImplicitRole(element: typeof window.qwElement, accessibleName: string | undefined): string | null {
    return getImplicitRoleFunction(element, accessibleName);
  }
  @Cache('AcceUtils.getOwnerElement')
  public static getOwnerElement(element: typeof window.qwElement): typeof window.qwElement | null {
    return getOwnerElementFunction(element);
  }
  @Cache('AcceUtils.isElementChildPresentationalAux')
  public static isElementChildPresentationalAux(element: typeof window.qwElement): boolean {
    return isElementChildPresentationalAuxFunction(element);
  }

  @Cache('AcceUtils.isElementChildPresentational')
  public static isElementChildPresentational(element: typeof window.qwElement): boolean {
    return isElementChildPresentationalFunction(element);
  }

  @Cache('AcceUtils.isElementFocusableByDefault')
  public static isElementFocusableByDefault(elementQW: typeof window.qwElement): boolean {
    return isElementFocusableByDefaultFunction(elementQW);
  }

  @Cache('AcceUtils.isElementFocusable')
  public static isElementFocusable(element: typeof window.qwElement): boolean {
    return isElementFocusableFunction(element);
  }

  @Cache('AcceUtils.isPartOfSequentialFocusNavigation')
  public static isPartOfSequentialFocusNavigation(element: typeof window.qwElement): boolean {
    return isPartOfSequentialFocusNavigationFunction(element);
  }

  @Cache('AcceUtils.elementHasGlobalARIAPropertyOrAttribute')
  public static elementHasGlobalARIAPropertyOrAttribute(element: typeof window.qwElement): boolean {
    return elementHasGlobalARIAPropertyOrAttributeFunction(element);
  }

  @Cache('AcceUtils.getAriaOwner')
  public static getAriaOwner(element: typeof window.qwElement): typeof window.qwElement | null {
    return getAriaOwnerFunction(element);
  }

  @Cache('AcceUtils.landmarkIsTopLevel')
  public static landmarkIsTopLevel(element: typeof window.qwElement): boolean {
    return landmarkIsTopLevel(element);
  }
}

export default AccessibilityUtils;
