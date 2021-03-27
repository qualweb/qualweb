import { widgetRoles } from './constants';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getElementRoleAName from './getElementRoleAName';

function isElementWidget(elementQW: QWElement, pageQW: QWPage): boolean {
  const role = getElementRoleAName(elementQW, pageQW, '');
  return role !== null && widgetRoles.indexOf(role) >= 0;
}

export default isElementWidget;
