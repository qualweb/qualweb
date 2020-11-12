'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';

function getElementRole(elementQW: QWElement, pageQW: QWPage): string | null {
  const aName = AccessibilityUtils.getAccessibleName(elementQW, pageQW);

  return AccessibilityUtils.getElementRoleAName(elementQW, pageQW, aName);
}

export default getElementRole;
