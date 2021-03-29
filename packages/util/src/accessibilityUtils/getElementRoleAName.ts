import isElementFocusable from './isElementFocusable';
import elementHasGlobalARIAPropertyOrAttribute from './elementHasGlobalARIAPropertyOrAttribute';
import getImplicitRole from './getImplicitRole';

function getElementRoleAName(element: typeof window.qwElement, aName: string | undefined): string | null {
  const explicitRole = element.getElementAttribute('role');
  let role = explicitRole;
  if (
    explicitRole === null ||
    ((explicitRole === 'none' || explicitRole === 'presentation') &&
      (isElementFocusable(element) || elementHasGlobalARIAPropertyOrAttribute(element)))
  ) {
    role = getImplicitRole(element, aName);
  }
  return role;
}

export = getElementRoleAName;
