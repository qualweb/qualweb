'use strict';

import { trim } from 'lodash';
import {ElementHandle} from "puppeteer";

async function getTrimmedText(element: ElementHandle): Promise<string> {
  if (!element) {
    throw Error('Element is not defined');
  }

  let text = <string> await (await element.getProperty('textContent')).jsonValue();
  
  if(text){
    text=trim(text);
  }else{
    text = "";
  }

  return text;
}

export default getTrimmedText;
