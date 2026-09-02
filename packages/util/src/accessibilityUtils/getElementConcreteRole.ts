import type { QWElement } from '@qualweb/qw-element';
import { abstractRoles, extensionRoles } from './constants';
import { roles } from './roles';

const abstractRoleSet = new Set(abstractRoles);
const concreteRoleSet = new Set([
  ...Object.keys(roles).filter((role) => !abstractRoleSet.has(role)),
  ...extensionRoles
]);

/**
 * Return whether a presentational role must yield to native semantics.
 *
 * @param element - Element whose focusability and ARIA attributes are evaluated.
 * @param role - First valid concrete explicit role token.
 * @returns True when `none` or `presentation` conflicts with exposed semantics.
 */
function hasPresentationalRoleConflict(element: QWElement, role: string): boolean {
  if (role !== 'none' && role !== 'presentation') return false;
  return (
    window.AccessibilityUtils.isElementFocusable(element) ||
    window.AccessibilityUtils.elementHasGlobalARIAPropertyOrAttribute(element)
  );
}

/**
 * Resolve the semantic role needed for widget/group classification.
 *
 * Browsers expose a computed role through their accessibility protocol, but
 * not through a stable synchronous DOM API available to injected rule code.
 * This therefore implements the relevant ARIA fallback rules locally:
 * role tokens are ordered fallbacks, abstract/unknown tokens do not count,
 * and native semantics apply when no explicit concrete role can be used.
 *
 * @param element - Element whose explicit and implicit semantics are resolved.
 * @returns First usable concrete role, implicit role, or null when none applies.
 */
function getElementConcreteRole(element: QWElement): string | null {
  const explicitRole = element.getElementAttribute('role');
  if (explicitRole !== null) {
    // The first valid token wins. Do not continue to a later widget token after
    // finding an earlier non-widget role (for example `heading button`).
    const role = explicitRole
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .find((token) => concreteRoleSet.has(token));

    if (role && !hasPresentationalRoleConflict(element, role)) return role;
  }

  // An empty accessible name is sufficient for widget/group classification:
  // name-conditional implicit roles are landmarks, not widgets or groups.
  // Avoiding full name computation is also essential because accessible-name
  // recursion itself asks whether embedded controls are widgets.
  return window.AccessibilityUtils.getImplicitRole(element, '');
}

export default getElementConcreteRole;
