'use strict';

import { Node } from 'domhandler';

function getSelfLocationInParent(element: Node): string {
  let selector = '';

  if (element['name'] === 'body' || element['name'] === 'head') {
    return element['name'];
  }

  let sameEleCount = 0;

  let prev = element.prev;
  while (prev) {
    if (prev.type === 'tag' && prev['name'] === element['name']) {
      sameEleCount++;
    }
    prev = prev.prev;
  }

  selector += `${element['name']}:nth-of-type(${sameEleCount + 1})`;

  return selector;
}

function getSourceElementSelector(element: Node): string {
  if (element['name'] === 'html') {
    return 'html';
  } else if (element['name'] === 'head') {
    return 'html > head';
  } else if (element['name'] === 'body') {
    return 'html > body';
  }

  let selector = 'html > ';

  const parents = new Array<string>();
  let parent = element.parent;
  while (parent && parent['name'] !== 'html') {
    parents.unshift(getSelfLocationInParent(parent));
    parent = parent.parent;
  }

  selector += parents.join(' > ');
  selector += ' > ' + getSelfLocationInParent(element);

  return selector;
}

export default getSourceElementSelector;
