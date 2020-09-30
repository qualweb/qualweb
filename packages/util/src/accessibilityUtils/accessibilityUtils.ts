'use strict';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";
import allowsNameFromContentFunction from "./allowsNameFromContent";
import getAccessibleNameFunction from "./getAccessibleName";
import getAccessibleNameRecursionFunction from "./getAccessibleNameRecursion";
import getDefaultNameFunction from "./getDefaultName";
import getAccessibleNameSVGFunction from "./getAccessibleNameSVG";
import isDataTableFunction from "./isDataTable";
import isElementChildOfDetailsFunction from "./isElementChildOfDetails";
import isElementControlFunction from "./isElementControl";
import isElementWidgetFunction from "./isElementWidget";
import getElementRoleFunction from "./getElementRole";
import getElementRoleANameFunction from "./getElementRoleAName";
import getImplicitRoleFunction from "./getImplicitRole";
import isElementInATFunction from "./isElementInAT";
import elementHasValidRoleFunction from "./elementHasValidRole";
import isElementReferencedByAriaLabelFunction from './isElementReferencedByAriaLabel';
import getDisabledWidgetsFunction from './getDisabledWidgets';
import getAccessibleNameSelectorFunction from './getAccessibleNameSelector';
import getLinkContextFunction from './getLinkContext';
import getOwnerElementFunction from './getOwnerElement';
import isElementChildPresentationalFunction from './isElementChildPresentational';
import isElementChildPresentationalAuxFunction from './isElementChildPresentationalAux';
import elementHasGlobalARIAPropertyOrAttributeFunction from './elementHasGlobalARIAPropertyOrAttribute'
import isElementFocusableByDefaultFunction from './isElementFocusableByDefault'
import isElementFocusableFunction from './isElementFocusable';
import isPartOfSequentialFocusNavigationFunction from './isPartOfSequentialFocusNavigation';

import { CacheDecorator } from "../decorator";


class AccessibilityUtils {
  @CacheDecorator("AcceUtils.getLinkContext")
  public static getLinkContext(element: QWElement, page: QWPage): string[] {
    return getLinkContextFunction(element, page);
  }
  public static allowsNameFromContent = allowsNameFromContentFunction;
  @CacheDecorator("AcceUtils.elementHasValidRole")
  public static elementHasValidRole(element: QWElement, page: QWPage): boolean {
    return elementHasValidRoleFunction(element, page);
  }
  @CacheDecorator("AcceUtils.getAccessibleName")
  public static getAccessibleName(element: QWElement, page: QWPage): string | undefined {
    return getAccessibleNameFunction(element, page);
  }

  @CacheDecorator("AcceUtils.getAccessibleNameRecursion")
  public static getAccessibleNameRecursion(element: QWElement, page: QWPage, recursion: boolean, isWidget: boolean): string | undefined {
    return getAccessibleNameRecursionFunction(element, page, recursion, isWidget);
  }
  public static getAccessibleNameSelector = getAccessibleNameSelectorFunction;
  @CacheDecorator("AcceUtils.getAccessibleNameSVG")
  public static getAccessibleNameSVG(element: QWElement, page: QWPage): string | undefined {
    return getAccessibleNameSVGFunction(element, page);

  }
  public static getDefaultName = getDefaultNameFunction;
  public static getDisabledWidgets = getDisabledWidgetsFunction;
  @CacheDecorator("AcceUtils.getElementRole")
  public static getElementRole(element: QWElement, page: QWPage): string | null {
    return getElementRoleFunction(element, page);

  }
  @CacheDecorator("AcceUtils.getElementRole")
  public static getElementRoleAName(element: QWElement, page: QWPage, aName: string | undefined): string | null {
    return getElementRoleANameFunction(element, page, aName);
  }

  @CacheDecorator("AcceUtils.isDataTable")
  public static isDataTable(element: QWElement, page: QWPage): boolean {
    return isDataTableFunction(element, page);

  }
  public static isElementChildOfDetails = isElementChildOfDetailsFunction;
  @CacheDecorator("AcceUtils.isElementControl")
  public static isElementControl(element: QWElement, page: QWPage): boolean {
    return isElementControlFunction(element, page);
  }
  @CacheDecorator("AcceUtils.isElementInAT")
  public static isElementInAT(element: QWElement, page: QWPage): boolean {
    return isElementInATFunction(element, page);
  }
  @CacheDecorator("AcceUtils.isElementReferencedByAriaLabel")
  public static isElementReferencedByAriaLabel(element: QWElement, page: QWPage): boolean {
    return isElementReferencedByAriaLabelFunction(element, page);
  }
  @CacheDecorator("AcceUtils.isElementWidget")
  public static isElementWidget(element: QWElement, page: QWPage): boolean {
    return isElementWidgetFunction(element, page);
  }
  @CacheDecorator("AcceUtils.getImplicitRole")
  public static getImplicitRole(element: QWElement, page: QWPage, accessibleName: string | undefined): string | null {
    return getImplicitRoleFunction(element, page, accessibleName);
  }
  @CacheDecorator("AcceUtils.getOwnerElement")
  public static getOwnerElement(element: QWElement, page: QWPage): QWElement | null {
    return getOwnerElementFunction(element, page);

  }
  @CacheDecorator("AcceUtils.isElementChildPresentationalAux")
  public static isElementChildPresentationalAux(element: QWElement, page: QWPage): boolean{
    return isElementChildPresentationalAuxFunction(element, page);
  }

  @CacheDecorator("AcceUtils.isElementChildPresentational")
  public static isElementChildPresentational(elementQW: QWElement, pageQW: QWPage): boolean{
    return isElementChildPresentationalFunction(elementQW, pageQW);

  }

  @CacheDecorator("AcceUtils.isElementFocusableByDefault")
  public static isElementFocusableByDefault(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementFocusableByDefaultFunction(elementQW);
  }

  @CacheDecorator("AcceUtils.isElementFocusable")
  public static isElementFocusable(elementQW: QWElement, pageQW: QWPage): boolean {
    return isElementFocusableFunction(elementQW, pageQW);
  }

  @CacheDecorator("AcceUtils.isPartOfSequentialFocusNavigation")
  public static isPartOfSequentialFocusNavigation(elementQW: QWElement, pageQW: QWPage): boolean {
    return isPartOfSequentialFocusNavigationFunction(elementQW, pageQW);
  }

  @CacheDecorator("AcceUtils.elementHasGlobalARIAPropertyOrAttribute")
  public static elementHasGlobalARIAPropertyOrAttribute(elementQW: QWElement, pageQW: QWPage): boolean {
    return elementHasGlobalARIAPropertyOrAttributeFunction(elementQW);
  }

}

export default AccessibilityUtils;
