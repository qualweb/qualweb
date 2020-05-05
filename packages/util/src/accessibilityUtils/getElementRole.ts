'use strict';
import { QWElement,QWPage } from '@qualweb/html-util';
import getAccessibleName from './getAccessibleName';
import getElementRoleAName from './getElementRoleAName';


async function getElementRole(elementQW: QWElement, pageQW:QWPage): Promise<string | null> {
  let aName = await getAccessibleName(elementQW, pageQW);
  
  return await getElementRoleAName(elementQW, pageQW,aName);
}

export default getElementRole;
