'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementSelector(element: ElementHandle): Promise<string> {

  const selector = await element.evaluate(elem => {
    function getSelfLocationInParent(element) {
      let selector = '';

      if (element.tagName.toLowerCase() === 'body' || element.tagName.toLowerCase() === 'head') {
        return element.tagName.toLowerCase();
      }

      let sameEleCount = 0;

      let prev = element.previousElementSibling;
      while (prev) {
        if (prev.tagName.toLowerCase() === element.tagName.toLowerCase()) {
          sameEleCount++;
        }
        prev = prev.previousElementSibling;
      }

      selector += `${element.tagName.toLowerCase()}:nth-of-type(${sameEleCount + 1})`;

      return selector;
    }

    if (elem.tagName.toLowerCase() === 'html') {
      return 'html';
    } else if (elem.tagName.toLowerCase() === 'head') {
      return 'html > head';
    } else if (elem.tagName.toLowerCase() === 'body') {
      return 'html > body'; 
    }

    let selector = 'html > ';
    let parents = new Array<string>();
    let parent = elem['parentElement'];
    while (parent && parent.tagName.toLowerCase() !== 'html') {
      parents.unshift(getSelfLocationInParent(parent));
      parent = parent['parentElement'];
    }

    selector += parents.join(' > ');
    selector += ' > ' + getSelfLocationInParent(elem);

    return selector;
  });

  return selector;
}

export = getElementSelector;