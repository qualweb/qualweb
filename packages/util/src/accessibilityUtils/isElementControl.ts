import { controlRoles } from './constants';

function isElementControl(element: typeof window.qwElement): boolean {
  const role = window.AccessibilityUtils.getElementRoleAName(element, '');
  return role !== null && controlRoles.indexOf(role) >= 0;
}

export default isElementControl;
