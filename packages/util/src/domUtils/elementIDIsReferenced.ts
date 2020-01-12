'use strict';

import { Page } from 'puppeteer';

async function elementIDIsReferenced(page:Page,id: string,atrribute:string): Promise<boolean> {
  return(await page.$('['+atrribute+`="${id}"]`))!== null;
}

export = elementIDIsReferenced;