'use strict';

import videoElementHasAudio from './videoElementHasAudio';
import { QWElement } from '@qualweb/qw-element';

function getVideoMetadata(elementQW: QWElement): any {
  //let src =elementQW.getElementProperty('currentSrc');
  const duration = parseInt(elementQW.getElementProperty('duration'));
  const hasSoundTrack = videoElementHasAudio(elementQW);
  const result = {
    puppeteer: {
      video: { duration: {} },
      audio: { hasSoundTrack: {} },
      error: {}
    }
  };
  result.puppeteer.video.duration = duration;
  result.puppeteer.audio.hasSoundTrack = hasSoundTrack;
  result.puppeteer.error = !(duration >= 0 && hasSoundTrack);
  return result;
}

export default getVideoMetadata;
