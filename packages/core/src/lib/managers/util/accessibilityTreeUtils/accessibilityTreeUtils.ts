'use strict';

import allowsNameFromContentFunction from "./allowsNameFromContent";
import elementHasRoleNoneOrPresentationFunction from "./elementHasRoleNoneOrPresentation";
import getAccessibleNameFunction from "./getAccessibleName";
import getDefaultNameFunction from "./getDefaultName";
import getAccessibleNameSVGFunction from "./getAccessibleNameSVG";
import getLabelFunction from "./getLabel";
import getTrimmedTextFunction from "./getTrimmedText";
import isDataTableFunction from "./isDataTable";
import isElementChildOfDetailsFunction from "./isElementChildOfDetails";
import isElementControlFunction from "./isElementControl";
import isElementWidgetFunction from "./isElementWidget";
/**
 * Accessibility Tree Utilities namespace
 */
namespace AccessibilityTreeUtils {
  export const allowsNameFromContent = allowsNameFromContentFunction;
  export const elementHasRoleNoneOrPresentation = elementHasRoleNoneOrPresentationFunction;
  export const getAccessibleName = getAccessibleNameFunction;
  export const getDefaultName = getDefaultNameFunction;
  export const getAccessibleNameSVG = getAccessibleNameSVGFunction;
  export const getLabel = getLabelFunction;
  export const getTrimmedText = getTrimmedTextFunction;
  export const isDataTable = isDataTableFunction;
  export const isElementChildOfDetails = isElementChildOfDetailsFunction;
  export const isElementControl = isElementControlFunction;
  export const isElementWidget = isElementWidgetFunction;
}

export = AccessibilityTreeUtils;
