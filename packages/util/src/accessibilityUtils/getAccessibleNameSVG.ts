'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';

async function getAccessibleNameSVG(element: QWElement, page: QWPage): Promise<string | undefined> {
  return await getAccessibleNameSVGRecursion(element, page, false);
}


export default getAccessibleNameSVG;

