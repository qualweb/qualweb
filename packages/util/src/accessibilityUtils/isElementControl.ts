import type { QWElement } from '@qualweb/qw-element';
import { controlRoles } from './constants';

function isElementControl(element: QWElement): boolean {
  const role = window.AccessibilityUtils.getElementRoleAName(element, '');
  return role !== null && controlRoles.indexOf(role) >= 0;
}

export default isElementControl;
