import { widgetRoles } from './constants';

function isElementWidget(element: typeof window.qwElement): boolean {
  const role = window.AccessibilityUtils.getElementRoleAName(element, '');
  return role !== null && widgetRoles.indexOf(role) >= 0;
}

export default isElementWidget;
