import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementFocusable from './isElementFocusable';
import elementHasGlobalARIAPropertyOrAttribute from './elementHasGlobalARIAPropertyOrAttribute';
import getImplicitRole from './getImplicitRole';

function getElementRoleAName(elementQW: QWElement, pageQW: QWPage, aName: string | undefined): string | null {
  const explicitRole = elementQW.getElementAttribute('role');
  let role = explicitRole;
  if (
    explicitRole === null ||
    ((explicitRole === 'none' || explicitRole === 'presentation') &&
      (isElementFocusable(elementQW, pageQW) || elementHasGlobalARIAPropertyOrAttribute(elementQW)))
  ) {
    role = getImplicitRole(elementQW, pageQW, aName);
  }
  return role;
}

export = getElementRoleAName;
