'use strict';

import { ElementHandle } from 'puppeteer';

async function videoElementHasAudio(element: ElementHandle): Promise<boolean> {
  return element.evaluate(elem => {
    return Number.parseInt(elem['webikitAudioDecodedByteCount']) > 0; 
  });
}

export default videoElementHasAudio;