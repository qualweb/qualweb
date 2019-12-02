'use strict';

import { ElementHandle } from 'puppeteer';

function getElementStyleProperty(element: ElementHandle, property: string, pseudoStyle: string | null = null): Promise<string> {
  return element.evaluate((elem, property, pseudoStyle) => {
    const styles = getComputedStyle(elem, pseudoStyle);
    return styles.getPropertyValue(property);
  }, property, pseudoStyle);
}

export = getElementStyleProperty;