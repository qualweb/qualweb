'use strict';

import {  ElementHandle } from 'puppeteer';
import getElementAttribute from '../domUtils/getElementAttribute';

async function getTreeSelector(elements: ElementHandle): Promise<string> {

  let atribute = await getElementAttribute(elements,"shadowTree");
  let result = ":not([shadowTree])";
  if(atribute !== null){
    result = `[shadowTree="${atribute}"]`
  }
 
  return result;
}

export default getTreeSelector;