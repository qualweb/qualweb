import type { QWElement } from '@qualweb/qw-element';
import { widgetRoles } from './constants';
import getElementConcreteRole from './getElementConcreteRole';

/**
 * Determine whether an element's concrete role inherits from widget.
 *
 * @param element - Element whose semantic role is classified.
 * @returns True when the concrete role belongs to the widget taxonomy.
 */
function isElementWidget(element: QWElement): boolean {
  const role = getElementConcreteRole(element);
  return role !== null && widgetRoles.indexOf(role) >= 0;
}

export default isElementWidget;
