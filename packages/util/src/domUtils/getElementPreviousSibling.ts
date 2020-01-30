'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementPreviousSibling(element: ElementHandle): Promise<ElementHandle | null> {
  return (await element.getProperty('previousElementSibling')).asElement();
}

export default getElementPreviousSibling;