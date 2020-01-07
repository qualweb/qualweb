'use strict';

import { ElementHandle } from 'puppeteer';
import videoElementHasAudio = require('./videoElementHasAudio');
const request = require('request-promise');

async function  getVideoMetadata(element: ElementHandle) {
  let src = await element.evaluate(elem => {
    return elem['currentSrc'];
  });
  let json = JSON.parse(await request('http://194.117.20.242/video/' + encodeURIComponent(src)));
  let durationVideo = getStreamDuration(json, "video");
  let durationAudio = getStreamDuration(json, "audio");
  let audioVolume = json["audio"]["maxVolume"];
  let error = json["metadata"]["error"];
  let duration = await element.evaluate(elem => { return elem['duration']; });
  let hasSoundTrack = await videoElementHasAudio(element);
  let result = { service: { video: { duration: {} }, audio: { duration: {}, volume: {} }, error: {} }, puppeteer: { video: { duration: {} }, audio: { hasSoundTrack: {} }, error: {} } };
  result.puppeteer.video.duration = duration;
  result.service.video.duration = durationVideo;
  result.puppeteer.audio.hasSoundTrack = hasSoundTrack;
  result.service.audio.duration = durationAudio;
  result.service.audio.volume = audioVolume
  result.service.error = error !== undefined;
  result.service.error = !(duration >= 0 && hasSoundTrack);
  return result;
}

 function  getStreamDuration(json, streamType: string) {
  let streams = json["metadata"]["streams"];
  let duration = 0;
  if (streams) {
    for (let stream of streams) {
      if (stream["codec_type"] === streamType) {
        duration = stream["duration"]
      }
    }
  }
  return duration;
}

export = getVideoMetadata;