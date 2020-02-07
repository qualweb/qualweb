'use strict';

import allowsNameFromContentFunction from "./allowsNameFromContent";
import elementHasRoleNoneOrPresentationFunction from "./elementHasRoleNoneOrPresentation";
import getAccessibleNameFunction from "./getAccessibleName";
import getDefaultNameFunction from "./getDefaultName";
import getAccessibleNameSVGFunction from "./getAccessibleNameSVG";
import getTrimmedTextFunction from "./getTrimmedText";
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

namespace AccessibilityUtils {
  export const getElmentRoleAname = getElementRoleANameFunction;
  export const allowsNameFromContent = allowsNameFromContentFunction;
  export const elementHasRoleNoneOrPresentation = elementHasRoleNoneOrPresentationFunction;
  export const getAccessibleName = getAccessibleNameFunction;
  export const getDefaultName = getDefaultNameFunction;
  export const getAccessibleNameSVG = getAccessibleNameSVGFunction;
  export const getTrimmedText = getTrimmedTextFunction;
  export const isDataTable = isDataTableFunction;
  export const isElementChildOfDetails = isElementChildOfDetailsFunction;
  export const isElementControl = isElementControlFunction;
  export const isElementWidget = isElementWidgetFunction;
  export const getElementRole = getElementRoleFunction;
  export const getImplicitRole = getImplicitRoleFunction;
  export const isElementInAT = isElementInATFunction;
  export const elementHasValidRole = elementHasValidRoleFunction;
  export const isElementReferencedByAriaLabel = isElementReferencedByAriaLabelFunction;
}

export default AccessibilityUtils;
