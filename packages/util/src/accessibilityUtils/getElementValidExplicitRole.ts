import type { QWElement } from '@qualweb/qw-element';
import { roles } from './roles';

function getElementValidExplicitRole(element: QWElement): string | null {
  const role = element.getElementAttribute('role');
  let validRole: string | null = null;
  if (role) {
    if (role.trim().includes(' ')) {
      for (const r of role.trim().split(' ')) {
        validRole = Object.keys(roles).includes(r) ? r : null;
        if (validRole) {
          break;
        }
      }
    } else {
      validRole = Object.keys(roles).includes(role) ? role : null;
    }
  }

  return validRole;
}

export default getElementValidExplicitRole;
