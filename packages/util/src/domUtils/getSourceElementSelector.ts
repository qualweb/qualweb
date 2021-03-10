import { Element } from 'domhandler';

function getSelfLocationInParent(element: Element): string {
  let selector = '';

  if (element.name === 'body' || element.name === 'head') {
    return element['name'];
  }

  let sameEleCount = 0;

  let prev = <Element>element.prev;
  while (prev) {
    if (prev.type === 'tag' && prev.name === element.name) {
      sameEleCount++;
    }
    prev = <Element>prev.prev;
  }

  selector += `${element.name}:nth-of-type(${sameEleCount + 1})`;

  return selector;
}

function getSourceElementSelector(element: Element): string {
  if (element.name === 'html') {
    return 'html';
  } else if (element.name === 'head') {
    return 'html > head';
  } else if (element.name === 'body') {
    return 'html > body';
  }

  let selector = 'html > ';

  const parents = new Array<string>();
  let parent = <Element>element.parent;
  while (parent && parent.name !== 'html') {
    parents.unshift(getSelfLocationInParent(parent));
    parent = <Element>parent.parent;
  }

  selector += parents.join(' > ');
  selector += ' > ' + getSelfLocationInParent(element);

  return selector;
}

export default getSourceElementSelector;
