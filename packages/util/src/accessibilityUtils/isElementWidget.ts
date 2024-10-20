import type { QWElement } from '@qualweb/qw-element';
import { widgetRoles } from './constants';

function isElementWidget(element: QWElement): boolean {
  const role = window.AccessibilityUtils.getElementRoleAName(element, '');
  return role !== null && widgetRoles.indexOf(role) >= 0;
}

export default isElementWidget;
