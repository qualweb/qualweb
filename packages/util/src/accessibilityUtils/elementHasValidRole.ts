import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import roles from './roles.json';
import { AccessibilityUtils } from '@qualweb/util';

function elementHasValidRole(elementQW: QWElement, pageQW: QWPage): boolean {
  const role = AccessibilityUtils.getElementRole(elementQW, pageQW);
  let result = false;
  if (role) {
    if (role.trim().includes(' ')) {
      for (const r of role.trim().split(' ')) {
        result = Object.keys(roles).includes(r);
        if (result) {
          break;
        }
      }
    } else {
      result = Object.keys(roles).includes(role);
    }
  }

  return result;
}

export default elementHasValidRole;
