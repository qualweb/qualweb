'use strict';

import { Page } from 'puppeteer';

async function processShadowDom(page: Page): Promise<Page> {
  page.evaluate((elem) => {

     function getElementSelector(elem) {   
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
      }
    



    let listElements = document.querySelectorAll("*");
    let listOfSelectors;

    for (let element of listElements) {
      if (element.shadowRoot !== null) {
        listOfSelectors.push( getElementSelector(element))
      }
    }
  });

  return page;
}

export = processShadowDom;