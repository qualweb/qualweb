import videoElementHasAudio from './objectElementIsNonText';

function getVideoMetadata(element: typeof window.qwElement): any {
  //let src =elementQW.getElementProperty('currentSrc');
  const duration = parseInt(element.getElementProperty('duration'));
  const hasSoundTrack = videoElementHasAudio(element);
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
