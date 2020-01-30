'use strict';

import { Page, ElementHandle } from 'puppeteer';
import getElementChildren from '../domUtils/getElementChildren';
import setElementAttribute from '../domUtils/setElementAttribute';

async function processShadowDom(page: Page): Promise<Page> {
  let selectors = await page.evaluate((elem) => {

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

    let listElements = document.querySelectorAll("*") || new Array();
    let listOfSelectors = new Array<string>();


    /*for (let element of listElements || []) {
      if (element.shadowRoot !== null) {
        element.innerHTML = element.shadowRoot.innerHTML;
        listOfSelectors.push(getElementSelector(element));
        
      }
    }*/
    listElements.forEach(element => {
      if (element.shadowRoot !== null) {
        element.innerHTML = element.shadowRoot.innerHTML;
        listOfSelectors.push(getElementSelector(element));
      }
    });

    return listOfSelectors;
  });
  
  let shadowCounter = 0;
  let shadowRoot,children;
  for (let selector of selectors) { 
    shadowRoot = await page.$(selector);
    children = await getElementChildren(shadowRoot);
    await setShadowAttribute(children,shadowCounter);
  }

  return page;
}

async function setShadowAttribute(elements: ElementHandle[], counter: number): Promise<void> {
  for(const element of elements || []){
    await setElementAttribute(element,"shadowTree",counter+"")
  }
}

export default processShadowDom;