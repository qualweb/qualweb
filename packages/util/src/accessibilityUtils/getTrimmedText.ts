'use strict';

import { QWElement } from '@qualweb/html-util';

async function getTrimmedText(elementQW: QWElement): Promise<string> {
  if (!elementQW) {
    throw Error('Element is not defined');
  }
  let element = elementQW.elementPupeteer;

  let text = await element.evaluate((element)=>{
    let chidlren =element.childNodes;
    let result = "";
    for(let child of chidlren){
      if(child.nodeType=== 3){
          result = result + child.textContent;
      }
    }
    return result });
  
  if(text){
    text = text.trim();
  }else{
    text = "";
  }

  return text;
}

export default getTrimmedText;
