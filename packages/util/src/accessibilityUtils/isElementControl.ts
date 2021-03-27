import { controlRoles } from './constants';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getElementRoleAName from './getElementRoleAName';

function isElementControl(elementQW: QWElement, pageQW: QWPage): boolean {
  const role = getElementRoleAName(elementQW, pageQW, '');
  return role !== null && controlRoles.indexOf(role) >= 0;
}
export default isElementControl;
