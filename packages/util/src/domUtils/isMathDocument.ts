'use strict';


/*function getRequestContent(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error || response);
      } else {
        resolve(body);
      }
    })
  });
}*/

function isMathDocument(url: string): boolean {
  //const content = await getRequestContent(url);
  return true;//content.trim().startsWith('<math');
}

export default isMathDocument;