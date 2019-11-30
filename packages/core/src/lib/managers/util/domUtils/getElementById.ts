'use strict';

import {Page} from "puppeteer";

async function getElementById(id: string | null, page:Page): Promise<Element|null> {
  let element;
  if (id)
    element = page.$(`#${id}`)

  return element;
}

export = getElementById;
