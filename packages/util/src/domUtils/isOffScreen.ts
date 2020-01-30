'use strict';

import { ElementHandle } from 'puppeteer';

async function isOffScreen(element: ElementHandle): Promise<boolean> {
  if (!element) {
    throw Error('Element is not defined');
  }
  return element.evaluate((element) => {
    let noParentScrolled = function noParentScrolled(element, offset) {
      element = element['parentElement'];
      while (element && element.nodeName.toLowerCase() !== 'html') {
        if (element.scrollTop) {
          offset += element.scrollTop;
          if (offset >= 0) {
            return false;
          }
        }
        element = element.parentElement;
      }
      return true;
    };

    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    let scrollWidth = Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientHeight
    );

    let bounding = element.getBoundingClientRect();
    let left = bounding.left;
    let right = bounding.right;
    let bottom = bounding.bottom;
    let top = bounding.top;

    let noParentScrollTop = noParentScrolled(element, bottom)

    return left > scrollWidth || right < 0 || bottom < 0 && noParentScrollTop || top > scrollHeight || right === 0 && left === 0;
  });
}


export default isOffScreen;
