'use strict';


import { Page, ElementHandle } from 'puppeteer';

async function getElementById(page: Page, id: string): Promise<ElementHandle | null> {
  if (!id) {
    throw new Error('Invalid id');
  }
  return page.$(`#${id}`);
}

export = getElementById;
