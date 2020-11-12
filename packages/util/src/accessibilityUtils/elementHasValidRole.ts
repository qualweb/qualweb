'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import roles from './roles.json';
import { AccessibilityUtils } from '@qualweb/util';

function elementHasValidRole(elementQW: QWElement, pageQW: QWPage): boolean {
  const role = AccessibilityUtils.getElementRole(elementQW, pageQW);
  let result = false;
  if (role !== null) result = Object.keys(roles).includes(role);

  return result;
}

export default elementHasValidRole;
