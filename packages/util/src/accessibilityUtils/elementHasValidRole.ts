import type { QWElement } from '@qualweb/qw-element';
import { roles } from './roles';

function elementHasValidRole(element: QWElement): boolean {
  const role = window.AccessibilityUtils.getElementRole(element);
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
