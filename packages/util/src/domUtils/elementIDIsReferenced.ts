'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

 function elementIDIsReferenced(pageQW:QWPage,elementQW: QWElement,id:string,atrribute:string): boolean {
  if (!elementQW||!pageQW) {
    throw Error('Element is not defined');
  }
  let treeSelector =  elementQW.getTreeSelector();
  return (pageQW.getElement('['+atrribute+`="${id}"]`+treeSelector))!== null;
}

export default elementIDIsReferenced;