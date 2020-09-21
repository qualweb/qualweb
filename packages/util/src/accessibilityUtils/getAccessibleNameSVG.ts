'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';

function getAccessibleNameSVG(element: QWElement, page: QWPage): string | undefined {
  return getAccessibleNameSVGRecursion(element, page, false);;
}


export default getAccessibleNameSVG;

