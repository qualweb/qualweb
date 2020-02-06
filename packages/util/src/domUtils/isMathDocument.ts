'use strict';

import request from 'request';

function getRequestContent(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error || response.status !== 200) {
        reject(error || response);
      } else {
        resolve(body);
      }
    })
  });
}

async function isMathDocument(url: string): Promise<boolean> {
  const response = await getRequestContent(url);
  return response.trim().startsWith('<math');
}

export default isMathDocument;