import { widgetRoles } from './constants';
import getElementRoleAName from './getElementRoleAName';

function isElementWidget(element: typeof window.qwElement): boolean {
  const role = getElementRoleAName(element, '');
  return role !== null && widgetRoles.indexOf(role) >= 0;
}

export default isElementWidget;
