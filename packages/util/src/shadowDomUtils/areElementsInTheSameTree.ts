'use strict';

import {  ElementHandle } from 'puppeteer';
import getElementAttribute = require('../domUtils/getElementAttribute');

async function areElementsInTheSameTree(elements: ElementHandle []): Promise<boolean> {

  let atribute = await getElementAttribute(elements[0],"shadowTree");
  let i= 1;
  let result = true;
  while(i<elements.length && result){
    result = atribute === await getElementAttribute(elements[i],"shadowTree");
  }

  return result;
}

export = areElementsInTheSameTree;