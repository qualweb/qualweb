'use strict';

import { Node } from 'domhandler';

function isElementChildOfDetails(element: Node): boolean {
  return !!element.parent && element.parent['name'] === 'details';
}

export default isElementChildOfDetails;
