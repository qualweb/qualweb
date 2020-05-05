'use strict';
import { QWElement,QWPage } from '@qualweb/html-util';

import roles from './roles.json';
import getElementRole from "./getElementRole";

async function   elementHasValidRole(elementQW: QWElement, pageQW:QWPage): Promise<boolean> {

  let role = await getElementRole(elementQW,pageQW);
  let result = false;
  if (role !== null)
    result = Object.keys(roles).includes(role);

  return result;
}

export default elementHasValidRole;
