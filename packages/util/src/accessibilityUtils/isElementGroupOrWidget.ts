import type { QWElement } from '@qualweb/qw-element';
import { groupOrWidgetRoles } from './constants';
import getElementConcreteRole from './getElementConcreteRole';

/**
 * Determine whether an element's concrete role inherits from group or widget.
 *
 * @param element - Element whose semantic role is classified.
 * @returns True when the concrete role belongs to the group-or-widget taxonomy.
 */
function isElementGroupOrWidget(element: QWElement): boolean {
  const role = getElementConcreteRole(element);
  return role !== null && groupOrWidgetRoles.includes(role);
}

export default isElementGroupOrWidget;
