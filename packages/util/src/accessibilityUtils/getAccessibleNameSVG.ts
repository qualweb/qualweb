'use strict';
import { ElementHandle, Page } from 'puppeteer';
import getAccessibleNameSVGRecursion from './getAccessibleNameSVGRecursion';

async function getAccessibleNameSVG(element: ElementHandle, page: Page): Promise<string | undefined> {
  return await getAccessibleNameSVGRecursion(element, page, false);
}


export default getAccessibleNameSVG;

