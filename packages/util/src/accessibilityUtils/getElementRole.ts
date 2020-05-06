'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getAccessibleName from './getAccessibleName';
import getElementRoleAName from './getElementRoleAName';


function getElementRole(elementQW: QWElement, pageQW: QWPage): string | null {
  let aName = getAccessibleName(elementQW, pageQW);

  return getElementRoleAName(elementQW, pageQW, aName);
}

export default getElementRole;
