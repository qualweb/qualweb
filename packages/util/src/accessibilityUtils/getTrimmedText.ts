'use strict';

import { trim } from 'lodash';
import {ElementHandle} from "puppeteer";

async function getTrimmedText(element: ElementHandle): Promise<string> {
  if (!element) {
    throw Error('Element is not defined');
  }

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
    text=trim(text);
  }else{
    text = "";
  }

  return text;
}

export = getTrimmedText;
