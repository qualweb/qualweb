import { controlRoles } from './constants';
import getElementRoleAName from './getElementRoleAName';

function isElementControl(element: typeof window.qwElement): boolean {
  const role = getElementRoleAName(element, '');
  return role !== null && controlRoles.indexOf(role) >= 0;
}
export default isElementControl;
