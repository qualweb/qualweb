'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getImplicitRole from './getImplicitRole';

function getElementRoleAName(elementQW: QWElement, pageQW: QWPage, aName: string|undefined): string | null {
  let explicitRole = elementQW.getElementAttribute( "role");
  let role = explicitRole;
  if (explicitRole === null) {
    role = getImplicitRole(elementQW,pageQW,aName);
    }
  return role;
}

export = getElementRoleAName;
