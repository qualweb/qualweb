import type { QWElement } from '@qualweb/qw-element';

function getElementRole(element: QWElement): string | null {
  const aName = window.AccessibilityUtils.getAccessibleName(element);
  return window.AccessibilityUtils.getElementRoleAName(element, aName);
}

export default getElementRole;
