import roles from './roles.json';

function elementHasValidRole(element: typeof window.qwElement): boolean {
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
