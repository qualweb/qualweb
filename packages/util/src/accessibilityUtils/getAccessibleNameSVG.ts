'use strict';
import { QWElement,QWPage } from '@qualweb/html-util';
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';

async function getAccessibleNameSVG(element: QWElement, page: QWPage): Promise<string | undefined> {
  return await getAccessibleNameSVGRecursion(element, page, false);
}


export default getAccessibleNameSVG;

