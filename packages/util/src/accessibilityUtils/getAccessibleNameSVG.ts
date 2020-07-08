'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';

function getAccessibleNameSVG(element: QWElement, page: QWPage): string | undefined {
  let selector = element.getElementSelector();
  let method = "AcceUtils.getAccessibleNameSVG";
  let result;
  if(page.isValueCached(selector,method)){
     result = page.getCachedValue(selector,method);
  }else{
    result =  getAccessibleNameSVGRecursion(element, page, false);
    page.cacheValue(selector,method,result);
  }
  return result;
}


export default getAccessibleNameSVG;

