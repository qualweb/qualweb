'use strict';

import { ElementHandle } from 'puppeteer';

async function getElementNextSibling(element: ElementHandle): Promise<ElementHandle | null> {
  return (await element.getProperty('nextElementSibling')).asElement();
}

export default getElementNextSibling;