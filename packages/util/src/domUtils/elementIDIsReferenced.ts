'use strict';

import { QWElement } from "../qwElement";
import { QWPage } from "../qwPage";


//import getTreeSelector from '../shadowDomUtils/getTreeSelector';

 async function elementIDIsReferenced(pageQW:QWPage,elementQW: QWElement,id:string,atrribute:string): Promise<boolean> {
  if (!elementQW.elementHtml||!pageQW.document) {
    throw Error('Element is not defined');
  }
  //let treeSelector =  getTreeSelector(element);
  let document = pageQW.document;
  return (document.querySelector('['+atrribute+`="${id}"]`/*+treeSelector*/))!== null;
}

export default elementIDIsReferenced;