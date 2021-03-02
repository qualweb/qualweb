'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';
function getAccessibleName(elementQW: QWElement, pageQW: QWPage): string | undefined {
  return AccessibilityUtils.getAccessibleNameRecursion(elementQW, pageQW, false, false);
}
export default getAccessibleName;
