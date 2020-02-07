'use strict';

import request from 'request';

function getRequestContent(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error || response);
      } else {
        resolve(body);
      }
    })
  });
}

async function isMathDocument(url: string): Promise<boolean> {
  const content = await getRequestContent(url);
  return content.trim().startsWith('<math');
}

export default isMathDocument;