import type { QWElement } from '@qualweb/qw-element';
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';

function getAccessibleNameSVG(element: QWElement): string | undefined {
  return getAccessibleNameSVGRecursion(element, false);
}

export default getAccessibleNameSVG;
